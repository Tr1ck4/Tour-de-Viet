import React, { useState } from 'react';
import './Bot.css';
export default function Bot() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyped] = useState(true);

  const sendMessage = async () => {
    if (inputValue.trim() === '') return;
    // Add user's message to the messages array
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

      // Add Bot's messages to the messages array
      data.messages.forEach(message => {
        setMessages(prevMessages => [...prevMessages, { sender: 'Bot', content: message }]);
      });
      
      // Clear the input field after sending the message
      setInputValue('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="container">
      <div className="Bot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message-${message.sender.toLowerCase()}`}>
            <span className="message-sender">{message.sender}</span> <span>:</span><span>{message.content}</span>
          </div>
        ))}
      </div>
      <div className="Bot-input">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange} 
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};
