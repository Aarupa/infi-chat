import React, { useState, useRef, useEffect } from 'react';

const styles = {
  voicebotContainer: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: 'linear-gradient(135deg, #f8f0ff 0%, #5a189a 100%)',
    margin: 0,
    padding: '0 0 0px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
    color: '#f8f0ff',
  },
  header: {
    fontWeight: '700',
    textAlign: 'center',
    margin: '20px 0 20px 0',
    fontSize: '2.5rem',
    textShadow: '0 0 15px #c77dff',
    letterSpacing: '1.5px',
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 800,
    width: '90%',
    margin: '0 auto',
    background: 'rgba(90, 24, 154, 0.85)',
    padding: 32,
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
    userSelect: 'text',
  },
  user: {
    background: 'linear-gradient(145deg, #7b2cbf 0%, #9d4edd 100%)',
    alignSelf: 'flex-end',
    color: '#f8f0ff',
    textAlign: 'right',
    borderRadius: '22px 22px 5px 22px',
    boxShadow: '0 6px 25px rgba(123, 44, 191, 0.5)',
    border: '1px solid rgba(255,255,255,0.25)',
  },
  bot: {
    background: 'linear-gradient(145deg, #10002b 0%, #5a189a 100%)',
    alignSelf: 'flex-start',
    color: '#f8f0ff',
    textAlign: 'left',
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
  micWrapper: {
  position: 'fixed',
  // padding: '0 0 0 200px',
  bottom: 70,
  left: '55%',
  // transform: 'translateX(-50%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  zIndex: 1100,
  width: 90,
  height: 90,
  borderRadius: '50%',
  background: 'rgba(123,44,191,0.12)',
  boxShadow: '0 0 35px rgba(123,44,191,0.5)',
  backdropFilter: 'blur(8px)',
  transition: 'all 0.3s ease-in-out',
},
  micButton: (isListening) => ({
    background: isListening
      ? 'rgba(199,125,255,0.4)'
      : 'rgba(123,44,191,0.25)',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    padding: 0,
    width: 80,
    height: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.3s ease-in-out',
    borderRadius: '50%',
    boxShadow: isListening
      ? '0 0 30px rgba(199,125,255,0.8)'
      : '0 0 20px rgba(123,44,191,0.5)',
    filter: isListening ? 'drop-shadow(0 0 15px #c77dff)' : 'none',
  }),
  micImg: {
    width: '55%',
    height: '55%',
    borderRadius: '50%',
    objectFit: 'contain',
    userSelect: 'none',
    pointerEvents: 'none',
  },
};

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
    <div style={styles.voicebotContainer}>
      <header style={styles.header}>Voice-based Infi-chat</header>
      <main style={{ width: '100%' }}>
        <div
          style={styles.chatContainer}
          ref={chatContainerRef}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          aria-label="Conversation Messages"
        >
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

        <div style={styles.micWrapper} aria-label="Voice input controls">
          <button
            type="button"
            id="mic-button"
            onClick={toggleListening}
            aria-pressed={isListening}
            aria-label={isListening ? 'Stop listening' : 'Start voice input'}
            title={isListening ? 'Listening...' : 'Click microphone to speak'}
            style={styles.micButton(isListening)}
          >
            <img
              src="https://img.icons8.com/ios-filled/100/ffffff/microphone.png"
              alt="Microphone icon"
              style={styles.micImg}
              draggable={false}
            />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Voicebot;
