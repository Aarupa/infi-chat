import React, { useState, useRef, useEffect } from 'react';
import './Voicebot.css';
import micIcon from '../assets/mic_icon.png';

const Voicebot = () => {
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const chatContainerRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = (e) => {
        setIsListening(false);
        addMessage(`Error: ${e.error}`, 'bot');
      };

      recognition.onresult = (event) => {
        let interim = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        setInterimTranscript(interim);

        if (finalTranscript) {
          setInterimTranscript('');
          submitMessage(finalTranscript.trim());
        }
      };

      recognitionRef.current = recognition;
    } else {
      alert("Speech Recognition not supported in this browser.");
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
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
      isTyping,
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

    await new Promise(resolve => setTimeout(resolve, 500));

    const responseText = getBotResponse(message);

    // Remove typing indicator
    setMessages(prev => prev.filter(msg => msg.id !== typingId));

    const responseId = Date.now();
    setMessages(prev => [...prev, { id: responseId, text: '', sender: 'bot' }]);

    let i = 0;
    const interval = setInterval(() => {
      if (i < responseText.length) {
        setMessages(prev => prev.map(msg =>
          msg.id === responseId
            ? { ...msg, text: msg.text + responseText.charAt(i) }
            : msg
        ));
        i++;
      } else {
        clearInterval(interval);
        speakText(responseText);
      }
    }, 30);
  };

  const getBotResponse = (input) => {
    const text = input.toLowerCase();
    if (text.includes('hello') || text.includes('hi')) return "Hello! How can I assist you today?";
    if (text.includes('how are you')) return "I'm just code, but I'm here to help you!";
    if (text.includes('your name')) return "I'm a Voicebot inspired by ChatGPT.";
    if (text.includes('time')) return `Current time is ${new Date().toLocaleTimeString()}.`;
    if (text.includes('thank')) return "You're welcome!";
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
    if (!message.trim()) return;
    addMessage(message, 'user');
    await botRespond(message);
  };

  const isSpeechSupported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  return (
    <div className="voicebot-container">
      <header>Voice-based Infi-chat</header>
      <main>
        <div
          id="chat-container"
          ref={chatContainerRef}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          aria-label="Conversation Messages"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.sender} ${msg.isTyping ? 'typing' : ''}`}
            >
              {msg.text}
            </div>
          ))}
          {interimTranscript && (
            <div className="message user interim">{interimTranscript}…</div>
          )}
        </div>

        <div className="mic-wrapper" aria-label="Voice input controls">
  <button
  type="button"
  id="mic-button"
  onClick={toggleListening}
  aria-pressed={isListening}
  aria-label={isListening ? 'Stop listening' : 'Start voice input'}
  title={isListening ? 'Listening...' : 'Click microphone to start listening'}
  className={isListening ? 'listening' : ''}
  disabled={!isSpeechSupported}
>
  <img src={micIcon} alt="Mic icon" style={{ width: '120%', height: '120%' }} />

</button>
</div>
      </main>
    </div>
  );
};

export default Voicebot;
