import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './Header.jsx'
import './index.css'
import ParallaxPage from './Parallax.jsx'

ReactDOM.createRoot(document.getElementById('header')).render(
  <React.StrictMode>
    <Header />
  </React.StrictMode>,
)

ReactDOM.createRoot(document.getElementById('parallaxpage')).render(
  <React.StrictMode>
    <ParallaxPage />
  </React.StrictMode>,
)

document.addEventListener('mousemove', parallax);

function parallax(e) {
  this.querySelectorAll('.parallax').forEach(layer => {

    const x = e.pageX - window.innerWidth /2;
    const y = e.pageY - window.innerHeight/2;
    
    let speedx = layer.dataset.speedx;
    let speedy = layer.dataset.speedy;

    let isInLeft = parseFloat(getComputedStyle(layer).left) < window.innerWidth/2 ? 1:-1;
    let zValue = e.pageX - parseFloat(getComputedStyle(layer).left) * isInLeft * 0.1;
    let speedz = layer.dataset.speedz;
    let rote = layer.dataset.rotation;

    let rotateDeg = (x / (window.innerWidth/2))*10;
    

    layer.style.transform = `translateX(calc(-50% + ${-x * speedx}px)) translateY(calc(-50% + ${y * speedy}px)) 
    perspective(2300px) translateZ(${zValue * speedz}px) rotateY(${rotateDeg * rote}deg)`;
  });
}

