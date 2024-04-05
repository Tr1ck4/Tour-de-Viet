import './Parallax.css';
import bg_21 from './assets/21/background.png';
import f1_21 from './assets/21/left 1.png';
import f2_21 from './assets/21/left 2.png';
import f3_21 from './assets/21/left 3.png';
import f4_21 from './assets/21/right 1.png';
import f5_21 from './assets/21/right 2.png';

export default function ParallaxPage() {
  const arr = [
    { src: bg_21, alt: "bg", rotation: "0",    speedx: "0.01",    speedy: "0.01",    speedz: "0",  w:'100%',z: '1',  ctop: 'calc(50% )', cleft: 'calc(50% )'},
    { src: f1_21, alt: "f1", rotation: "0",    speedx: "0.02",    speedy: "0.02",    speedz: "0",     w:'33%',z: '1',  ctop: 'calc(50% - 70px )', cleft: 'calc(50% - 330px )'},
    { src: f2_21, alt: "f2", rotation: "0",    speedx: "0.03",    speedy: "0.03",    speedz: "0",     w:'33%',z: '1',  ctop: 'calc(50% + 120px)', cleft: 'calc(50% - 300px )'},
    { src: f3_21, alt: "f3", rotation: "0",    speedx: "0.04",    speedy: "0.03",    speedz: "0",     w:'15%',z: '1',  ctop: 'calc(50% + 200px)', cleft: 'calc(50% - 600px )'},
    { src: f4_21, alt: "f4", rotation: "0",    speedx: "0.02",    speedy: "0.02",    speedz: "0",     w:'70%',z: '1',  ctop: 'calc(50% - 100px)', cleft: 'calc(50% + 400px )'},
    { src: f5_21, alt: "f5", rotation: "0",    speedx: "0.03",    speedy: "0.03",    speedz: "0",     w:'75%',z: '1',  ctop: 'calc(50%)', cleft: 'calc(50% + 130px )'},

  ];
  return (
    <main>
      {arr.map((element, index) => (
        <ParallaxElement key={index} {...element} />
      ))}
      <div className="text parallax" data-rotation="0.3" data-speedx="0.07" data-speedy="0.19" data-speedz="0.3" 
      style={{
        position: 'absolute',
        zIndex: 8,
        top: 'calc(50% -  20px)',
        left: 'calc(50% + 120px)',
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#000',
      }}>
        <h2 style={{fontWeight:'100', fontSize:'3em' }}>Welcome to</h2>
        <h1 style={{fontWeight:'800', fontSize:'7em', lineHeight:'0.99'}}>ha tay</h1>
      </div>
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
