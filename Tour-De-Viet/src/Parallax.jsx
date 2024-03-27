import './Parallax.css';
import bg from './assets/3/background.png';
import f1 from './assets/3/front1.png';
import f2 from './assets/3/front2.png';
import f3 from './assets/3/front3.png';
import f4 from './assets/3/front4.png';
import o1 from './assets/3/object.png';


export default function ParallaxPage() {
  const arr = [
    { src: bg, alt: "bg", rotation: "0",    speedx: "0",    speedy: "0",    speedz: "0",     w:'100%',z: '1',  ctop: 'calc(50% )', cleft: 'calc(50% )'},
    { src: f1, alt: "f1", rotation: "0.1",  speedx: "0.01", speedy: "0.02", speedz: "0.05",  w:'',z: '6',  ctop: 'calc(50% + 435px)', cleft: 'calc(50% + 750px)'},
    { src: f2, alt: "f2", rotation: "0",    speedx: "0.01", speedy: "0.01", speedz: "0.01",  w:'',z: '5',  ctop: 'calc(50% + 370px)', cleft: 'calc(50% - 250px)'},
    { src: f3, alt: "f3", rotation: "0.01", speedx: "0.02", speedy: "0.02", speedz: "0.07",  w:'',z: '3',  ctop: 'calc(50% + 350px)', cleft: 'calc(50% - 290px)'},
    { src: f4, alt: "f4", rotation: "0.2",  speedx: "0.04", speedy: "0.02", speedz: "0.02",  w:'100%',z: '2',  ctop: 'calc(50% + 250px)', cleft: 'calc(50% - 70px)'},
    { src: o1, alt: "o1", rotation: "0.01", speedx: "0.02", speedy: "0.02", speedz: "0.07",  w:'',z: '4',  ctop: 'calc(50% - 80px)', cleft: 'calc(50% - 330px)'},
  ];
  return (
    <main>
      {arr.map((element, index) => (
        <ParallaxElement key={index} {...element} />
      ))}
      <div className="text parallax" data-rotation="0.3" data-speedx="0.07" data-speedy="0.19" data-speedz="0.3" 
      style={{
        position: 'absolute',
        zIndex: 2,
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
