import './TourPage.css';
import React, { useState } from 'react';
import bg from './assets/Background/TourPage_bg.png';

export default function TourPage(){

    return (
        <>
        <body>
        <main className='bg-fixed bg-cover' style={{ backgroundImage: `url(${bg})` }}>
            <div className='w-1/3 bg-zinc-200 mt-28 mr-4 justify'>
                <div className='price bg-dark-green w-3/5 h-28 ml-64 mr-2 rounded-[20px]'></div>
                <div className='cateogry bg-dark-green w-3/5 h-72 mt-4 ml-64 mr-2 rounded-[20px]'></div>
                <div className='transportation bg-dark-green w-3/5 h-64 mt-4 ml-64 mr-2 rounded-[20px]'></div>
            </div>
            <div className='w-2/3 mt-28 ml-10 bg-amber-300 justify overflow-y-auto' style={{ '-ms-overflow-style': 'none', 'scrollbar-width': 'none' }}>
                    <div className='bg-light-green w-3/4 h-64 mt-6 rounded-[20px] flex'>
                        <div className='bg-red-500 w-2/5 h-full rounded-[20px]'></div>
                        <div className='bg-blue-400 w-3/5 h-full'>
                            <div className='text-4xl font-mono font-semibold mt-6 ml-6 h-auto'>Du Lịch</div>
                            <div className='text-2xl font-itim mt-6 ml-6 h-auto'>Du Lịch</div>
                            <div className='text-4xl font-mono font-semibold mt-6 ml-6 h-auto'>Du Lịch</div>
                            <div className='text-4xl font-mono font-semibold mt-6 ml-6 h-auto'>Du Lịch</div>
                        </div>
                    </div>
                    <div className='bg-light-green w-3/4 h-64 mt-6 rounded-[20px]'></div>
                    <div className='bg-light-green w-3/4 h-64 mt-6 rounded-[20px]'></div>
                    <div className='bg-light-green w-3/4 h-64 mt-6 rounded-[20px]'></div>
                    <div className='bg-light-green w-3/4 h-64 mt-6 rounded-[20px]'></div>
                </div>
        </main>
        </body>
        </>
    );
}