import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import bg from './assets/Background/TourPageDetailed_bg.png';

const TourDetailPage = () => {
    const { townID, tourName } = useParams(); // Get the tourId from the route parameters
    const [tourDetails, setTourDetails] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTourDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/tours/${townID}/${tourName}`);
                setTourDetails(response.data);
            } catch (error) {
                console.error("Error fetching tour details", error);
            }
        };

        fetchTourDetails();
    }, [townID, tourName]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/comments/${townID}/${tourName}`);
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments", error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [townID, tourName]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!tourDetails) {
        return <div>Tour not found</div>;
    }

    return (
        // <div>
        //     {console.log(tourDetails, comments)}
        //     <h1>{tourDetails.tourName}</h1>
        //     <p>{tourDetails.description}</p>
        //     {/* Add more details as needed */}
        // </div>
        <>
            <main className='overflow-y-scroll h-screen w-screen'>
                <div className='w-screen h-screen ' style={{ backgroundImage: `url(${bg})`, backgroundSize:'100% 100%', height:'200vh'}}>
                <h1 className='text-dark-green text-5xl font-extrabold mt-36'>This is a place</h1>

                    <div className=' h-auto w-3/5 mx-auto mt-10'>

                        <div className='w-auto h-[400px]  my-4 grid grid-cols-2 gap-2'>
                            <div className='bg-green-500 rounded-2xl'></div>
                            <div className='grid grid-cols-2 grid-rows-2 gap-1'>
                                <div className='bg-gray-400 rounded-tl-2xl'></div>
                                <div className='bg-gray-400 rounded-tr-2xl'></div>
                                <div className='bg-gray-400 rounded-bl-2xl'></div>
                                <div className='bg-gray-400 rounded-br-2xl'></div>
                            </div>
                        </div>

                        <div className='w-auto h-[400px] my-4 grid grid-rows-3 grid-flow-col gap-2'>
                            <div className='bg-light-green row-span-3 col-span-6 rounded-2xl'></div>
                            <div className='bg-bright-yellow col-span-2 rounded-2xl'></div>
                            <div className='bg-light-green row-span-2 col-span-2 rounded-2xl'></div>
                        </div>
                        
                        <div className='w-auto h-40 bg-orange-400 grid grid-cols-10 gap-3 rounded-2xl'>
                            <div className='col-span-2'></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
               
            </main>
        </>
    );
};

export default TourDetailPage;
