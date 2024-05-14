// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function AdminPage() {
//     const [role, setRole] = useState('');

//     useEffect(() => {
//         const fetchRole = async () => {
//             try {
//                 const response = await axios.get('/api/authenticate');
//                 console.log(response.data.accountname);
//                 setRole(response.data.accountname);
//             } catch (error) {
//                 console.error('Error fetching role:', error);
//             }
//         };
//         fetchRole();
//     }, []);

//     return (
//         <>
//             {/* {role === 'admin' && ( */}
//             <main>
//                 <p> Hello</p>
//             </main>
//             {/* )}
//             {role !== 'admin' && (
//                 <div>
//                     <h1>Access Denied</h1>
//                 </div>
//             )} */}
//         </>
//     );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingModal from './BookingModal';
import TransportationModal from './TransporationModal'
import background from '.././images/background.png'
import corner from '.././images/corner.png'

export default function AdminPage() {
    const [role, setRole] = useState('');
    const [tours, setTours] = useState([]);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isTransportationModalOpen, setIsTransportationModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [selectedTransportation, setSelectedTransporation] = useState(null);
    const [onBook, setOn] = useState([]);
    const [closeBook, setClose] = useState([]);
    const [transportations, setTransportation] = useState([]);
    const [currentPage, setCurrentPage] = useState('onGoing Tour');

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const response = await axios.get('/api/authenticate');
                console.log(response.data.accountname);
                setRole(response.data.accountname);
            } catch (error) {
                console.error('Error fetching role:', error);
            }
        };

        const fetchBookings = async () => {
            try {
                const response = await axios.get('/api/tours');
                console.log(response.data);
                setTours(response.data);

                const currentDate = Date.parse(new Date());
                const ongoing = response.data.filter(tour => Date.parse(tour.endDate) > currentDate);
                const history = response.data.filter(tour => Date.parse(tour.endDate) < currentDate);
                console.log(ongoing);
                console.log(history);

                setOn(ongoing);
                setClose(history);
            } catch (error) {
                console.error('Error fetching Tours:', error);
            }
        };

        const fetchTransporations = async () => {
            try {
                const response = await axios.get('/api/transportations');
                console.log(response.data);
                setTransportation(response.data);

            } catch (error) {
                console.error('Error fetching transportation:', error);
            }
        };

        fetchRole();
        fetchBookings();
        fetchTransporations();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/tours/${id}`); // Adjust this to your API endpoint
            setBookings((prev) => prev.filter((booking) => booking.id !== id));
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    const handleBookingClick = (booking) => {
        setSelectedBooking(booking);
        setIsBookingModalOpen(true);
    };

    const handleTransportationClick = (transportation) => {
        setSelectedTransporation(transportation);
        setIsTransportationModalOpen(true);
    };

    const handleModalClose = () => {
        setIsBookingModalOpen(false);
        setIsTransportationModalOpen(false);
        setSelectedBooking(null);
        setSelectedTransporation(null);
    };

    const handleSave = async (updatedBooking) => {
        try {
            await axios.put(`/api/bookings/${updatedBooking.id}`, updatedBooking); // Update API endpoint
            setBookings((prev) =>
                prev.map((booking) =>
                    booking.id === updatedBooking.id ? updatedBooking : booking
                )
            );
        } catch (error) {
            console.error('Error updating booking:', error);
        }
        handleModalClose();
    };
    let content; // Variable to hold the content to render


    const CurrentTourPage = () => {
        return (
            <ul className="relative">
                <li className='sticky w-11/12 h-24 rounded-xl grid grid-cols-5 gap-10 bg-bone-white inset-0 mx-auto mt-7 font-itim text-black  content-center pl-10 ' >
                    <p>Tour's name</p>
                    <p>Start Date</p>
                    <p>End Date</p>
                    <p>Total payment</p>
                </li>
                <div className="h-96 no-scrollbar overflow-y-auto">
                    {onBook.map((booking) => {
                        return (
                            <div className='relative'>
                                <li className='w-11/12 h-24 rounded-xl grid grid-cols-5 gap-10 bg-bone-white inset-0 mx-auto mt-7 font-itim text-black  content-center pl-10 ' onClick={() => handleBookingClick(booking)}>
                                    <p>{booking.tourName}</p>
                                    <p>{new Date(booking.startDate).toLocaleDateString(('en-GB'))}</p>
                                    <p>{new Date(booking.endDate).toLocaleDateString(('en-GB'))}</p>
                                    <p>{booking.price}</p>
                                </li>
                                <button className='absolute top-5 right-20 w-1/12 h-14 bg-bright-yellow text-xl rounded-xl font-itim shadow-lg drop-shadow-2xl' onClick={() => handleDelete(booking.id)}>
                                    Delete
                                </button>
                            </div>
                        )
                    })}
                </div>

            </ul>
        );
    };
    const PastTourPage = () => {
        return (
            <ul className="relative">
                <li className=' sticky w-11/12 h-24 rounded-xl grid grid-cols-5 gap-10 bg-light-green inset-0 mx-auto mt-7 font-itim text-white  content-center pl-10 '>
                    <p>Tour's name</p>
                    <p>Start Date</p>
                    <p>End Date</p>
                    <p>Total payment</p>
                </li>
                <div className="h-96 no-scrollbar overflow-y-auto">
                    {closeBook.map((booking) => {
                        return (
                            <div className='relative'>
                                <li className='w-11/12 h-24 rounded-xl grid grid-cols-5 gap-10 bg-light-green inset-0 mx-auto mt-7 font-itim text-white  content-center pl-10 ' onClick={() => handleBookingClick(booking)}>
                                    <p>{booking.tourName}</p>
                                    <p>{new Date(booking.startDate).toLocaleDateString(('en-GB'))}</p>
                                    <p>{new Date(booking.endDate).toLocaleDateString(('en-GB'))}</p>
                                    <p>{booking.price}</p>
                                </li>
                                <button className='absolute top-5 right-20 w-1/12 h-14 bg-bright-yellow text-xl rounded-xl font-itim shadow-lg drop-shadow-2xl' onClick={() => handleDelete(booking.id)}>
                                    Delete
                                </button>
                            </div>
                        )
                    })}
                </div>
            </ul>
        )
    }
    const TransportationPage = () => {
        if (!Array.isArray(transportations)) {
            return <div>Loading...</div>; // Or a similar fallback for when data isn't ready
        }
        return (
            <ul>
                <li className='w-11/12 h-24 rounded-xl grid grid-cols-5 gap-10 bg-light-green inset-0 mx-auto mt-7 font-itim text-white  content-center pl-10 ' >
                    <p>Transportation ID:</p>
                    <p>Name:</p>
                    <p >Start Date:</p>
                    <p>End Date:</p>
                </li>
                {transportations.map((transportation) => {
                    return (
                        <li className='w-11/12 h-24 rounded-xl grid grid-cols-5 gap-10 bg-light-green inset-0 mx-auto mt-7 font-itim text-white  content-center pl-10 ' onClick={() => handleTransportationClick(transportation)}>
                            <p>{transportation.ID}</p>
                            <p>{transportation.Name}</p>
                            <p>{transportation.startDate}</p>
                            <p>{transportation.endDate}</p>
                        </li>
                    )
                })}
            </ul>
        )
    }
    switch (currentPage) {
        case 'onGoing Tour':
            content = <CurrentTourPage />;
            break;
        case 'past Tour':
            content = <PastTourPage />;
            break;
        case 'transportation Page':
            content = <TransportationPage />;
            break;
        default:
            content = <CurrentTourPage />;
    }
    return (
        <>
            {/* {role === 'admin' ? ( */}
            <main>
                {/* <h1>Admin Page</h1>
                    <div>
                        {bookings.map((booking) => (
                            <div key={booking.id} className="booking-card">
                                <li className='w-11/12 h-24 rounded-xl grid grid-cols-5 gap-10 bg-light-green inset-0 mx-auto mt-7 font-itim text-white  content-center pl-10 '>
                                        <p>{booking.tourName}</p>
                                        <p>{new Date(booking.startDate).toLocaleDateString(('en-GB'))}</p>
                                        <p>{new Date(booking.endDate).toLocaleDateString(('en-GB'))}</p>
                                        <p>{booking.price}</p>
                                </li>
                                <button onClick={() => handleDelete(booking.id)}>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div> */}
                <div className='relative overflow-hidden h-screen'>
                    <div>
                        <img src={background} alt="" />
                        <img src={corner} alt="" className='absolute w-2/3 right-0 top-0' />
                    </div>
                    <div className='absolute w-4/5 h-4/5 rounded-xl inset-0 mx-auto mt-32 bg-dark-green bg-opacity-90 drop-shadow-2xl shadow-2xl font-itim'>
                        <button className='bg-bright-yellow absolute my-5 mx-12 w-1/12 h-14 text-xl rounded-xl font-itim shadow-lg drop-shadow-2xl' onClick={() => setCurrentPage('onGoing Tour')}> On Going</button>
                        <button className='bg-bright-yellow absolute mx-52 my-5 w-1/12 h-14 text-xl rounded-xl font-itim shadow-lg drop-shadow-2xl' onClick={() => setCurrentPage('past Tour')}> History</button>
                        <button className='bg-bright-yellow absolute ml-96 my-5 w-1/12 h-14 text-xl rounded-xl font-itim shadow-lg drop-shadow-2xl' onClick={() => setCurrentPage('transportation Page')}> Transportation</button>

                        <div className=' h-5/6 inset-0 mt-20 mx-auto absolute no-scrollbar overflow-y-auto text-3xl '>
                            {content}
                        </div>
                    </div>
                    {isBookingModalOpen && selectedBooking && (
                        <BookingModal
                            booking={selectedBooking}
                            onClose={handleModalClose}
                            onSave={handleSave}
                        />
                    )}
                    {isTransportationModalOpen && selectedTransportation && (
                        <TransportationModal
                            transportation={selectedTransportation}
                            onClose={handleModalClose}
                            onSave={handleSave}
                        />
                    )}
                </div>

            </main>
            {/* ) : 
            (
                <div>
                    <h1>Access Denied</h1>
                </div>
            )} */}
        </>
    );
}

