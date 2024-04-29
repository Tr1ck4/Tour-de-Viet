import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { gsap } from 'gsap';

import Header from './Header.jsx'
import ParallaxPage from './Parallax.jsx'
import HomePage from './Home.jsx'
import BookTourPage from './BookTourPage.jsx';
import ProfilePage from './Profile.jsx';
import Bot from './Bot.jsx';

export default function App(){
  return (
    <Router>
      <Header/>
      <a href='/homepage'>
      </a>
      <Routes>
        <Route path = '/homepage' element={<HomePage/>} />
        <Route path = '/parallax' element={<ParallaxPage/>} />
        <Route path = '/bookinghistory' element = {<BookTourPage/>}/>
        <Route path = '/profile' element = {<ProfilePage/>}/>
        <Route path = '/bot' element={<Bot/>} />
      </Routes>
    </Router>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const parallax_el = document.querySelectorAll(".parallax");

let x = 0, y = 0,rotateDeg = 0;
function update(cursorPosition) {
  parallax_el.forEach((layer) => {
  
    let speedx = layer.dataset.speedx;
    let speedy = layer.dataset.speedy;
    let speedz = layer.dataset.speedz;

    let isInLeft = parseFloat(getComputedStyle(layer).left) < window.innerWidth/2 ? 1:-1;
    let zValue = cursorPosition - parseFloat(getComputedStyle(layer).left) * isInLeft * 0.1;
    let rote = layer.dataset.rotation;

    layer.style.transform = `
    perspective(2300px) translateX(calc(-50% + ${-x * speedx}px)) translateY(calc(-50% + ${y * speedy}px)) 
    translateZ(${zValue * speedz}px) rotateY(${rotateDeg * rote}deg)`;
  });
}

update(0);
window.addEventListener("mousemove",(e)=>{
  x = e.clientX - window.innerWidth/2;
  y = e.clientY - window.innerHeight/2;

  rotateDeg = (x / (window.innerWidth/2))*10;
  update(e.clientX);
});


