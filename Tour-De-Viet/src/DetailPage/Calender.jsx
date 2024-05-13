import React, { useEffect, useState } from "react";
import TourModal from "../tourPageDetailComponent/TourModal.jsx";
import TourService from '../../server/TourService.js';
import './Calendar.css'
import './TourDetailPage.css';

export default function Calendar({townID, tourName}) {
    
    const [array, setArray] = useState([]);
    const [page, setPage] = useState(1);
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupData, setPopupData] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            let newArray = [];
            const currentDate = new Date();
            for (let i = 0; i < 28; i++) {
                const newDate = new Date(currentDate);
                newDate.setDate(currentDate.getDate() + i);
                const month = newDate.getMonth() + 1;
                const day = newDate.getDate();
                const year = newDate.getFullYear();
                newArray.push({ "Year": year, "Month": month, "Day": day });
            }
            setArray(newArray);
        };
        
        fetchData();
    }, []);
    
    const handleClick = async (data) => {
        try {
            const date = `${data.Year}-${data.Month < 10 ? `0${data.Month}` : data.Month}-${data.Day < 10 ? `0${data.Day}` : data.Day}`;

            const tourservice = new TourService(townID, tourName, null, null, date, null, null, null);
            const response = await tourservice.fetchTourByDate();
            
            setPopupData(response);
            setPopupOpen(true);
        } catch (error) {
            console.error('Error fetching tour data:', error);
        }
    };
    const handleClosePopup = () => {
        setPopupOpen(false);
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
            <div className="w-auto h-32 bg-bone-white flex gap-3 rounded-2xl mt-14 content-center items-center justify-between px-4 calendarRow">
                <button onClick={handlePrevPage} className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:outline-none hover:border-none hover:bg-light-green focus:outline-none focus:border-none">
                    <svg className="w-6 h-6 text-gray-600 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
                    {visibleArray.map((data, index) => (
                        <div key={index} className="">
                            <button onClick={() => handleClick(data)} 
                            className=' bg-[#D9D9D9] text-black size-20 mx-3 shadow-lg calendarCell'>
                                    <div className="text-dark-green text-xl font-semibold">{data.Month}</div>
                                    <div className="text-dark-green text-2xl font-semibold">{data.Day}</div>
                            </button>
                        </div>
                    ))}
                    <button onClick={handleNextPage} className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:outline-none hover:border-none hover:bg-light-green focus:outline-none focus:border-none">
                    <svg className="w-6 h-6 text-gray-600 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" transform='scale(-1,1)'>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
            </div>
            {popupOpen &&<TourModal isOpen={popupOpen} onClose={handleClosePopup} data={popupData} />}
        </>
    );
}
