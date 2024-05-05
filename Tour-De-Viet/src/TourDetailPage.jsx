import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './TourDetailPage.css'
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

    useEffect(() => {
        console.log("Stars: ", document.querySelectorAll(".stars i"));
    
        const stars = document.querySelectorAll(".stars i");
    
        const handleClick = (index1) => {
            console.log("Clicked on star: ", index1);
            stars.forEach((star, index2) => {
                index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
            });
        };
    
        stars.forEach((star, index1) => {
            star.addEventListener("click", () => handleClick(index1));
        });
    
        return () => {
            stars.forEach((star) => {
                star.removeEventListener("click", () => handleClick);
            });
        };
    }, []);


    // if (loading) {
    //     return <div>Loading...</div>;
    // }

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
            <main className='overflow-y-scroll overflow-hidden h-screen w-screen'>
            {console.log(tourDetails, comments)}
                <div className='w-screen h-screen ' style={{ backgroundImage: `url(${bg})`, backgroundSize:'100% 100%', height:'175vh'}}>
                <h1 className='text-dark-green text-5xl font-extrabold mt-36'>{tourDetails.tourName}</h1>

                    <div className=' h-auto w-3/5 mx-auto mt-10'>

                        <div className='w-auto h-[400px]  my-4 grid grid-cols-2 gap-2'>
                            <div className='bg-neutral-400 rounded-2xl'></div>
                            <div className='grid grid-cols-2 grid-rows-2 gap-1'>
                                <div className='bg-gray-400 rounded-tl-2xl'></div>
                                <div className='bg-gray-400 rounded-tr-2xl'></div>
                                <div className='bg-gray-400 rounded-bl-2xl'></div>
                                <div className='bg-gray-400 rounded-br-2xl'></div>
                            </div>
                        </div>

                        {/* <div className='w-auto h-[400px] my-4 grid grid-rows-3 grid-flow-col gap-2 '>
                            <div className='bg-light-green row-span-3 col-span-6 rounded-2xl'></div>
                            <div className='rateStar bg-bright-yellow col-span-2 rounded-2xl flex items-center justify-center'>
                                <i className='fa-solid fa-star mx-2'></i>
                                <i className='fa-solid fa-star mx-2'></i>
                                <i className='fa-solid fa-star mx-2'></i>
                                <i className='fa-solid fa-star mx-2'></i>
                                <i className='fa-solid fa-star mx-2'></i>
                            </div>
                            <div className='bg-light-green row-span-2 col-span-2 rounded-2xl'></div>
                        </div> */}

                        <div className='w-auto h-[400px] inline-flex gap-1'>
                            <div className='bg-light-green row-span-3 col-span-6 rounded-2xl h-[400px] w-[856px]'></div>
                            <div>
                            <div className='rateStar bg-bright-yellow rounded-2xl flex flex-col items-center justify-center w-[280px] h-[100px] mb-1 relative'>
                                    <div className="stars mb-4">
                                        <i className='fa-solid fa-star mx-2'></i>
                                        <i className='fa-solid fa-star mx-2'></i>
                                        <i className='fa-solid fa-star mx-2'></i>
                                        <i className='fa-solid fa-star mx-2'></i>
                                        <i className='fa-solid fa-star mx-2'></i>
                                    </div>
                                    <div className="number absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2 text-2xl">1</div>
                                </div>
                                <div className='bg-light-green h-[296px] w-[280px] rounded-2xl'>
                                   
                                </div>
                            </div>
                            {/* <div className='rateStar bg-bright-yellow col-span-2 rounded-2xl flex items-center justify-center'>
                                <i className='fa-solid fa-star mx-2'></i>
                                <i className='fa-solid fa-star mx-2'></i>
                                <i className='fa-solid fa-star mx-2'></i>
                                <i className='fa-solid fa-star mx-2'></i>
                                <i className='fa-solid fa-star mx-2'></i>
                            </div>
                            <div className='bg-light-green row-span-2 col-span-2 rounded-2xl'></div>></div> */}
                        </div>
                        
                        <div className='w-auto h-40 bg-orange-400 grid grid-cols-10 gap-3 rounded-2xl mt-14'>
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
