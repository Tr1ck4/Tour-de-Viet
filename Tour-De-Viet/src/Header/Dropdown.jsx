import {useState} from 'react'

import './Dropdown.css'
export default function Dropdown (){
    const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
    return(
        <div className="dropdown-container">
            <li className="hamburger">
              <a onClick={toggleDropdown} className="border-2 rounded-full border-black size-10">
                <div className="bar"></div>
              </a>
            </li>
            <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
                <a href="/homepage">HomePage</a>
                <a href="/parallax">All Tours</a>
                <a href="/profile">Profile</a>
                <a href="/bookinghistory">Booking History</a>
            </div>
        </div>
    )
        
}