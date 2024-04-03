import './Parallax.css';
import bg_19 from './assets/19/background.png';
import f1_19 from './assets/19/sky.png';
import f2_19 from './assets/19/back.png';
import f3_19 from './assets/19/left 2.png';
import f4_19 from './assets/19/right 1.png';
import f5_19 from './assets/19/right 2.png';
import f6_19 from './assets/19/right 2.png';
import f7_19 from './assets/19/left 1.png';


export default function ParallaxPage() {
  const arr = [
    { src: bg_19, alt: "bg", rotation: "0",    speedx: "0",    speedy: "0",    speedz: "0",     w:'100%',z: '1',  ctop: 'calc(50% )', cleft: 'calc(50% )'},
    { src: f1_19, alt: "f1", rotation: "0",    speedx: "0.01",    speedy: "0",    speedz: "0.01",     w:'100%',z: '1',  ctop: 'calc(50% - 380px)', cleft: 'calc(50%)'},
    { src: f2_19, alt: "f2", rotation: "0",    speedx: "0.01",    speedy: "0.01",    speedz: "0.03",     w:'100%',z: '1',  ctop: 'calc(50% - 120px)', cleft: 'calc(50%)'},
    { src: f3_19, alt: "f3", rotation: "0",    speedx: "0.02",    speedy: "0.02",    speedz: "0.03",     w:'50%',z: '1',  ctop: 'calc(50% + 40px)', cleft: 'calc(50% - 270px)'},
    { src: f4_19, alt: "f4", rotation: "0",    speedx: "0.02",    speedy: "0.03",    speedz: "0.02",     w:'65%',z: '1',  ctop: 'calc(50% - 20px)', cleft: 'calc(50% + 280px)'},
    { src: f5_19, alt: "f4", rotation: "0",    speedx: "0.03",    speedy: "0.04",    speedz: "0.02",     w:'40%',z: '1',  ctop: 'calc(50% + 120px)', cleft: 'calc(50% - 50px)'},
    { src: f6_19, alt: "f5", rotation: "0",    speedx: "0.04",    speedy: "0.05",    speedz: "0.02",     w:'50%',z: '1',  ctop: 'calc(50% + 130px)', cleft: 'calc(50% + 405px)'},
    { src: f7_19, alt: "f5", rotation: "0",    speedx: "0.03",    speedy: "0.06",    speedz: "0.02",     w:'50%',z: '1',  ctop: 'calc(50% + 130px)', cleft: 'calc(50% - 405px)'},

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
