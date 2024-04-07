import './Parallax.css';
import bg_37 from './assets/37/bg.png';
import m1_37 from './assets/37/mountain_1.png';
import m2_37 from './assets/37/mountain_2.png';
import m3_37 from './assets/37/mountain_3.png';
import m4_37 from './assets/37/mountain_4.png';
import l_37 from './assets/37/land.png';





export default function ParallaxPage() {
  const arr = [
    // { src: bg_36, alt: "bg", rotation: "0.0",  speedx: "0.0", speedy: "0.0", speedz: "0.0",  w:'100%',z: '1',  ctop: 'calc(50%)', cleft: 'calc(50%)'},
    // { src: r2_36, alt: "rock_2", rotation: "0.02",    speedx: "0.01", speedy: "0.07", speedz: "0.01",  w:'75%',z: '3',  ctop: 'calc(50%)', cleft: 'calc(50%)'},
    // { src: r1_36, alt: "rock_1", rotation: "0.02",  speedx: "0.01", speedy: "0.02", speedz: "0.02",  w:'100%',z: '4',  ctop: 'calc(50%)', cleft: 'calc(50%)'},
    // { src: r3_36, alt: "rock_3", rotation: "0.01",  speedx: "0.01", speedy: "0.02", speedz: "0.02",  w:'100%',z: '5',  ctop: 'calc(50%)', cleft: 'calc(50%)'},
    // { src: r4_36, alt: "rock_4", rotation: "0.01", speedx: "0.01", speedy: "0.01", speedz: "0.0",  w:'100%',z: '2',  ctop: 'calc(50%)', cleft: 'calc(50%)'},
    // { src: c1_36, alt: "cloud_1", rotation: "0",    speedx: "0.0", speedy: "0.01", speedz: "0",     w:'100%',z: '6',  ctop: 'calc(50% )', cleft: 'calc(50%)'},
    // { src: c2_36, alt: "cloud_2", rotation: "0.1",  speedx: "0.01", speedy: "0.02", speedz: "0.05",  w:'100%',z: '7',  ctop: 'calc(50%)', cleft: 'calc(50%)'},

    { src: bg_37, alt: "bg", rotation: "0.0",  speedx: "0.0", speedy: "0.0", speedz: "0.0",  w:'100%',z: '1',  ctop: 'calc(50%)', cleft: 'calc(50%)'},
    { src: m4_37, alt: "mountain_4", rotation: "0.02",    speedx: "0.01", speedy: "0.07", speedz: "0.01",  w:'75%',z: '2',  ctop: 'calc(50%)', cleft: 'calc(50%)'},
    { src: m3_37, alt: "mountain_3", rotation: "0.02",  speedx: "0.01", speedy: "0.02", speedz: "0.02",  w:'100%',z: '3',  ctop: 'calc(50%)', cleft: 'calc(50%)'},
    { src: l_37, alt: "land", rotation: "0.01",  speedx: "0.01", speedy: "0.02", speedz: "0.02",  w:'100%',z: '4',  ctop: 'calc(50%)', cleft: 'calc(50%)'},
    { src: m2_37, alt: "mountain_2", rotation: "0.01", speedx: "0.0", speedy: "0.01", speedz: "0.0",  w:'100%',z: '5',  ctop: 'calc(50%)', cleft: 'calc(50%)'},
    { src: m1_37, alt: "mountain_1", rotation: "0",    speedx: "0.01", speedy: "0.01", speedz: "0",     w:'100%',z: '6',  ctop: 'calc(50% )', cleft: 'calc(50%)'},
    // { src: c2_36, alt: "cloud_2", rotation: "0.1",  speedx: "0.01", speedy: "0.02", speedz: "0.05",  w:'100%',z: '7',  ctop: 'calc(50%)', cleft: 'calc(50%)'},
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
