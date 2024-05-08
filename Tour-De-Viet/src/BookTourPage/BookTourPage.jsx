import React, { useEffect, useState } from 'react';
import BookingService from '../../server/BookingService'
import background from '.././images/background.png'
import corner from '.././images/corner.png'
import table_bg from '.././images/bg.png'
import './BookTourPage.css'

export default function History() {
    const [allBooks, setBooks] = useState([]);
    const [onBook, setOn] = useState([]);
    const [closeBook, setClose] = useState([]);
    const [showOngoing, setShowOngoing] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const service = new BookingService();
                const response = await service.fetchBookings();
                setBooks(response);
                const currentDate = Date.parse(new Date());
                const ongoing = response.filter(booking => Date.parse(booking.endDate) > currentDate);
                const history = response.filter(booking => Date.parse(booking.endDate) < currentDate);
                setOn(ongoing);
                setClose(history);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className='relative overflow-hidden h-screen'>
            <div>
                <img src={background} alt="" />
                <img src={corner} alt="" className='absolute w-2/3 right-0 top-0' />
            </div>
            <div className='absolute w-4/5 h-4/5 rounded-xl inset-0 mx-auto mt-32 bg-dark-green bg-opacity-90 drop-shadow-2xl shadow-2xl'>
                <button className='bg-bright-yellow absolute my-5 mx-12 w-1/12 h-14 text-xl rounded-xl font-Itim shadow-lg drop-shadow-2xl' onClick={() => setShowOngoing(true)}> On Going</button>
                <button className='bg-bright-yellow absolute mx-52 my-5 w-1/12 h-14 text-xl rounded-xl font-Itim shadow-lg drop-shadow-2xl' onClick={() => setShowOngoing(false)}> History</button>
                <div className=' h-5/6 inset-0 mt-20 mx-auto absolute no-scrollbar overflow-y-auto text-3xl '>
                    {showOngoing ? (
                        <ul>
                            <li className='w-11/12 h-24 rounded-xl grid grid-cols-5 gap-10 bg-bone-white inset-0 mx-auto mt-7 font-Itim text-black  content-center pl-10 '>
                                <p>Tour's name</p>
                                <p>Start Date</p>
                                <p>End Date</p>
                                <p>Total payment</p>
                            </li>

                            {onBook.map((booking) => {
                                return (
                                    <li className='w-11/12 h-24 rounded-xl grid grid-cols-5 gap-10 bg-light-green-2 inset-0 mx-auto mt-7 font-Itim text-black  content-center pl-10 '>
                                        <p>{booking.tourName}</p>
                                        <p>{new Date(booking.startDate).toLocaleDateString(('en-GB'))}</p>
                                        <p>{new Date(booking.endDate).toLocaleDateString(('en-GB'))}</p>
                                        <p>{booking.price}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    ) : (
                        <ul>
                            <li className='w-11/12 h-24 rounded-xl grid grid-cols-5 gap-10 bg-light-green-2 inset-0 mx-auto mt-7 font-Itim text-black  content-center pl-10 '>
                                <p>Tour's name</p>
                                <p>Start Date</p>
                                <p >End Date</p>
                                <p>Total payment</p>
                            </li>
                            {closeBook.map((booking) => {
                                return (
                                    <li className='w-11/12 h-24 rounded-xl grid grid-cols-5 gap-10 bg-light-green-2 inset-0 mx-auto mt-7 font-Itim text-black  content-center pl-10 '>
                                        <p>{booking.tourName}</p>
                                        <p>{new Date(booking.startDate).toLocaleDateString(('en-GB'))}</p>
                                        <p>{new Date(booking.endDate).toLocaleDateString(('en-GB'))}</p>
                                        <p>{booking.price}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
            </div>

        </div>

    )
}
