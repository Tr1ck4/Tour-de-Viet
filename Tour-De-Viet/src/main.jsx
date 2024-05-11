import './index.css'
import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Header from './Header/Header.jsx'
import ParallaxPage from './ParallaxPage/Parallax.jsx'
import HomePage from './HomePage/Home.jsx'
import TourPage from './TourPage/TourPage.jsx'
import Register from './RegisterPage/Register.jsx';
import TourDetailPage from './DetailPage/TourDetailPage.jsx'
import BookTourPage from './BookTourPage/BookTourPage.jsx';
import ProfilePage from './ProfilePage/Profile.jsx';
import Bot from './Bot/Bot.jsx';
import AdminPage from './AdminPage/Admin.jsx';

export default function App() {
  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/parallax' element={<ParallaxPage />} />
        <Route path='/tourpage/:current_id' element={<TourPage />} />
        <Route path='/tourpage/:townID/:tourName' element={<TourDetailPage />} />
        <Route path='/tourpagedetail/' element={<TourDetailPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/bookinghistory' element={<BookTourPage />} />
        <Route path='/tourpagedetail/' element={<TourDetailPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/bookinghistory' element={<BookTourPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/bot' element={<Bot />}/>
        <Route path='/admin' element={<AdminPage />}/>
      </Routes>
    </Router>
  );
}

const root = createRoot(document.getElementById('root'),);
root.render(<App></App>);


let x = 0 , y=  0, rotatedeg = 0;
x = window.innerWidth / 2;
y = window.innerHeight / 2;
rotatedeg = 0;
update(x, rotatedeg);

function update(cursorPosition,rotateDeg){
  document.querySelectorAll(".parallax").forEach((layer) => {
    let speedx = layer.dataset.speedx;
    let speedy = layer.dataset.speedy;
    let speedz = layer.dataset.speedz;

    let isInLeft = parseFloat(getComputedStyle(layer).left) < window.innerWidth / 2 ? 1 : -1;
    let zValue = cursorPosition - parseFloat(getComputedStyle(layer).left) * isInLeft * 0.1;
    let rote = layer.dataset.rotation;

    layer.style.transform = `translateX(calc(-50% + ${-x * speedx}px)) translateY(calc(-50% + ${y * speedy}px)) 
    perspective(2300px) translateZ(${zValue * speedz}px) rotateY(${rotateDeg * rote}deg)`;
  });
}

window.addEventListener("mousemove",(e)=>{
  x = e.clientX - window.innerWidth/2;
  y = e.clientY - window.innerHeight/2;

  rotatedeg = (x / (window.innerWidth/2))*10;
  update(e.clientX,rotatedeg);
});



