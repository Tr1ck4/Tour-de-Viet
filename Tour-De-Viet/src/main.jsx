import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './Header.jsx'
import ParallaxPage from './Parallax.jsx'
import HomePage from './Home.jsx'
import TourPage from './TourPage.jsx'
import Register from './Register.jsx';
import TourDetailPage from './TourDetailPage.jsx';
import TestUI from './testUI.jsx';
import BookTourPage from './BookTourPage.jsx';
import ProfilePage from './Profile.jsx';


export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/parallax' element={<ParallaxPage />} />
        <Route path='/tourpage/:current_id' element={<TourPage />} />
        {/* <Route path='/tourpage/:townID/:tourName' element={<TourDetailPage />} /> */}
        <Route path='/tourpagedetail/' element={<TourDetailPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/testUI' element={<TestUI />} />
        <Route path='/bookinghistory' element={<BookTourPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);


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

