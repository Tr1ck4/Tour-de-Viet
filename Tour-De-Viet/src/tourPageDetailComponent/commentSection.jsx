import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentService from '../../server/CommentService';
import './commentSection.css';

const CommentSection = () => {
    const { townID, tourName } = useParams();
    const [comment, setComment] = useState([]);
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
    const handleInputChange = (event) => {
        setComment(event.target.value);
    };
    return (
        <div className='fixed inset-0 flex justify-center items-center' style={{ zIndex: 9999 }}>
            <div className='h-[500px] w-[900px] bg-bone-white rounded-2xl relative'>
                <div className='h-[380px] mt-5 flex items-center flex-col overflow-y-auto' style={{ '-ms-overflow-style': 'none', 'scrollbar-width': 'none' }}>
                    {comment.map((commentObj, index) => (
                        <div key={index} className='bg-[#d9d9d9] w-[850px] h-[60px] comment self-center my-1 rounded-lg commentBox mb-3'>
                            <div className='userName text-dark-green font-semibold ml-2 m'>{commentObj.userName}</div>
                            <div className='info text-dark-green mx-3 overflow-hidden whitespace-nowrap text-overflow-ellipsis'>
                                {commentObj.comment}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='absolute bottom-0 left-0 right-0 mx-auto w-[850px] h-[60px] mb-5 flex justify-center items-center'>
                    <textarea
                        className='w-full h-full bg-[#d9d9d9] rounded-lg mx-3 TypingArea'
                        placeholder="Write a comment..."

                    ></textarea>
                    <div>
                        <svg className="h-10 w-10 text-dark-green cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            onChange={handleInputChange}>
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentSection;
