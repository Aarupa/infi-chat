import React, { useState, useRef, useEffect } from 'react';
import './Voicebot.css'; // You'll need to create this CSS file

const Voicebot = () => {
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const chatContainerRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.interimResults = true;
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (e) => {
        setIsListening(false);
        addMessage(`Error: ${e.error}`, 'bot');
      };

      recognitionRef.current.onresult = (event) => {
        let interim = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        
        if (interim) {
          setInterimTranscript(interim);
        } else {
          setInterimTranscript('');
        }
        
        if (finalTranscript) {
          submitMessage(finalTranscript.trim());
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    scrollChatToBottom();
  }, [messages, interimTranscript]);

  const addMessage = (text, sender, isTyping = false) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender,
      isTyping
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const scrollChatToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const botRespond = async (message) => {
    const typingId = Date.now();
    addMessage('', 'bot', true);
    
    await new Promise(r => setTimeout(r, 300));
    
    const responseText = getBotResponse(message);
    
    // Remove the typing indicator
    setMessages(prev => prev.filter(msg => msg.id !== typingId));
    
    // Add the actual response
    const responseId = Date.now();
    addMessage('', 'bot');
    
    // Simulate typing effect
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < responseText.length) {
        setMessages(prev => prev.map(msg => 
          msg.id === responseId 
            ? { ...msg, text: msg.text + responseText.charAt(i) } 
            : msg
        ));
        i++;
      } else {
        clearInterval(typingInterval);
        speakText(responseText);
      }
    }, 25 + Math.random() * 50);
  };

  const getBotResponse = (input) => {
    const text = input.toLowerCase();
    if (text.includes('hello') || text.includes('hi')) {
      return "Hello! How can I assist you today?";
    }
    if (text.includes('how are you')) {
      return "I'm just code, but I'm here to help you!";
    }
    if (text.includes('your name')) {
      return "I'm a Voicebot inspired by ChatGPT.";
    }
    if (text.includes('time')) {
      return `Current time is ${new Date().toLocaleTimeString()}.`;
    }
    if (text.includes('thank') || text.includes('thanks')) {
      return "You're welcome!";
    }
    return "Sorry, I didn't understand that. Could you please try again?";
  };

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const submitMessage = async (message) => {
    if (!message) return;
    addMessage(message, 'user');
    await botRespond(message);
  };

  const isSpeechSupported = !!recognitionRef.current;

  return (
    <div className="voicebot-container">
      <header>Voice based Infi-chat</header>
      <main>
        <div 
          id="chat-container" 
          ref={chatContainerRef}
          role="log" 
          aria-live="polite" 
          aria-relevant="additions" 
          aria-label="Conversation Messages"
        >
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`message ${message.sender} ${message.isTyping ? 'typing' : ''}`}
            >
              {message.text}
            </div>
          ))}
          {interimTranscript && (
            <div className="message user interim">
              {interimTranscript}…
            </div>
          )}
        </div>
        <div aria-label="Voice input controls">
          <button 
            type="button" 
            id="mic-button" 
            aria-pressed={isListening}
            aria-label={isListening ? 'Stop listening' : 'Start voice input'}
            title={isListening ? 'Listening...' : 'Click microphone to start listening'}
            onClick={toggleListening}
            disabled={!isSpeechSupported}
            className={isListening ? 'listening' : ''}
          >
            🎤
          </button>
        </div>
      </main>
    </div>
  );
};

export default Voicebot;