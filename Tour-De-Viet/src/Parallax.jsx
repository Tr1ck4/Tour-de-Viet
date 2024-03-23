import './Parallax.css';
import bg from './assets/background.png';
import flight from './assets/flight.png';
import f1 from './assets/fog1.png';
import f2 from './assets/fog2.png';
import l1 from './assets/left1.png';
import l2 from './assets/left2.png';
import l3 from './assets/left3.png';
import r1 from './assets/right1.png';
import r2 from './assets/right2.png';
import r3 from './assets/right3.png';

function ParallaxPage() {
  return (
    <main>
      <img src={bg} alt="Background" data-rotation="0" data-speedx="0.02" data-speedy="0.11" data-speedz="0" className="parallax bg-img" />
      <img src={f1} alt="Fog 1" data-rotation="0" data-speedx="0.02" data-speedy="0.11" data-speedz="0" className="parallax bg-fog1" />
      <img src={flight} alt="Flight" data-rotation="0.1" data-speedx="0.195" data-speedy="0.06" data-speedz="0.11" className="parallax tw-flight" />
      <img src={f2} alt="Fog 2" data-rotation="0" data-speedx="0.03" data-speedy="0.12" data-speedz="0" className="parallax bg-fog2" />
      <div className="text parallax" data-rotation="0.3" data-speedx="0.07" data-speedy="0.19" data-speedz="0.3">
        <h2>Hello World</h2>
        <h1>This is parallax</h1>
      </div>
      <img src={r3} alt="Right 3" data-rotation="0.1" data-speedx="0.06" data-speedy="0.02" data-speedz="0.12" className="parallax tw-right3" />
      <img src={r1} alt="Right 1" data-rotation="0.2" data-speedx="0.04" data-speedy="0.06" data-speedz="0.06" className="parallax tw-right1" />
      <img src={r2} alt="Right 2" data-rotation="0.4" data-speedx="0.05" data-speedy="0.01" data-speedz="0.09" className="parallax tw-right2" />
      <img src={l3} alt="Left 3" data-rotation="0.5" data-speedx="0.07" data-speedy="0.02" data-speedz="0.13" className="parallax tw-left3" />
      <img src={l2} alt="Left 2" data-rotation="0.1" data-speedx="0.05" data-speedy="0.01" data-speedz="0.08" className="parallax tw-left2" />
      <img src={l1} alt="Left 1" data-rotation="0.2" data-speedx="0.03" data-speedy="0.01" data-speedz="0.05" className="parallax tw-left1" />
    </main>
  )
}

export default ParallaxPage