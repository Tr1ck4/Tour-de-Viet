import './Parallax.css';
import bg from './assets/8/background.png';
import f1 from './assets/8/back1.png';
import f2 from './assets/8/back2.png';
import f3 from './assets/8/back3.png';
import f4 from './assets/8/back4.png';
import f5 from './assets/8/back5.png';
import f6 from './assets/8/back6.png';
import f7 from './assets/8/back7.png';
import f8 from './assets/8/back8.png';
import f9 from './assets/8/back9.png';
import f10 from './assets/8/back10.png';
import f11 from './assets/8/back11.png';
8


export default function ParallaxPage() {
  const arr = [
    { src: bg, alt: "bg", rotation: "0",    speedx: "0",    speedy: "0",    speedz: "0",     w:'100%',z: '1',  ctop: 'calc(50% )', cleft: 'calc(50% )'},
    { src: f1, alt: "f1", rotation: "0.1",  speedx: "0.01", speedy: "0.02", speedz: "0.05",  w:'55%',z: '2',  ctop: 'calc(50% + 80px)', cleft: 'calc(50% - 580px)'},
    { src: f2, alt: "f2", rotation: "0",    speedx: "0.01", speedy: "0.01", speedz: "0.01",  w:'',z: '3',  ctop: 'calc(50% + 2px)', cleft: 'calc(50% + 720px)'},
    { src: f3, alt: "f3", rotation: "0.01", speedx: "0.02", speedy: "0.02", speedz: "0.07",  w:'100%',z: '4',  ctop: 'calc(50% + 350px)', cleft: 'calc(50% - 150px)'},
    { src: f4, alt: "f4", rotation: "0.2",  speedx: "0.04", speedy: "0.02", speedz: "0.02",  w:'100%',z: '5',  ctop: 'calc(50% - 350px)', cleft: 'calc(50% - 300px)'},
    { src: f11, alt: "f4", rotation: "0.2",  speedx: "0.04", speedy: "0.02", speedz: "0.02",  w:'100%',z: '5',  ctop: 'calc(50% - 350px)', cleft: 'calc(50% + 100px)'},
    { src: f5, alt: "f1", rotation: "0.1",  speedx: "0.01", speedy: "0.02", speedz: "0.05",  w:'',z: '6',  ctop: 'calc(50% + 4535px)', cleft: 'calc(50% + 750px)'},
    { src: f6, alt: "f2", rotation: "0",    speedx: "0.01", speedy: "0.01", speedz: "0.01",  w:'66%',z: '7',  ctop: 'calc(50% - 100px)', cleft: 'calc(50% + 380px)'},
    { src: f7, alt: "f3", rotation: "0.01", speedx: "0.02", speedy: "0.02", speedz: "0.07",  w:'52%',z: '8',  ctop: 'calc(50% - 70px)', cleft: 'calc(50% - 550px)'},
    { src: f8, alt: "f4", rotation: "0.2",  speedx: "0.04", speedy: "0.02", speedz: "0.02",  w:'46%',z: '9',  ctop: 'calc(50% - 120px)', cleft: 'calc(50% - 600px)'},
    { src: f9, alt: "f1", rotation: "0.1",  speedx: "0.01", speedy: "0.02", speedz: "0.05",  w:'26%',z: '10',  ctop: 'calc(50% - 120px)', cleft: 'calc(50% + 800px)'},
    { src: f10, alt: "f2", rotation: "0",    speedx: "0.01", speedy: "0.01", speedz: "0.01", w:'33%',z: '11',  ctop: 'calc(50%  + 200px)', cleft: 'calc(50% + 750px)'},
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
        color: 'white',
      }}>
        <h2 style={{fontWeight:'100', fontSize:'3em' }}>Welcome to</h2>
        <h1 style={{fontWeight:'800', fontSize:'7em', lineHeight:'0.99'}}>Quang Nam</h1>
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
