import React, { useState } from 'react';
import './Bot.css';
export default function Bot() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isVisible, setVisibility] = useState(true);

  const sendMessage = async () => {
    if (inputValue.trim() === '') return;
    setMessages(prevMessages => [...prevMessages, { sender: 'User', content: inputValue }]);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: inputValue })
      });
  
      const data = await response.json();
  
      data.messages.forEach(message => {
        setMessages(prevMessages => [...prevMessages, { sender: 'Bot', content: message }]);
      });
      
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      sendMessage();
      setInputValue(() => ''); 
    }
  };

  const toggleChat = () => {
    setVisibility(!isVisible);
  };

  return (
    <div className="container">
      <div className="toggle-icon" onClick={toggleChat}>
        {isVisible ? '▼' : '▲'}
      </div>
      {isVisible && (
        <>
          <div className="Bot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message-${message.sender.toLowerCase()}`}>
                <div className="message-header">{message.sender}</div>
                <div className="message-content">{message.content}</div>
              </div>
            ))}
          </div>
          <div className="Bot-input">
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type your message..."
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
