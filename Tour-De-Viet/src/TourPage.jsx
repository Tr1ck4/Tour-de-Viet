import React, { useState, useEffect } from 'react';
import bg from './assets/Background/TourPage_bg.png';
import Slider from 'react-slider'
import './TourPage.css'
import axios from 'axios';

const MIN = 500000;
const MAX = 20000000;

export default function TourPage() {
    const [values, setValue] = useState([MIN, MAX]);
    const [tourList, SetTourList] = useState([]);
    useEffect(() => {
        const fetchAllTour = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/tours");
                SetTourList(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Error fetching tours", error);
                // Handle the error as needed
            }
        };

        fetchAllTour();

    }, []);
    return (
        <>
            <main className='bg-fixed bg-cover' style={{ backgroundImage: `url(${bg})` }}>
                <div className='w-1/3  mt-28 mr-4 justify '>
                    <div className='price bg-dark-green w-3/5 h-auto ml-64 mr-2  rounded-[20px] '>
                        <div className='font-itim font-semibold text-xl ml-6 pt-2 pb-2 '>Mức giá</div>
                            <div className='grid-row-2 items-center justify-center text-center'>
                                <div  className={"value font-itim text-xl justify-s"}>${values[0]} - ${values[1]}</div>
                                <div className='flex items-center justify-center pb-4'>
                                <Slider className='slider'
                                value={values} min={MIN} max={MAX} onChange={setValue}/>
                                </div>
                            </div>
                    </div>
                    <div className='cateogry bg-dark-green w-3/5 h-72 mt-4 ml-64 mr-2 rounded-[20px]'></div>
                    <div className='transportation bg-dark-green w-3/5 h-64 mt-4 ml-64 mr-2 rounded-[20px]'></div>
                </div>
                <div className='w-2/3 mt-28 ml-10 justify overflow-y-auto ' style={{ '-ms-overflow-style': 'none', 'scrollbar-width': 'none' }}>
                        <div className='bg-light-green w-3/4 h-64 mt-6 rounded-[20px] flex'>
                            <div className='w-2/5 bg-slate-700 h-full rounded-[20px]'></div>
                            <div className='w-3/5 h-full'>
                                <div className='text-4xl font-itim font-semibold mt-6 ml-6 h-auto'>Du Lịch</div>
                                <div className='text-2xl font-itim mt-12 ml-6 h-auto'>Du Lịch</div>
                                <div className='text-2xl font-itim mt-3 ml-6 h-auto'>Du Lịch</div>
                                <div className='text-2xl font-itim mt-3 ml-6 h-auto grid-cols-2 gap-4 flex justify-between'>
                                    <div> Rating </div>
                                    <div className='mr-5'> Price </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </main>
            <ul>
                {tourList.map((tourData, index) => (
                    <li key={index}>
                        <p>Town ID: {tourData.townID}</p>
                        <p>Total Time: {tourData.totalTime}</p>
                        <p>Transport: {tourData.transport}</p>
                        <p>Price: {tourData.price}</p>
                        <p>Average Rating: {tourData.avg_rating !== null ? tourData.avg_rating : "N/A"}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}
