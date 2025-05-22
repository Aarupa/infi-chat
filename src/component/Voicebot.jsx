import React, { useState, useRef, useEffect } from 'react';
import axiosInstance from '../utils/axiosIntance';

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: '#fff',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
    color: '#f8f0ff',
    paddingTop: '40px',
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    maxWidth: 800,
    background: 'rgba(90, 24, 154, 0.85)',
    padding: '32px',
    borderRadius: 20,
    height: '65vh',
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    width: '90%',
    maxWidth: 800,
    marginTop: '20px',
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
    background: isListening ? 'rgba(199,125,255,0.4)' : 'rgba(123,44,191,0.25)',
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
    justifyContent: 'center',
    marginTop: '20px',
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
  const [inputMode, setInputMode] = useState('voice');
  const [shouldContinueListening, setShouldContinueListening] = useState(false);

  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const isRespondingRef = useRef(false);


  useEffect(() => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);

    recognition.onend = () => {
      setIsListening(false);
      if (shouldContinueListening && !isRespondingRef.current) {
        recognition.start(); // Restart only if bot is not speaking
      }
    };

   recognition.onerror = (e) => {
  setIsListening(false);
  if (e.error === 'no-speech') {
    // Ignore 'no-speech' error silently, no message shown
    return;
  }
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
        const lower = finalTranscript.trim().toLowerCase();
        if (lower.includes('bye') || lower.includes('exit')) {
          setShouldContinueListening(false);
          recognition.stop();
        }
        recognition.stop(); // Pause mic while bot is responding
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
}, [shouldContinueListening]);


  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, interimTranscript]);

  useEffect(() => {
    if (inputMode === 'text' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputMode]);




  const addMessage = (text, sender, isTyping = false) => {
    const newMessage = { id: Date.now(), text, sender, isTyping };
    setMessages(prev => [...prev, newMessage]);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      setShouldContinueListening(false);
      recognitionRef.current.stop();
    } else {
      setShouldContinueListening(true);
      recognitionRef.current.start();
    }
  };

  const botRespond = async (message) => {
  const typingId = Date.now();
  isRespondingRef.current = true; // Block mic restart
  addMessage('Typing...', 'bot', true);

  try {
    const response = await axiosInstance.post('/api/indeed-chat/', {
      query: message,
      chatbot_type: 'indeed',
    });

    let botReply = response.data?.response || "";

    // Friendly fallback if bot reply is empty or just whitespace
    if (!botReply.trim()) {
      botReply = "Sorry, I didn't quite catch that. Could you please say it again?";
    }

    setMessages(prev => prev.filter(msg => msg.id !== typingId));

    const responseId = Date.now();
    setMessages(prev => [...prev, { id: responseId, text: '', sender: 'bot' }]);

    let i = 0;
    const interval = setInterval(() => {
      if (i < botReply.length) {
        setMessages(prev => prev.map(msg =>
          msg.id === responseId
            ? { ...msg, text: msg.text + botReply.charAt(i) }
            : msg
        ));
        i++;
      } else {
        clearInterval(interval);
        speakText(botReply, 'en', () => {
          isRespondingRef.current = false;
          if (shouldContinueListening && recognitionRef.current) {
            recognitionRef.current.start();
          }

        });
      }
    }, 30);

  } catch (error) {
    setMessages(prev => prev.filter(msg => msg.id !== typingId));
    addMessage("Sorry, something went wrong with the server.", 'bot');
    console.error('API Error:', error);
    isRespondingRef.current = false;
  }
};


  const supportedLanguages = {
  en: 'en-US',   // English (US)
  hi: 'hi-IN',   // Hindi (India)
  mr: 'mr-IN',   // Marathi (India)
};

const speakText = (text, langCode = 'en', onEnd) => {
  if (!('speechSynthesis' in window)) {
    onEnd?.();
    return;
  }
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }

  const utterance = new SpeechSynthesisUtterance(text);
  const lang = supportedLanguages[langCode] || 'en-US';
  utterance.lang = lang;

  const voices = window.speechSynthesis.getVoices();

  // Filter voices for matching language prefix and female voice by name hints
  const femaleVoices = voices.filter(voice => {
    const langMatch = voice.lang.toLowerCase().startsWith(lang.toLowerCase().slice(0,2));
    const isFemale = /female|woman|girl|zira|susan|amelia|google/i.test(voice.name);
    return langMatch && isFemale;
  });

  // Pick first female voice available, else fallback to first voice
  const selectedVoice = femaleVoices.length ? femaleVoices[0] : (voices[0] || null);

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  utterance.rate = 1;
  utterance.pitch = 1;

  utterance.onend = () => {
    onEnd?.();
  };

  window.speechSynthesis.speak(utterance);
};



  const submitMessage = async (message) => {
  if (!message.trim()) return;

  // If speech synthesis is speaking, cancel it immediately on user input
  if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }

  // Also unblock mic (in case it was waiting for bot to finish)
  isRespondingRef.current = false;

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
      setShouldContinueListening(false);
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
      </div>
    </div>
  );
};
export default Voicebot;
