import './Parallax.css';
import bg_18 from './assets/18/background.png';
import f1_18 from './assets/18/left 2.png';
import f2_18 from './assets/18/back 1.png';
import f3_18 from './assets/18/right 1.png';
import f4_18 from './assets/18/left 1.png';
import f5_18 from './assets/18/object.png';



export default function ParallaxPage() {
  const arr = [
    { src: bg_18, alt: "bg", rotation: "0",    speedx: "0",    speedy: "0",    speedz: "0",     w:'100%',z: '1',  ctop: 'calc(50% )', cleft: 'calc(50% )'},
    { src: f1_18, alt: "bg", rotation: "0",    speedx: "0.01",    speedy: "0",    speedz: "0.05",     w:'47%',z: '1',  ctop: 'calc(50% - 180px) ', cleft: 'calc(50% - 380px )'},
    { src: f2_18, alt: "bg", rotation: "0",    speedx: "0.02",    speedy: "0.03",    speedz: "0.1",     w:'28%',z: '1',  ctop: 'calc(50% - 250px) ', cleft: 'calc(50% - 40px )'},
    { src: f3_18, alt: "bg", rotation: "0",    speedx: "0.03",    speedy: "0.01",    speedz: "0.05",     w:'55%',z: '1',  ctop: 'calc(50% - 120px) ', cleft: 'calc(50% + 330px )'},
    { src: f4_18, alt: "bg", rotation: "0",    speedx: "0.02",    speedy: "0.03",    speedz: "0.1",     w:'50%',z: '1',  ctop: 'calc(50% + 300px) ', cleft: 'calc(50% - 330px )'},
    { src: f5_18, alt: "bg", rotation: "0",    speedx: "0.05",    speedy: "0.05",    speedz: "0.1",     w:'55%',z: '1',  ctop: 'calc(50% + 150px) ', cleft: 'calc(50% + 200px )'},

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
