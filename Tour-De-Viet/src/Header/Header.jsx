import React, { useState, useEffect } from 'react';
import './Header.css';
import LoginPopUp from '../headerComponent/LoginPopUp';
import axios from 'axios';
function Header() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isLoggedIn, setIsLogged] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {

    const fetchUsername = async () => {
      try {
        const response = await axios.get('/api/authenticate');
        setUsername(response.data.username);
        setIsLogged(true);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) { 
        setShowLoginPopup(false);
        
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleLoginPopup = () => {
    setShowLoginPopup(!showLoginPopup);
  };

  const toggleLoggedOut = async () => {
    try {
      await axios.post('/api/logout');
      setIsLogged(false);
      setUsername('');
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <>
      <header className='backdrop-blur-lg drop-shadow-xl bg-bone-white bg-opacity-10 shadow-lg stroke-rgba(255, 255, 255, 1)'>
        <nav>
          <p className="logo">WELCOME</p>
          <ul>
            {isLoggedIn ? (
              <>
                <li><div className="px-5 py-2 text-xl font-bold">{username}</div></li>
                <li><button id="loginButton" className='border-none text-black text-opacity-65 outline-none' onClick={toggleLoggedOut}>LOG OUT</button></li>
              </>
            ) : (
              <>
                <li><button id="loginButton" className='border-none text-black text-opacity-65 outline-none' onClick={toggleLoginPopup}>  LOGIN </button></li>
                <li><a href="/register">Sign up</a></li>
              </>
            )}
            <li className="search">
              <a href="#">
                <i className="fa-solid fa-magnifying-glass"></i>
              </a>
            </li>
            <li className="hamburger">
              <a href="#" className="border-2 rounded-full border-black">
                <div className="bar"></div>
              </a>
            </li>
          </ul>
        </nav>
      </header>
      {showLoginPopup && <LoginPopUp/>}
    </>
  )
}

export default Header;