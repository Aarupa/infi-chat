import React, { useState } from 'react';

const GmttBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setTimeout(() => {
      setMessages(msgs => [
        ...msgs,
        { sender: 'bot', text: getBotResponse(input) }
      ]);
    }, 500);
    setInput('');
  };

  const getBotResponse = (msg) => {
    const text = msg.toLowerCase();
    if (text.includes('hello') || text.includes('hi')) return "Hello! How can I help you with GMTT?";
    if (text.includes('gmt')) return "GMTT stands for Green Modern Tech Talk!";
    if (text.includes('help')) return "Ask me anything about GMTT or green tech!";
    return "Sorry, I didn't get that. Try asking about GMTT.";
  };

  return (
    <div
      style={{
        background: '#e8f5e9',
        borderRadius: 12,
        padding: 24,
        maxWidth: 900,
        margin: '40px auto',
        boxShadow: '0 2px 12px #a5d6a7',
        color: '#1b5e20',
        fontFamily: 'Segoe UI, sans-serif'
      }}
    >
      <h2 style={{ color: '#388e3c', textAlign: 'center' }}>GMTT Bot</h2>
      <div
        style={{
          minHeight: 550,
          maxHeight: 300,
          overflowY: 'auto',
          background: '#c8e6c9',
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.sender === 'user' ? 'right' : 'left',
              margin: '8px 0',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                background: msg.sender === 'user' ? '#66bb6a' : '#a5d6a7',
                color: '#fff',
                borderRadius: 16,
                padding: '8px 16px',
                maxWidth: '80%',
                wordBreak: 'break-word',
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Type your message…"
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 8,
            border: '1px solid #81c784',
            outline: 'none',
            fontSize: 16,
          }}
        />
        <button
          onClick={handleSend}
          style={{
            background: '#43a047',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '0 20px',
            fontSize: 16,
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default GmttBot;