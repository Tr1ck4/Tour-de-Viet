import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentService from '../../server/CommentService';
import './commentSection.css';

import AccountService from '../../server/AccountService';

const CommentSection = () => {
    const { townID, tourName } = useParams();
    const [comment, setComment] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userComment, setUserComment] = useState("");
    const [username, setUsername] = useState();
    const [hasBooked, setHasBooked] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const Cservice = new CommentService();
                const response = await Cservice.fetchComments(townID, tourName);
                setComment(response);
            } catch (error) {
                console.error("Error fetching comments", error);
            }
        };

        fetchComments();
    }, [comment]);

    useEffect(() => {
        const fetchLoggedIn = async () => {
            try {
                const account = new AccountService();
                const response = await account.authenticate();
                if (response.accountname) {
                    setLoggedIn(true);
                    setUsername(response.accountname);
                }
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };
        fetchLoggedIn();
    }, []);

    useEffect(() => {
        const checkBooking = async () => {
            try {
                const service = new CommentService();
                const response = await service.checkComments(tourName, username);
                setHasBooked(response[0].hasBooked)
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };
        checkBooking();
    }, [username]);

    const handleInputChange = (event) => {
        setUserComment(event.target.value);
    };

    const handleClick = () => {
        if (loggedIn && hasBooked && userComment) {
            const createComment = async () => {
                try {
                    const newData = {
                        townID: townID,
                        tourName: tourName,
                        userName: username,
                        comment: userComment,
                        rating: null
                    };
                    const service = new CommentService();
                    const response = await service.createComment(newData);
                } catch (error) {
                    console.error("Error creating comment", error);
                }
            };
            createComment();
        }
        else if (!hasBooked) alert("you haven't booked the tour");
        else if (!userComment) alert("The comment can not be empty");
    };
    return (
        <div className='fixed inset-0 flex justify-center items-center' style={{ zIndex: 9999 }}>
            <div className='h-[500px] w-[900px] bg-bone-white rounded-2xl relative'>
                <div className='h-[380px] mt-5 flex items-center flex-col overflow-y-auto' style={{ '-ms-overflow-style': 'none', 'scrollbar-width': 'none' }}>
                    {comment
                        .filter(commentObj => commentObj.comment !== null)
                        .reverse()
                        .map((commentObj, index) => (
                            <div key={index} className='bg-[#d9d9d9] w-[850px] h-[60px] comment self-center my-1 rounded-lg commentBox mb-3'>
                                <div className='userName text-dark-green font-semibold ml-2'>{commentObj.userName}</div>
                                <div className='info text-dark-green mx-3 overflow-hidden whitespace-nowrap text-overflow-ellipsis'>
                                    {commentObj.comment}
                                </div>
                            </div>
                        ))}
                </div>
                <div>
                    {loggedIn && (<div className='absolute bottom-0 left-0 right-0 mx-auto w-[850px] h-[60px] mb-5 flex justify-center items-center'>
                        <textarea
                            className='w-full h-full bg-[#d9d9d9] rounded-lg mx-3 TypingArea'
                            placeholder={hasBooked ? "Write a comment..." : "You have to book the tour to comment"}
                            onChange={handleInputChange}

                        ></textarea>
                        <div>
                            <svg className="h-10 w-10 text-dark-green cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                onClick={handleClick}>
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default CommentSection;
