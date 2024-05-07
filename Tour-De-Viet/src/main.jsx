import './index.css'
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Header from './Header.jsx'
import ParallaxPage from './Parallax.jsx'
import HomePage from './Home.jsx'
import TourPage from './TourPage.jsx'
import Register from './Register.jsx';
import TourDetailPage from './TourDetailPage.jsx';
import BookTourPage from './BookTourPage.jsx';
import ProfilePage from './Profile.jsx';
import Bot from './Bot.jsx';

import AdminPage from './Admin.jsx';
import axios from 'axios';

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


document.addEventListener('mousemove', parallax);

function parallax(e) {
  this.querySelectorAll('.parallax').forEach(layer => {

    const x = e.pageX - window.innerWidth / 2;
    const y = e.pageY - window.innerHeight / 2;

    let speedx = layer.dataset.speedx;
    let speedy = layer.dataset.speedy;

    let isInLeft = parseFloat(getComputedStyle(layer).left) < window.innerWidth / 2 ? 1 : -1;
    let zValue = e.pageX - parseFloat(getComputedStyle(layer).left) * isInLeft * 0.1;
    let speedz = layer.dataset.speedz;
    let rote = layer.dataset.rotation;

    let rotateDeg = (x / (window.innerWidth / 2)) * 10;


    layer.style.transform = `translateX(calc(-50% + ${-x * speedx}px)) translateY(calc(-50% + ${y * speedy}px)) 
    perspective(2300px) translateZ(${zValue * speedz}px) rotateY(${rotateDeg * rote}deg)`;
  });
}

