import React, { useState, useEffect, useRef } from 'react';
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
    const [hasComment, setHasComment] = useState(false);
    const [hasBooked, setHasBooked] = useState(false);
    const hasBookedRef = useRef(hasBooked);
    const starsRef = useRef([]);

    useEffect(() => {
        hasBookedRef.current = hasBooked;
    }, [hasBooked]);

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
    }, []);

    useEffect(() => {
        const fetchRating = async () => {
            try {
                const service = new CommentService();
                const response = await service.getUserRating(tourName, username);
                const userRating = response[0]?.rating || 0;
                setRating(userRating);
                if (response[0]?.userName) setHasComment(true);
            } catch (error) {
                console.error("Error fetching rating", error);
            }
        };

        if (username) fetchRating();
    }, [username, tourName]);

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
    }, [townID, tourName]);

    useEffect(() => {
        const checkBooking = async () => {
            try {
                const service = new CommentService();
                const response = await service.checkComments(tourName, username);
                setHasBooked(response[0].hasBooked)
            } catch (error) {
                console.error('Error checking booking:', error);
            }
        };
        if (username) checkBooking();
    }, [username, tourName]);

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
        const stars = starsRef.current;

        const handleClick = (index) => {
            if (hasBookedRef.current) {
                setRating(index + 1);
                stars.forEach((star, idx) => {
                    idx <= index ? star.classList.add("active") : star.classList.remove("active");
                });
            } else {
                alert("You have to book the tour to rate");
            }
        };

        stars.forEach((star, index) => {
            star.addEventListener("click", () => handleClick(index));
        });

        return () => {
            stars.forEach((star, index) => {
                star.removeEventListener("click", () => handleClick(index));
            });
        };
    }, [hasBooked]);

    useEffect(() => {
        if (rating !== null) {
            starsRef.current.forEach((star, index) => {
                index < rating ? star.classList.add("active") : star.classList.remove("active");
            });
        }
    }, [rating]);

    useEffect(() => {
        if (username) {
            const updateRating = async () => {
                try {
                    const service = new CommentService();
                    if (hasComment) {
                        await service.updateCommentRating(townID, tourName, username, rating);
                    } else {
                        const newData = {
                            townID: townID,
                            tourName: tourName,
                            userName: username,
                            comment: null,
                            rating: rating
                        };
                        await service.createComment(newData);
                        setHasComment(true);
                    }
                } catch (error) {
                    console.error("Error updating rating", error);
                }
            };
            updateRating();
        }
    }, [rating]);

    if (!tourDetails) {
        return <div>Tour not found</div>;
    }

    const toggleCommentSection = () => {
        setShowCommentSection(!showCommentSection);
    };

    return (
        <>
            <main className='overflow-y-scroll overflow-hidden h-screen w-screen'>
                <div className='w-screen h-screen ' style={{ backgroundImage: `url(${bg})`, backgroundSize: '100% 100%', height: '175vh' }}>
                    <h1 className='text-dark-green text-5xl font-extrabold mt-36 ml-96'>{tourDetails.tourName}</h1>

                    <div className='h-auto w-3/5 mx-auto mt-10'>
                        <div className='w-auto h-[400px] my-4 grid grid-cols-2 gap-2'>
                            <div className='bg-neutral-400 rounded-2xl'></div>
                            <div className='grid grid-cols-2 grid-rows-2 gap-1'>
                                <div className='bg-gray-400 rounded-tl-2xl'></div>
                                <div className='bg-gray-400 rounded-tr-2xl'></div>
                                <div className='bg-gray-400 rounded-bl-2xl'></div>
                                <div className='bg-gray-400 rounded-br-2xl'></div>
                            </div>
                        </div>

                        <div className='w-auto h-[400px] inline-flex gap-1'>
                            <div className='bg-light-green rounded-2xl h-[400px] w-[856px]'>
                                <div className='text-4xl font-serif font-extrabold my-3 mx-10'>{tourDetails.description == null ? null : tourDetails.description.Header}</div>
                                <div className='text-lg my-2 mx-3'>{tourDetails.description == null ? null : tourDetails.description.Content}</div>
                            </div>

                            <div>
                                <div className='rateStar bg-bright-yellow rounded-2xl flex flex-col items-center justify-center w-[280px] h-[100px] mb-1 relative'>
                                    <div className="stars flex items-center justify-center">
                                        <div className="text-4xl mr-2 font-bold ml-2">{tourDetails.averageRating == null ? 1 : tourDetails.averageRating.toFixed(1)}</div>
                                        {[...Array(5)].map((_, index) => (
                                            <i key={index} ref={(el) => starsRef.current[index] = el} className='fa-solid fa-star mx-1'></i>
                                        ))}
                                    </div>
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
                                    {comments
                                        .filter(commentObj => commentObj.comment !== null)
                                        .slice(-3)
                                        .map((commentObj, index) => (
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
                        <Calendar townID={townID} tourName={tourName}></Calendar>
                    </div>
                </div>
            </main>
            {showCommentSection && <CommnetSection />}
        </>
    );
};

export default TourDetailPage;
