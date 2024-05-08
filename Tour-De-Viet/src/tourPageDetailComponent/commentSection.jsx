import React, { useState } from 'react';

const CommentSection = () => {
    const [comment, setComment] = useState('');

    const handleInputChange = (event) => {
        setComment(event.target.value);
    };

    return (
        <div className='fixed inset-0 flex justify-center items-center' style={{ zIndex: 9999 }}>
            <div className='h-[500px] w-[900px] bg-bone-white rounded-2xl relative'>
                <div className='h-[380px] mt-5 flex items-center flex-col overflow-y-auto' style={{ '-ms-overflow-style': 'none', 'scrollbar-width': 'none' }}>
                    <div className='bg-[#d9d9d9] w-[850px] h-[60px] comment self-center my-1 rounded-lg commentBox mb-3'>
                        <div className='userName text-dark-green font-semibold ml-2 m'>Loc An</div>
                        <div className='info text-dark-green mx-3 overflow-hidden whitespace-nowrap text-overflow-ellipsis'>
                            This is a very beautiful place to visit, I am sure to comeback.
                        </div>
                    </div>
                    <div className='bg-[#d9d9d9] w-[850px] h-[60px] comment self-center my-1 rounded-lg commentBox mb-3'>
                        <div className='userName text-dark-green font-semibold ml-2 m'>Loc An</div>
                        <div className='info text-dark-green mx-3 overflow-hidden whitespace-nowrap text-overflow-ellipsis'>
                            This is a very beautiful place to visit, I am sure to comeback.
                        </div>
                    </div>
                    <div className='bg-[#d9d9d9] w-[850px] h-[60px] comment self-center my-1 rounded-lg commentBox mb-3'>
                        <div className='userName text-dark-green font-semibold ml-2 m'>Loc An</div>
                        <div className='info text-dark-green mx-3 overflow-hidden whitespace-nowrap text-overflow-ellipsis'>
                            This is a very beautiful place to visit, I am sure to comeback.
                        </div>
                    </div>
                    <div className='bg-[#d9d9d9] w-[850px] h-[60px] comment self-center my-1 rounded-lg commentBox mb-3'>
                        <div className='userName text-dark-green font-semibold ml-2 m'>Loc An</div>
                        <div className='info text-dark-green mx-3 overflow-hidden whitespace-nowrap text-overflow-ellipsis'>
                            This is a very beautiful place to visit, I am sure to comeback.
                        </div>
                    </div>
                    <div className='bg-[#d9d9d9] w-[850px] h-[60px] comment self-center my-1 rounded-lg commentBox mb-3'>
                        <div className='userName text-dark-green font-semibold ml-2 m'>Loc An</div>
                        <div className='info text-dark-green mx-3 overflow-hidden whitespace-nowrap text-overflow-ellipsis'>
                            This is a very beautiful place to visit, I am sure to comeback.
                        </div>
                    </div>
                    <div className='bg-[#d9d9d9] w-[850px] h-[60px] comment self-center my-1 rounded-lg commentBox mb-3'>
                        <div className='userName text-dark-green font-semibold ml-2 m'>Loc An</div>
                        <div className='info text-dark-green mx-3 overflow-hidden whitespace-nowrap text-overflow-ellipsis'>
                            This is a very beautiful place to visit, I am sure to comeback.
                        </div>
                    </div>
                    <div className='bg-[#d9d9d9] w-[850px] h-[60px] comment self-center my-1 rounded-lg commentBox mb-3'>
                        <div className='userName text-dark-green font-semibold ml-2 m'>Loc An</div>
                        <div className='info text-dark-green mx-3 overflow-hidden whitespace-nowrap text-overflow-ellipsis'>
                            This is a very beautiful place to visit, I am sure to comeback.
                        </div>
                    </div>
                    <div className='bg-[#d9d9d9] w-[850px] h-[60px] comment self-center my-1 rounded-lg commentBox mb-3'>
                        <div className='userName text-dark-green font-semibold ml-2 m'>Loc An</div>
                        <div className='info text-dark-green mx-3 overflow-hidden whitespace-nowrap text-overflow-ellipsis'>
                            This is a very beautiful place to visit, I am sure to comeback.
                        </div>
                    </div>
                </div>
                <div className='absolute bottom-0 left-0 right-0 mx-auto w-[850px] h-[60px] mb-5 flex justify-center items-center'>
                    <textarea 
                        className='w-full h-full bg-[#d9d9d9] rounded-lg mx-3 TypingArea' 
                        placeholder="Write a comment..."
                        value={comment} 
                        onChange={handleInputChange}
                    ></textarea>
                    <div>
                        <svg className="h-10 w-10 text-dark-green cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
