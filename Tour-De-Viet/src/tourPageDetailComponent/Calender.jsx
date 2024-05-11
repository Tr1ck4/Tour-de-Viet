import React, { useEffect, useState } from "react";
import './TourDetailPage.css';
import TourService from '../../server/TourService.js';

export default function Calendar({townID, tourName}) {
    const currentDate = new Date();
    const [array, setArray] = useState([]);
    const [page, setPage] = useState(1);
    const [isBooking, setBooking] = useState(false);

    useEffect(() => {
        const fetchData = async (townID, tourName, currentDate) => {
            const newArray = [];
            for (let i = 0; i < 28; i++) {
                const newDate = new Date(currentDate);
                newDate.setDate(currentDate.getDate() + i);
                const month = newDate.getMonth() + 1;
                const day = newDate.getDate();
                const tourservice = new TourService(townID, tourName, null, null, `${newDate.getFullYear()}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`, null, null, null);
                const response = await tourservice.fetchTourByDate();
                newArray.push({ "Month": month, "Day": day, "Data": response });
            }
            setArray(newArray);
        };

        fetchData(townID, tourName, currentDate);
    }, [townID, tourName, currentDate]);

    const handleClick = (data) => {
        console.log(data);
        console.log(data.Data);
        if (data.Data.length > 0) {
            console.log(data.Data);
        }
    };

    const handleNextPage = () => {
        if (array.length > page * 7){
            setPage(page + 1);
        }
    };
    const handlePrevPage = () => {
        if (page > 1){
            setPage(page - 1);
        }
    };

    const visibleArray = array.slice((page - 1) * 7, page * 7);

    return (
        <>
            <div className="w-auto h-40 bg-bone-white flex gap-3 rounded-2xl mt-14 content-center items-center justify-between px-4">
            <button onClick={handlePrevPage} className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
                <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>
                {visibleArray.map((data, index) => (
                    <div key={index} className="flex text-center">
                        <button onClick={() => handleClick(data)} 
                        className=' px-10 bg-[#D9D9D9] text-black size-14 mx-3 shadow-lg text-center'>
                                <p>{data.Month}</p>
                                <p>{data.Day}</p>
                        </button>
                    </div>
                ))}
                <button onClick={handleNextPage} className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
                <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" transform='scale(-1,1)'>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>

            </div>
        </>
    );
}
