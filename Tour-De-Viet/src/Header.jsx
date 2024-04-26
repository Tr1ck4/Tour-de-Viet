import React, { useState, useEffect } from 'react';
import './Header.css';
import LoginPopUp from './headerComponent/LoginPopUp';

function Header() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
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

  return (
    <>
      <header className='backdrop-blur-lg drop-shadow-xl bg-bone-white bg-opacity-10 shadow-lg stroke-rgba(255, 255, 255, 1)'>
        <nav>
          <p className="logo">WELCOME</p>
          <ul>
            <li><button id="loginButton" className='border-none text-black text-opacity-65 outline-none' onClick={toggleLoginPopup}>  LOGIN </button></li>
            <li><a href="/register">Sign up</a></li>
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
      {showLoginPopup && <LoginPopUp />}
    </>
  )
}

export default Header;
