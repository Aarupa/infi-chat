import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaBars, FaKeyboard, FaPaperPlane } from 'react-icons/fa';
import './Voicebot.css'; // We'll create this CSS file with the same styles

const Voicebot = () => {
  const [isListening, setIsListening] = useState(false);
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const [conversationActive, setConversationActive] = useState(false);
  const [wakeWordDetected, setWakeWordDetected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  
  const recognitionRef = useRef(null);
  const micContainerRef = useRef(null);
  const micStatusRef = useRef(null);
  const micBtnRef = useRef(null);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    loadVoices();
    initializeRecognition();
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadVoices = () => {
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.name.toLowerCase().includes('neerja'));
    setSelectedVoice(voice || null);
  };

  const initializeRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.lang = 'en-IN';
      recognitionRef.current.interimResults = false;
      recognitionRef.current.continuous = true;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        if (micStatusRef.current) {
          micStatusRef.current.textContent = 'Listening...';
        }
        
        if (!wakeWordDetected) {
          if (micStatusRef.current) {
            micStatusRef.current.textContent = 'Hello! I am Infi';
          }
        }
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim();
        if (transcript) {
          handleTranscript(transcript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        if (isListening && conversationActive) {
          recognitionRef.current.start();
        }
      };
    }
  };

  const handleTranscript = (transcript) => {
    if (!wakeWordDetected) {
      const wakeWords = [
        "hi infi", "hi infee", "hi infy", "hi infie", "hi infey",
        "hii infi", "hii infee", "hii infy", "hii infie", "hii infey",
        "hello infi", "hello infee", "hello infy", "hello infie", "hello infey",
        "helloo infi", "helloo infee", "helloo infy", "helloo infie", "helloo infey",
        "hey infi", "hey infee", "hey infy", "hey infie", "hey infey",
        "heyy infi", "heyy infee", "heyy infy", "heyy infie", "heyy infey",
        "heya infi", "heya infee", "heya infy", "heya infie", "heya infey",
        "yo infi", "yo infee", "yo infy", "yo infie", "yo infey",
        "sup infi", "sup infee", "sup infy", "sup infie", "sup infey"
      ];
      
      const foundWakeWord = wakeWords.some(word => transcript.toLowerCase().includes(word));
      
      if (foundWakeWord) {
        setWakeWordDetected(true);
        addBotMessage("Hello! How can I help you today?");
        speakResponse("Hello! How can I help you today?");
        setConversationActive(true);
        if (micContainerRef.current) {
          micContainerRef.current.classList.add('active');
        }
        return;
      } else {
        return;
      }
    }

    addUserMessage(transcript);

    if (["bye", "exit", "goodbye"].some(cmd => transcript.toLowerCase().includes(cmd))) {
      handleExitCommand();
      return;
    }

    sendChatRequest(transcript);
  };

  const sendChatRequest = async (prompt) => {
    try {
      const response = await axios.post('/api/chat/', { prompt, job: "general" });
      addBotMessage(response.data.text);
      speakResponse(response.data.text);
    } catch (error) {
      console.error(error);
      addBotMessage("Something went wrong. Please try again.");
    }
  };

  const speakResponse = (text) => {
    window.speechSynthesis.cancel();

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-IN';

    if (selectedVoice) {
      speech.voice = selectedVoice;
    }

    speech.onstart = () => {
      setIsBotSpeaking(true);
    };

    speech.onend = () => {
      setIsBotSpeaking(false);
      if (conversationActive && !isListening) {
        setTimeout(() => {
          try {
            if (!isListening) {
              recognitionRef.current.start();
              setIsListening(true);
            }
          } catch (e) {
            console.log("Recognition start error:", e);
            setTimeout(() => {
              if (!isListening) {
                recognitionRef.current.start();
                setIsListening(true);
              }
            }, 500);
          }
        }, 500);
      }
    };

    window.speechSynthesis.speak(speech);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { type: 'user', text }]);
  };

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, { type: 'bot', text }]);
  };

  const handleMicClick = () => {
    if (!conversationActive) {
      if (micContainerRef.current) {
        micContainerRef.current.classList.add('active');
      }
      startVoiceRecognition(true);
      setConversationActive(true);
      setWakeWordDetected(true);
      return;
    }

    if (isBotSpeaking) {
      window.speechSynthesis.cancel();
      setIsBotSpeaking(false);
      startVoiceRecognition();
    } else {
      if (micContainerRef.current) {
        if (micContainerRef.current.classList.contains('active')) {
          micContainerRef.current.classList.remove('active');
          if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
          }
        } else {
          micContainerRef.current.classList.add('active');
          startVoiceRecognition();
        }
      }
    }
  };

  const startVoiceRecognition = (initialStart = false) => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (isListening && !initialStart) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    recognitionRef.current.start();
  };

  const handleExitCommand = () => {
    speakResponse("Ok bye! Have a good day!");

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    if (micContainerRef.current) {
      micContainerRef.current.classList.remove('active');
    }

    setConversationActive(false);
    setWakeWordDetected(false);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;

    addUserMessage(inputPrompt);
    setInputPrompt('');
    sendChatRequest(inputPrompt);
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  return (
    <div className="chatbot-container">
     
      <button id="toggle-chat-btn" onClick={toggleChat}>
        <FaKeyboard />
      </button>
      
      <div className={`mic-container ${conversationActive ? 'active' : ''}`} ref={micContainerRef}>
        <button id="mic-btn" onClick={handleMicClick} ref={micBtnRef}>
          <img src="/static/assets/voicegif.gif" alt="Voice GIF" />
        </button>
        <div className="mic-status" ref={micStatusRef}></div>
      </div>
      
      <div className={`chat-container ${showChat ? 'show' : ''}`}>
        <h1>Chatbot</h1>
        <div id="chat-window" ref={chatWindowRef}>
          <div id="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`${msg.type}-message`}>
                {msg.text}
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={sendMessage}>
          <input 
            type="text" 
            id="prompt" 
            placeholder="Type your message here..." 
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
          />
          <button type="submit">
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Voicebot;