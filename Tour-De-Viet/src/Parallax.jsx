import { useState } from 'react';
import './Parallax.css';
import { current_id, arr, updateID } from './data';
import inc from  './assets/inc.png'
import des from  './assets/des.png'


export default function ParallaxPage() {
  const array = arr.find(item => item.id === current_id).source;
  const head = arr.find(item => item.id === current_id).header;
  const [state, setState] = useState(current_id);
  const IncreaseClick = () =>{
    updateID(current_id+1);
    setState(current_id+1);
  }
  const DecreaseClick = () =>{
    updateID(current_id-1);
    setState(current_id-1);
  }

  const CheckoutClick = () =>{
    window.location = (`/tour/${state}`);
  }
  return (
    <main>
      {array.map((element, index) => (
        <ParallaxElement key={index} {...element} />
      ))}
      <div className="text parallax" data-rotation="0.3" data-speedx="0.07" data-speedy="0.19" data-speedz="0.3" 
      style={{
        position: 'absolute',
        zIndex: head.z,
        top: head.position.top,
        left: head.position.left,
        textAlign: 'center',
        textTransform: 'uppercase',
        color: 'white',
        
      }}>
        <h2 style={{fontWeight:'100', fontSize:'3em', textShadow: '2px 2px 2px black'}}>Welcome to</h2>
        <h1 style={{fontWeight:'800', fontSize:'7em', lineHeight:'0.99',textShadow: '2px 2px 2px black'}}>{head.subtitle}</h1>
      </div>
      <button className="z-10 size-14 rounded-full backdrop-blur absolute place-self-center mx-5 place-content-center" onClick={DecreaseClick}>
        <img src={des} className='mx-2' alt="Decrement"></img>
      </button>

      <button className="z-10 size-14 rounded-full backdrop-blur absolute place-self-center inset-y-0 right-0 mx-5 place-content-center" onClick={IncreaseClick}> 
        <img src={inc} className='mx-2' alt="Increment"></img>
      </button>
    </main>
  )
}

function ParallaxElement({ src, alt, rotation, speedx, speedy, speedz, w, z, ctop, cleft}) {
  return (
    <img src={src} 
    alt={alt} data-rotation={rotation} 
    data-speedx={speedx} 
    data-speedy={speedy} 
    data-speedz={speedz} 
    className={`parallax ${alt}`} 
    style={{ 
      position: 'absolute', 
      zIndex: z, 
      top: ctop, 
      left: cleft, 
      width:w,
      objectFit:'fill'
      }} />
  );
}
