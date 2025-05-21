import React, { useState, useRef, useEffect } from 'react';

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: '#fff',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
    color: '#f8f0ff',
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    maxWidth: 800,
    margin: '0 auto',
    background: 'rgba(90, 24, 154, 0.85)',
    padding: '32px',
    borderRadius: 20,
    height: '60vh',
    marginBottom: '40px',
    overflowY: 'auto',
    border: '1px solid rgba(199, 125, 255, 0.4)',
    boxShadow: '0 8px 40px rgba(123, 44, 191, 0.3)',
    backdropFilter: 'blur(20px)',
    transition: 'all 0.4s ease-in-out',
  },
  message: {
    padding: '14px 20px',
    maxWidth: '75%',
    lineHeight: 1.6,
    wordWrap: 'break-word',
    fontSize: 17,
    marginBottom: 14,
    borderRadius: 22,
    boxShadow: '0 6px 25px rgba(123, 44, 191, 0.18)',
    border: '1px solid rgba(255,255,255,0.15)',
  },
  user: {
    background: 'linear-gradient(145deg, #7b2cbf 0%, #9d4edd 100%)',
    alignSelf: 'flex-end',
    color: '#f8f0ff',
    borderRadius: '22px 22px 5px 22px',
    boxShadow: '0 6px 25px rgba(123, 44, 191, 0.5)',
    border: '1px solid rgba(255,255,255,0.25)',
  },
  bot: {
    background: 'linear-gradient(145deg, #10002b 0%, #5a189a 100%)',
    alignSelf: 'flex-start',
    color: '#f8f0ff',
    borderRadius: '22px 22px 22px 5px',
    boxShadow: '0 6px 25px rgba(0,0,0,0.4)',
    border: '1px solid rgba(199,125,255,0.4)',
  },
  typing: {
    fontStyle: 'italic',
    opacity: 0.75,
  },
  interim: {
    opacity: 0.7,
    fontStyle: 'italic',
    color: '#c77dff',
  },
  inputContainer: {
    position: 'fixed',
    bottom: 70,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    width: '90%',
    maxWidth: 800,
  },
  inputWrapper: {
    display: 'flex',
    width: '100%',
    gap: '10px',
  },
  textInput: {
    flex: 1,
    padding: '15px 20px',
    borderRadius: '50px',
    border: '1px solid rgba(199, 125, 255, 0.4)',
    background: 'rgba(90, 24, 154, 0.2)',
    color: '#f8f0ff',
    fontSize: '16px',
    outline: 'none',
    boxShadow: '0 4px 20px rgba(123, 44, 191, 0.2)',
    backdropFilter: 'blur(8px)',
  },
  sendButton: {
    padding: '15px 25px',
    borderRadius: '50px',
    background: 'linear-gradient(145deg, #7b2cbf 0%, #9d4edd 100%)',
    color: '#f8f0ff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    boxShadow: '0 4px 20px rgba(123, 44, 191, 0.5)',
    transition: 'all 0.2s ease',
  },
  micButton: (isListening) => ({
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: isListening
      ? 'rgba(199,125,255,0.4)'
      : 'rgba(123,44,191,0.25)',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: isListening
      ? '0 0 30px rgba(199,125,255,0.8)'
      : '0 0 20px rgba(123,44,191,0.5)',
    transition: 'all 0.3s ease',
  }),
  micImg: {
    width: '55%',
    height: '55%',
    objectFit: 'contain',
  },
  modeToggle: {
    display: 'flex',
    background: 'rgba(90, 24, 154, 0.2)',
    borderRadius: '50px',
    padding: '5px',
    backdropFilter: 'blur(8px)',
  },
  toggleButton: (active) => ({
    padding: '10px 20px',
    borderRadius: '50px',
    background: active ? 'rgba(123, 44, 191, 0.5)' : 'transparent',
    color: '#f8f0ff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  }),
};

const Voicebot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [inputMode, setInputMode] = useState('voice'); // 'voice' or 'text'
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize speech recognition
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
      addMessage("Speech Recognition is not supported in your browser.", 'bot');
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    scrollChatToBottom();
  }, [messages, interimTranscript]);

  // Focus text input when in text mode
  useEffect(() => {
    if (inputMode === 'text' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputMode]);

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
    addMessage('Typing...', 'bot', true);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const responseText = getBotResponse(message);

    // Remove typing indicator
    setMessages(prev => prev.filter(msg => msg.id !== typingId));

    // Add response with typing effect
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
        if (inputMode === 'voice') {
          speakText(responseText);
        }
      }
    }, 30);
  };

  const getBotResponse = (input) => {
    const text = input.toLowerCase();
    if (text.includes('hello') || text.includes('hi')) return "Hello! How can I assist you today?";
    if (text.includes('how are you')) return "I'm just code, but I'm functioning well! How about you?";
    if (text.includes('your name')) return "I'm Infi-Chat, your AI assistant.";
    if (text.includes('time')) return `The current time is ${new Date().toLocaleTimeString()}.`;
    if (text.includes('date')) return `Today is ${new Date().toLocaleDateString()}.`;
    if (text.includes('thank')) return "You're welcome! Is there anything else I can help with?";
    if (text.includes('mode') || text.includes('switch')) return `You're currently in ${inputMode} mode. Use the buttons above to switch.`;
    if (text.includes('help')) return "I can answer questions, tell you the time, or just chat. Try asking me something!";
    return "I'm not sure I understand. Could you rephrase that?";
  };

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const submitMessage = async (message) => {
    if (!message.trim()) return;
    addMessage(message, 'user');
    setInputText('');
    await botRespond(message);
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    submitMessage(inputText);
  };

  const toggleInputMode = (mode) => {
    setInputMode(mode);
    if (isListening && mode === 'text') {
      recognitionRef.current.stop();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatContainer} ref={chatContainerRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              ...styles.message,
              ...(msg.sender === 'user' ? styles.user : styles.bot),
              ...(msg.isTyping ? styles.typing : {}),
            }}
          >
            {msg.text}
          </div>
        ))}
        {interimTranscript && (
          <div style={{ ...styles.message, ...styles.user, ...styles.interim }}>
            {interimTranscript}…
          </div>
        )}
      </div>

      <div style={styles.inputContainer}>
        <div style={styles.modeToggle}>
          <button
            style={styles.toggleButton(inputMode === 'voice')}
            onClick={() => toggleInputMode('voice')}
          >
            Voice Mode
          </button>
          <button
            style={styles.toggleButton(inputMode === 'text')}
            onClick={() => toggleInputMode('text')}
          >
            Text Mode
          </button>
        </div>

        {inputMode === 'text' ? (
          <form style={styles.inputWrapper} onSubmit={handleTextSubmit}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              style={styles.textInput}
              ref={inputRef}
            />
            <button type="submit" style={styles.sendButton}>
              Send
            </button>
          </form>
        ) : (
          <button
            onClick={toggleListening}
            style={styles.micButton(isListening)}
            aria-label={isListening ? 'Stop listening' : 'Start listening'}
          >
            <img
              src="https://img.icons8.com/ios-filled/100/ffffff/microphone.png"
              alt="Microphone"
              style={styles.micImg}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Voicebot;