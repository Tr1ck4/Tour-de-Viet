import bg_6 from './assets/6/background.png';
import f1_6 from './assets/6/front1.png';
import f2_6 from './assets/6/front2.png';;
import f3_6 from './assets/6/front3.png';
import f4_6 from './assets/6/front4.png';
import l1_6 from './assets/6/left1.png';
import l2_6 from './assets/6/left2.png';
import b1_6 from './assets/6/back1.png';
import b2_6 from './assets/6/back2.png';
import r1_6 from './assets/6/right1.png';
import bg_2 from './assets/2/background.png';
import l1_2 from './assets/2/left1.png';
import l2_2 from './assets/2/left2.png';
import l3_2 from './assets/2/left3.png';
import l4_2 from './assets/2/cloud.png';
import ar_2 from './assets/2/arr.png';
import f1_2 from './assets/2/front1.png';
import r1_2 from './assets/2/rig_3ht1.png';
import r2_2 from './assets/2/right2.png';
import r3_2 from './assets/2/right3.png';
import bg_3 from './assets/3/background.png';
import f1_3 from './assets/3/front1.png';
import f2_3 from './assets/3/front2.png';
import f3_3 from './assets/3/front3.png';
import f4_3 from './assets/3/front4.png';
import o1_3 from './assets/3/object.png';
import bg_8 from './assets/8/background.png';
import f1_8 from './assets/8/back1.png';
import f2_8 from './assets/8/back2.png';
import f3_8 from './assets/8/back3.png';
import f4_8 from './assets/8/back4.png';
import f5_8 from './assets/8/back5.png';
import f6_8 from './assets/8/back6.png';
import f7_8 from './assets/8/back7.png';
import f8_8 from './assets/8/back8.png';
import f9_8 from './assets/8/back9.png';
import f10_8 from './assets/8/back10.png';
import f11_8 from './assets/8/back11.png';

import bg_18 from './assets/18/background.png';
import f1_18 from './assets/18/left 2.png';
import f2_18 from './assets/18/back 1.png';
import f3_18 from './assets/18/right 1.png';
import f4_18 from './assets/18/left 1.png';
import f5_18 from './assets/18/object.png';

export const arr = [
    [
        { src: bg_6, alt: "bg", rotation: "0",    speedx: "0",    speedy: "0",    speedz: "0",    w:'2800px', z: '1', ctop: 'calc(50%)',  cleft: 'calc(50%)'},
        { src: f1_6, alt: "f1", rotation: "0.1",  speedx: "0.03", speedy: "0.02", speedz: "0.05",             z: '6', ctop: 'calc(50% + 60px)', cleft: 'calc(50% + 120px )' },
        { src: f2_6, alt: "f2", rotation: "0",    speedx: "0.01", speedy: "0.01", speedz: "0.01",             z: '5', ctop: 'calc(50% + 250px)', cleft: 'calc(50% - 60px)'},
        { src: f3_6, alt: "f3", rotation: "0.01", speedx: "0.02", speedy: "0.02", speedz: "0.07",             z: '4', ctop: 'calc(50% + 210px)', cleft: 'calc(50% - 60px)' },
        { src: f4_6, alt: "f4", rotation: "0",    speedx: "0.01", speedy: "0.01", speedz: "0.01",             z: '4', ctop: 'calc(50% + 230px)', cleft: 'calc(50% + 400px)'},
        { src: l1_6, alt: "l1", rotation: "0.01", speedx: "0.02", speedy: "0.01", speedz: "0.09",             z: '4', ctop: 'calc(50% - 60px)', cleft: 'calc(50%  - 950px)' },
        { src: l2_6, alt: "l2", rotation: "0.01", speedx: "0.02", speedy: "0.01", speedz: "0.09",             z: '3', ctop: 'calc(50% - 100px)',cleft: 'calc(50% - 900px)'},
        { src: b1_6, alt: "b1", rotation: "0",  speedx: "0.01", speedy: "0.01", speedz: "0.02",               z: '2', ctop: 'calc(50% - 180px)', cleft: 'calc(50% - 40px)' },
        { src: b2_6, alt: "b2", rotation: "0",  speedx: "0.01", speedy: "0.01", speedz: "0.02",    w:'1200px',h:'200px',           z: '1', ctop: 'calc(50% - 210px)', cleft: 'calc(50% + 600px)' },
        { src: r1_6, alt: "r1", rotation: "0.0",  speedx: "0.015",speedy: "0.01", speedz: "0.09",             z: '1', ctop: 'calc(50% - 100px)', cleft: 'calc(50% + 925px)' },
    ],
    [
        { src: bg_2, alt: "bg", rotation: "0",    speedx: "0",    speedy: "0",    speedz: "0",                 z: '1', ctop: 'calc(50% - 120px)', cleft: 'calc(50%)'},
        { src: l1_2, alt: "l1", rotation: "0.1",  speedx: "0.01", speedy: "0.02", speedz: "0.05",  w:'750px',  z: '4', ctop: 'calc(50% + 70px)',  cleft: 'calc(50% - 750px )' },
        { src: l2_2, alt: "l2", rotation: "0",    speedx: "0.01", speedy: "0.01", speedz: "0.01",  w:'30px',   z: '6', ctop: 'calc(50% + 450px)', cleft: 'calc(50% - 670px)'},
        { src: l3_2, alt: "l3", rotation: "0.01", speedx: "0.02", speedy: "0.02", speedz: "0.07",  w:'400px',  z: '4', ctop: 'calc(50% - 150px)', cleft: 'calc(50% - 900px)' },
        { src: l4_2, alt: "l4", rotation: "0.2",    speedx: "0.04", speedy: "0.02", speedz: "0.02",            z: '2', ctop: 'calc(50% - 70px)',  cleft: 'calc(50% + 20px)'},
        { src: ar_2, alt: "ar", rotation: "0.01", speedx: "0.02", speedy: "0.01", speedz: "0.09",              z: '3', ctop: 'calc(50% + 260px)', cleft: 'calc(50%  )' },
        { src: f1_2, alt: "f1", rotation: "0",    speedx: "0.01", speedy: "0.01", speedz: "0.01",  w:'2200px', z: '5', ctop: 'calc(50% + 320px)', cleft: 'calc(50% - 5px)' },
        { src: r1_2, alt: "r1", rotation: "0.01", speedx: "0.02", speedy: "0.01", speedz: "0.09",  w:'400px',  z: '5', ctop: 'calc(50% + 100px)', cleft: 'calc(50% + 900px)'},
        { src: r2_2, alt: "r2", rotation: "0",  speedx: "0.01", speedy: "0.01", sp_8eedz: "0.02",    w:'200px',  z: '5', ctop: 'calc(50% + 350px)', cleft: 'calc(50% + 250px)' },
        { src: r2_2, alt: "r2", rotation: "0",  speedx: "0.01", speedy: "0.01", speedz: "0.02",    w:'200px',  z: '2', ctop: 'calc(50% + 350px)', cleft: 'calc(50% - 1095px)' },
        { src: r2_2, alt: "r2", rotation: "0",  speedx: "0.01", speedy: "0.01", speedz: "0.02",    w:'200px',  z: '2', ctop: 'calc(50% + 350px)', cleft: 'calc(50% + 1040px)' },
        { src: r3_2, alt: "r3", rotation: "0",  speedx: "0.01", speedy: "0.01", speedz: "0.02",    w:'850px',  z: '3', ctop: 'calc(50% + 40px )', cleft: 'calc(50% + 600px)' },
    ],
    [
        { src: bg_3, alt: "bg", rotation: "0",    speedx: "0",    speedy: "0",    speedz: "0",     w:'100%',z: '1',  ctop: 'calc(50% )', cleft: 'calc(50% )'},
        { src: f1_3, alt: "f1", rotation: "0.1",  speedx: "0.01", speedy: "0.02", speedz: "0.05",  w:'',z: '6',  ctop: 'calc(50% + 435px)', cleft: 'calc(50% + 750px)'},
        { src: f2_3, alt: "f2", rotation: "0",    speedx: "0.01", speedy: "0.01", speedz: "0.01",  w:'',z: '5',  ctop: 'calc(50% + 370px)', cleft: 'calc(50% - 250px)'},
        { src: f3_3, alt: "f3", rotation: "0.01", speedx: "0.02", speedy: "0.02", speedz: "0.07",  w:'',z: '3',  ctop: 'calc(50% + 350px)', cleft: 'calc(50% - 290px)'},
        { src: f4_3, alt: "f4", rotation: "0.2",  speedx: "0.04", speedy: "0.02", speedz: "0.02",  w:'100%',z: '2',  ctop: 'calc(50% + 250px)', cleft: 'calc(50% - 70px)'},
        { src: o1_3, alt: "o1", rotation: "0.01", speedx: "0.02", speedy: "0.02", speedz: "0.07",  w:'',z: '4',  ctop: 'calc(50% - 80px)', cleft: 'calc(50% - 330px)'},
    ],
    [
        { src: bg_8, alt: "bg", rotation: "0",    speedx: "0",    speedy: "0",    speedz: "0",     w:'100%',z: '1',  ctop: 'calc(50% )', cleft: 'calc(50% )'},
        { src: f1_8, alt: "f1", rotation: "0.1",  speedx: "0.01", speedy: "0.02", speedz: "0.05",  w:'55%',z: '2',  ctop: 'calc(50% + 80px)', cleft: 'calc(50% - 580px)'},
        { src: f2_8, alt: "f2", rotation: "0",    speedx: "0.01", speedy: "0.01", speedz: "0.01",  w:'',z: '3',  ctop: 'calc(50% + 2px)', cleft: 'calc(50% + 720px)'},
        { src: f3_8, alt: "f3", rotation: "0.01", speedx: "0.02", speedy: "0.02", speedz: "0.07",  w:'100%',z: '4',  ctop: 'calc(50% + 350px)', cleft: 'calc(50% - 150px)'},
        { src: f4_8, alt: "f4", rotation: "0.2",  speedx: "0.04", speedy: "0.02", speedz: "0.02",  w:'100%',z: '5',  ctop: 'calc(50% - 350px)', cleft: 'calc(50% - 300px)'},
        { src: f11_8, alt: "f4", rotation: "0.2",  speedx: "0.04", speedy: "0.02", speedz: "0.02",  w:'100%',z: '5',  ctop: 'calc(50% - 350px)', cleft: 'calc(50% + 100px)'},
        { src: f5_8, alt: "f1", rotation: "0.1",  speedx: "0.01", speedy: "0.02", speedz: "0.05",  w:'',z: '6',  ctop: 'calc(50% + 4535px)', cleft: 'calc(50% + 750px)'},
        { src: f6_8, alt: "f2", rotation: "0",    speedx: "0.01", speedy: "0.01", speedz: "0.01",  w:'66%',z: '7',  ctop: 'calc(50% - 100px)', cleft: 'calc(50% + 380px)'},
        { src: f7_8, alt: "f3", rotation: "0.01", speedx: "0.02", speedy: "0.02", speedz: "0.07",  w:'52%',z: '8',  ctop: 'calc(50% - 70px)', cleft: 'calc(50% - 550px)'},
        { src: f8_8, alt: "f4", rotation: "0.2",  speedx: "0.04", speedy: "0.02", speedz: "0.02",  w:'46%',z: '9',  ctop: 'calc(50% - 120px)', cleft: 'calc(50% - 600px)'},
        { src: f9_8, alt: "f1", rotation: "0.1",  speedx: "0.01", speedy: "0.02", speedz: "0.05",  w:'26%',z: '10',  ctop: 'calc(50% - 120px)', cleft: 'calc(50% + 800px)'},
        { src: f10_8, alt: "f2", rotation: "0",    speedx: "0.01", speedy: "0.01", speedz: "0.01", w:'33%',z: '11',  ctop: 'calc(50%  + 200px)', cleft: 'calc(50% + 750px)'},
    ],
    [
        { src: bg_18, alt: "bg", rotation: "0",    speedx: "0",    speedy: "0",    speedz: "0",     w:'100%',z: '1',  ctop: 'calc(50% )', cleft: 'calc(50% )'},
        { src: f1_18, alt: "bg", rotation: "0",    speedx: "0.01",    speedy: "0",    speedz: "0.05",     w:'47%',z: '1',  ctop: 'calc(50% - 180px) ', cleft: 'calc(50% - 380px )'},
        { src: f2_18, alt: "bg", rotation: "0",    speedx: "0.02",    speedy: "0.03",    speedz: "0.1",     w:'28%',z: '1',  ctop: 'calc(50% - 250px) ', cleft: 'calc(50% - 40px )'},
        { src: f3_18, alt: "bg", rotation: "0",    speedx: "0.03",    speedy: "0",    speedz: "0.05",     w:'55%',z: '1',  ctop: 'calc(50% - 120px) ', cleft: 'calc(50% + 330px )'},
        { src: f4_18, alt: "bg", rotation: "0",    speedx: "0.02",    speedy: "0.03",    speedz: "0.1",     w:'50%',z: '1',  ctop: 'calc(50% + 300px) ', cleft: 'calc(50% - 330px )'},
        { src: f5_18, alt: "bg", rotation: "0",    speedx: "0.05",    speedy: "0.05",    speedz: "0.1",     w:'55%',z: '1',  ctop: 'calc(50% + 150px) ', cleft: 'calc(50% + 200px )'},

    ],
    

];