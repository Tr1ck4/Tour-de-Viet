import React, { useEffect, useState} from "react";
import './TourDetailPage.css'
import TourService from '../../server/TourService.js'
import { useParams } from "react-router-dom";
export default function Calendar(){
    let {townID, tourName} = useParams();
    const currentDate = new Date();

    var array = [];
    for (var i = 0; i < 15; i++) {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + i); 
        const month = newDate.getMonth()+1;
        const day = newDate.getDate();
        const tourservice =  new TourService(townID, tourName,null,null, `${newDate.getFullYear()}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`,null,null,null);
        const callData = async  ()=>{
            const response = await tourservice.fetchTourByDate();
        }
        callData();
        array.push({"Month" : month, "Day" : day});
    }
    return (
        <>
            <div className="flex px-10 py-80 ">
                {array.map((date, index) => (
                        <div key={index} className = 'flex-column content-center px-10 bg-slate-300 text-black size-14 mx-3 '>
                            <div className="text-center">
                                <p>{date.Month}</p>                                
                            </div>
                            <div className="text-center">
                                <p>{date.Day}</p>
                            </div>
                        </div>
                ))}
            </div>
        </>
    );
}