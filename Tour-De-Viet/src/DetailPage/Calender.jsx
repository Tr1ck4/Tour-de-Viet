import React, { useEffect, useState } from "react";
import './TourDetailPage.css';
import TourService from '../../server/TourService.js';
import { useParams } from "react-router-dom";

export default function Calendar() {
    let { townID, tourName } = useParams();
    const currentDate = new Date();
    const [array, setArray] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async (townID, tourName, currentDate) => {
            const newArray = [];
            for (let i = 0; i < 15; i++) {
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
        setPage(page + 1);
    };
    const handlePrevPage = () => {
        setPage(page - 1);
    };

    const visibleArray = array.slice((page - 1) * 6, page * 6);

    return (
        <>
            <div className="flex px-10 py-80 ">
                {page > 1 && (
                    <button onClick={handlePrevPage}>Previous</button>
                )}
                {visibleArray.map((data, index) => (
                    <div key={index}>
                        <button onClick={() => handleClick(data)} className='flex-column content-center px-10 bg-slate-300 text-black size-14 mx-3'>
                            <div className="text-center">
                                <p>{data.Month}</p>
                            </div>
                            <div className="text-center">
                                <p>{data.Day}</p>
                            </div>
                        </button>
                    </div>
                ))}
                {array.length > page * 6 && (
                    <button onClick={handleNextPage}>Next</button>
                )}
            </div>
        </>
    );
}
