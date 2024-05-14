import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './TourDetailPage.css'
import bg from '../assets/Background/TourPageDetailed_bg.png';

import ToursService from '../../server/TourService';
import CommentService from '../../server/CommentService';
import CommnetSection from '../tourPageDetailComponent/commentSection';
import Calendar from './Calender';
import AccountService from '../../server/AccountService';

const TourDetailPage = () => {
    const { townID, tourName } = useParams(); // Get the tourId from the route parameters
    const [tourDetails, setTourDetails] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCommentSection, setShowCommentSection] = useState(false);
    const [username, setUsername] = useState();
    const [rating, setRating] = useState(null);

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const account = new AccountService();
                const response = await account.authenticate();
                if (response.accountname) {
                    setUsername(response.accountname);
                }
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };
        fetchUsername();
    }, [username]);

    useEffect(() => {
        const fetchRating = async () => {
            try {
                const service = new CommentService();
                const response = await service.getUserRating(tourName, username);
                setRating(response[0].rating)
            } catch (error) {
                console.error("Error fetching rating", error);
            }
        };

        fetchRating();
    }, [username]);


    useEffect(() => {
        const fetchTourDetails = async () => {
            try {
                const service = new ToursService();
                const response = await service.fetchTour(townID, tourName);
                const parsedResponse = {
                    ...response,
                    description: JSON.parse(response.description)
                };

                setTourDetails(parsedResponse);
            } catch (error) {
                console.error("Error fetching tour details", error);
            }
        };

        fetchTourDetails();
    }, [townID, tourName]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const Cservice = new CommentService();
                const response = await Cservice.fetchComments(townID, tourName);
                setComments(response);
            } catch (error) {
                console.error("Error fetching comments", error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [comments]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setShowCommentSection(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
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

    const toggleCommentSection = () => {
        console.log("I click on this");
        setShowCommentSection(!showCommentSection);
    };

    return (
        <>
            <main className='overflow-y-scroll overflow-hidden h-screen w-screen'>
                <div className='w-screen h-screen ' style={{ backgroundImage: `url(${bg})`, backgroundSize: '100% 100%', height: '175vh' }}>
                    <h1 className='text-dark-green text-5xl font-extrabold mt-36 ml-96'>{tourDetails.tourName}</h1>

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
                            <div className='bg-light-green rounded-2xl h-[400px] w-[856px]'>
                                <div>{tourDetails.description == null ? tourName : tourDetails.description.Header}</div>
                                <div>{tourDetails.description == null ? null : tourDetails.description.Content}</div>
                            </div>

                            <div>
                                <div className='rateStar bg-bright-yellow rounded-2xl flex flex-col items-center justify-center w-[280px] h-[100px] mb-1 relative'>
                                    <div className="stars flex items-center justify-center">
                                        <div className="text-4xl mr-2 font-bold ml-2">{tourDetails.averageRating == null ? 1 : tourDetails.averageRating.toFixed(1)}</div>
                                        <i className='fa-solid fa-star mx-1'></i>
                                        <i className='fa-solid fa-star mx-1'></i>
                                        <i className='fa-solid fa-star mx-1'></i>
                                        <i className='fa-solid fa-star mx-1'></i>
                                        <i className='fa-solid fa-star mx-1'></i>
                                    </div>
                                    {/* <div className="number absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2 text-2xl">1</div> */}
                                </div>
                                <div className='bg-light-green h-[296px] w-[280px] rounded-2xl flex flex-col cursor-pointer' onClick={toggleCommentSection}>
                                    <div className='mt-5 mb-3 flex ml-6 border-b-2 h-[45px] w-[230px]'>
                                        <div className='bg-dark-green h-8 w-10 rounded-xl mr-2 flex flex-col justify-center items-center'>
                                            <div className='bg-bone-white h-1 w-5 rounded-lg'></div>
                                            <div className='bg-bone-white h-1 w-5 rounded-lg my-1'></div>
                                            <div className='bg-bone-white h-1 w-5 rounded-lg'></div>
                                        </div>
                                        <div className='font-itim text-3xl'>Comment</div>
                                    </div>
                                    {comments.slice(-3).map((commentObj, index) => (
                                        <div key={index} className='bg-bone-white w-[250px] h-[60px] comment self-center my-1 rounded-lg commentBox'>
                                            <div className='userName text-dark-green font-semibold ml-2'>{commentObj.userName}</div>
                                            <div className='info text-dark-green mx-3 overflow-hidden whitespace-nowrap text-overflow-ellipsis'>
                                                {commentObj.comment}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* </div><div className='w-auto h-40 bg-bone-white flex gap-3 rounded-2xl mt-14 content-center items-center justify-between'> */}
                        <Calendar townID={townID} tourName={tourName}></Calendar>

                    </div>
                </div>
            </main>
            {showCommentSection && <CommnetSection />}
        </>
    );
};

export default TourDetailPage;
