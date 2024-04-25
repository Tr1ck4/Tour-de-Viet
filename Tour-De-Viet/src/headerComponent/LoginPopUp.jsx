import React, { Fragment } from 'react';
import './LoginPopUp.css';

const   LoginPopUp = () => {
    return (
        <div className=' fixed inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center '> 
            <div className='w-[400px] h-[300px] backdrop-blur-lg drop-shadow-xl bg-bone-white bg-opacity-10 shadow-lg stroke-rgba(255, 255, 255, 1) rounded-2xl'>
                <div className='my-10'>
                    <div className='w-3/4 bg-bone-white h-[60px] mx-auto rounded-2xl'></div>
                    <div className='w-3/4 bg-bone-white h-[60px] mx-auto rounded-2xl my-5'></div>
                    <div className='w-2/5 bg-bone-white h-[60px] mx-auto rounded-2xl'></div>
                </div>
            </div>
        </div>
    )
}

export default LoginPopUp;