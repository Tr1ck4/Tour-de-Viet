import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './Bot.css';

export default function Bot() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

  const sendMessage = async () => {
    if (inputValue.trim() === '') return;
    setMessages(prevMessages => [...prevMessages, { sender: 'User', content: inputValue }]);
    setInputValue('');
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
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(prevState => !prevState);
  };

  const toggleOpen = () => {
    setIsMinimized(false);
  };

  return (
    <>
    <div className = 'botchat'>
      {isMinimized && <button style={{transform: 'translate(18vw,33vh)', borderRadius:'50%', backgroundColor:'black', width:'50px',height:'50px'}} className="minimize-button" onClick={toggleMinimize}>
                {isMinimized ? '+' : '-'}
              </button>}
      {!isMinimized &&
        <div className={`container ${isMinimized ? 'minimized' : ''}`}>
          <div className="chat-window">
            <div className="chat-header">
              <h3 className='text-xl font-semibold'>Chat with Bot</h3>
              <button className="minimize-button" onClick={toggleMinimize}>
                {isMinimized ? '+' : '-'}
              </button>
              {isMinimized && (
                <button className="open-button" onClick={toggleOpen}>
                  Open
                </button>
              )}
            </div>
            {!isMinimized && (
              <>
                <div className="chat-messages">
                  {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                      <div className="message-content">
                        {message.sender === 'Bot' ? (
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        ) : (
                          message.content
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="chat-input">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className='chatInput'
                  />
                  <button onClick={sendMessage}>Send</button>
                </div>
              </>
            )}
          </div>
        </div>
      }
    </div>
    </>
  );
};
