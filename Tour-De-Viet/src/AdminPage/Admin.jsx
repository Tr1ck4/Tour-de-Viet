// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import BookingModal from './BookingModal';
// import TransportationModal from './TransporationModal'
// import background from '.././images/background.png'
// import corner from '.././images/corner.png'

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

    // return (
    //     <>
    //         {/* {role === 'admin' && ( */}
    //         <main>
    //             <p> Hello</p>
    //         </main>
    //         {/* )}
    //         {role !== 'admin' && (
    //             <div>
    //                 <h1>Access Denied</h1>
    //             </div>
    //         )} */}
    //     </>
    // );
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
    const [createTransportation,setCreateTransportation] = useState(false);
    const [createTour,setCreateTour]= useState(false);
    // const [emptyTransporation,setEmptyTransportation] = useState({

    // })
    const emptyTransporation = {
        ID:'',Name:'', startDate:'', endDate:'', price:'', goFrom:'', arriveAt:'', type :''
    }
    const emptyTour = {
        townID:'', tourName:'', newDescription:'', category:'', price:'', transportationID:''
    }
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

        const fetchTours = async () => {
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
        fetchTours();
        fetchTransporations();
    }, []);

    const handleDeletePastTour = async (tourName) => {
        try {
            await axios.delete(`/api/tours/${tourName}`);
            setClose((prev) => prev.filter((tour) => tour.tourName !== tourName));
        } catch (error) {
            console.error('Error deleting Tour:', error);
        }
    };
    const handleDeleteOngoingTour = async (tourName) => {
        try {
            await axios.delete(`/api/tours/${tourName}`);
            setOn((prev) => prev.filter((tour) => tour.tourName !== tourName));
        } catch (error) {
            console.error('Error deleting Tour:', error);
        }
    };

    const handleDeleteTransportation = async (transportationID) => {
        try {
            await axios.delete(`/api/transportation/${transportationID}`);
            setTransportation((prev) => prev.filter((transportation) => transportation.ID !== transportationID));
        } catch (error) {
            console.error('Error deleting Transportation:', error);
        }
    };

    const handleBookingClick = (booking) => {
        setSelectedBooking(booking);
        setCreateTour(false);
        setIsBookingModalOpen(true);
    };

    const handleTransportationClick = (transportation) => {
        setSelectedTransporation(transportation);
        setCreateTransportation(false);
        setIsTransportationModalOpen(true);
    };

    const handleCreateTransportationModal = () => {
        setCreateTransportation(true);
        setIsTransportationModalOpen(true);
    };

    const handleCreateTourModal = () => {
        setCreateTour(true);
        setIsBookingModalOpen(true);
    };

    const handleModalClose = () => {
        setIsBookingModalOpen(false);
        setIsTransportationModalOpen(false);
        setSelectedBooking(null);
        setSelectedTransporation(null);
    };

    const handleSaveTour = async (updatedTour) => {
        try {
            await axios.put(`/api/tours/${updatedTour.tourName}`, updatedTour); // Update API endpoint
            setTours((prev) =>
                prev.map((tour) =>
                    tour.tourName === updatedTour.tourName ? updatedTour : tour
                )
            );
            setOn((prev) =>
                prev.map((tour) =>
                    tour.tourName === updatedTour.tourName ? updatedTour : tour
                )
            );
            setClose((prev) =>
                prev.map((tour) =>
                    tour.tourName === updatedTour.tourName ? updatedTour : tour
                )
            );
        } catch (error) {
            console.error('Error updating Tour:', error);
        }
        handleModalClose();
    };

    const handleSaveTransportation = async (updatedTransportation) => {
        try {
            await axios.put(`/api/transportations/${updatedTransportation.ID}`, updatedTransportation); // Update API endpoint
            setTransportation((prev) =>
                prev.map((transportation) =>
                    transportation.ID === updatedTransportation.ID ? updatedTransportation : transportation
                )
            );
        } catch (error) {
            console.error('Error updating transportation:', error);
        }
        handleModalClose();
    };

    const handleCreateTour = async (newTour) => {
        try {
            // Make a POST request to the API endpoint to create a new transportation
            const response = await axios.post('/api/tours', newTour);
            
            // Update the local state with the new transportation
            setTours((prev) => [...prev, response.data]);
            
            // Optionally, you can display a success message or handle the response data in any other way
            console.log('New tour created:', response.data);
        } catch (error) {
            console.error('Error creating tour:', error);
            // Optionally, you can display an error message or handle the error in any other way
        }
    };
    const handleCreateTransportation = async (newTransportation) => {
        try {
            // Make a POST request to the API endpoint to create a new transportation
            const response = await axios.post('/api/transportations', newTransportation);
            
            // Update the local state with the new transportation
            setTransportation((prev) => [...prev, response.data]);
            
            // Optionally, you can display a success message or handle the response data in any other way
            console.log('New transportation created:', response.data);
        } catch (error) {
            console.error('Error creating transportation:', error);
            // Optionally, you can display an error message or handle the error in any other way
        }
    };
    let content; // Variable to hold the content to render


    const CurrentTourPage = () => {
        return (
            <ul className="relative">
                <li className='sticky w-11/12 h-24 rounded-xl grid grid-cols-6 gap-10 bg-bone-white inset-0 mx-auto mt-7 font-itim text-black  content-center pl-10 ' >
                    <p>Tour's name</p>
                    <p>Start Date</p>
                    <p>End Date</p>
                    <p>Total bookings</p>
                    <p>Total payment</p>
                </li>
                <div className="h-96 no-scrollbar overflow-y-auto">
                    {onBook.map((booking) => {
                        return (
                            <div className='relative'>
                                <li className='w-11/12 h-24 rounded-xl grid grid-cols-6 gap-10 bg-bone-white inset-0 mx-auto mt-7 font-itim text-black  content-center pl-10 ' onClick={() => handleBookingClick(booking)}>
                                    <p>{booking.tourName}</p>
                                    <p>{new Date(booking.startDate).toLocaleDateString(('en-GB'))}</p>
                                    <p>{new Date(booking.endDate).toLocaleDateString(('en-GB'))}</p>
                                    <p>{booking.numBookings}</p>
                                    <p>{booking.price}</p>
                                </li>
                                <button className='absolute top-5 right-20 w-1/12 h-14 bg-bright-yellow text-xl rounded-xl font-itim shadow-lg drop-shadow-2xl' onClick={() => handleDeleteOngoingTour(booking.tourName)}>
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
                <li className=' sticky w-11/12 h-24 rounded-xl grid grid-cols-6 gap-10 bg-light-green inset-0 mx-auto mt-7 font-itim text-white  content-center pl-10 '>
                    <p>Tour's name</p>
                    <p>Start Date</p>
                    <p>End Date</p>
                    <p>Total bookings</p>
                    <p>Total payment</p>
                </li>
                <div className="h-96 no-scrollbar overflow-y-auto">
                    {closeBook.map((booking) => {
                        return (
                            <div className='relative'>
                                <li className='w-11/12 h-24 rounded-xl grid grid-cols-6 gap-10 bg-light-green inset-0 mx-auto mt-7 font-itim text-white  content-center pl-10 ' onClick={() => handleBookingClick(booking)}>
                                    <p>{booking.tourName}</p>
                                    <p>{new Date(booking.startDate).toLocaleDateString(('en-GB'))}</p>
                                    <p>{new Date(booking.endDate).toLocaleDateString(('en-GB'))}</p>
                                    <p>{booking.numBookings}</p>
                                    <p>{booking.price}</p>
                                </li>
                                <button className='absolute top-5 right-20 w-1/12 h-14 bg-bright-yellow text-xl rounded-xl font-itim shadow-lg drop-shadow-2xl' onClick={() => handleDeletePastTour(booking.tourName)}>
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
            <ul className="relative">
                <li className='sticky w-11/12 h-24 rounded-xl grid grid-cols-5 gap-10 bg-light-green inset-0 mx-auto mt-7 font-itim text-white  content-center pl-10 ' >
                    <p>ID</p>
                    <p>Name</p>
                    <p >Start Date</p>
                    <p>End Date</p>
                </li>
                <div className="h-96 no-scrollbar overflow-y-auto">
                {transportations.map((transportation) => {
                    return (
                        <div className='relative'>
                        <li className='w-11/12 h-24 rounded-xl grid grid-cols-5 gap-10 bg-light-green inset-0 mx-auto mt-7 font-itim text-white  content-center pl-10 ' onClick={() => handleTransportationClick(transportation)}>
                            <p>{transportation.ID}</p>
                            <p>{transportation.Name}</p>
                            <p>{transportation.startDate}</p>
                            <p>{transportation.endDate}</p>
                        </li>
                        <button className='absolute top-5 right-20 w-1/12 h-14 bg-bright-yellow text-xl rounded-xl font-itim shadow-lg drop-shadow-2xl' onClick={() => handleDeleteTransportation(transportation.ID)}>
                                    Delete
                                </button>
                        </div>
                    )
                })}
                </div>
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
            {role === 'admin' ? (
            <main>
                <div className='relative overflow-hidden h-screen'>
                    <div>
                        <img src={background} alt="" />
                        <img src={corner} alt="" className='absolute w-2/3 right-0 top-0' />
                    </div>
                    <div className='absolute w-4/5 h-4/5 rounded-xl inset-0 mx-auto mt-32 bg-dark-green bg-opacity-90 drop-shadow-2xl shadow-2xl font-itim'>
                        <div className='flex justify-between mx-12 my-5 '>
                            <button className='bg-bright-yellow w-1/4 h-14 text-xl rounded-xl font-itim shadow-lg drop-shadow-2xl'
                                onClick={() => setCurrentPage('onGoing Tour')}>
                                On Going
                            </button>
                            <button className='bg-bright-yellow w-1/4 h-14 ml-5 text-xl rounded-xl font-itim shadow-lg drop-shadow-2xl'
                                onClick={() => setCurrentPage('past Tour')}>
                                History
                            </button>
                            <button className='bg-bright-yellow w-1/4 h-14 text-xl ml-5 rounded-xl font-itim shadow-lg drop-shadow-2xl'
                                onClick={() => setCurrentPage('transportation Page')}>
                                Transportation
                            </button>
                            <button className='bg-bright-yellow w-1/12 h-14 text-xl rounded-xl font-itim shadow-lg drop-shadow-2xl ml-auto flex items-center justify-center' onClick={() => currentPage === 'transportation Page' ? handleCreateTransportationModal() : handleCreateTourModal()}>
                        Add
                </button>
                        </div>
                        <div className=' h-5/6 inset-0 mt-20 mx-auto absolute no-scrollbar overflow-y-auto text-3xl '>
                            {content}
                        </div>
                    </div>
                    {isBookingModalOpen && selectedBooking && (
                        <BookingModal
                            booking={selectedBooking}
                            onClose={handleModalClose}
                            onSave={handleSaveTour}
                        />
                    )}
                    {isTransportationModalOpen && selectedTransportation && (
                        <TransportationModal
                            transportation={selectedTransportation}
                            onClose={handleModalClose}
                            onSave={handleSaveTransportation}
                        />
                    )}

                    {isTransportationModalOpen && createTransportation && (
                        <TransportationModal
                            transportation={emptyTransporation}
                            onClose={handleModalClose}
                            onSave={handleCreateTransportation}
                        />
                    )}

                    {isBookingModalOpen && createTour && (
                        <BookingModal
                        booking={emptyTour}
                        onClose={handleModalClose}
                        onSave={handleCreateTour}
                    />
                    )}
                </div>

            </main>
             ) : 
            (
                <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100 text-gray-800">
                    <div className="text-6xl mb-4 text-red-500">🚫</div>
                    <h1 className="text-4xl font-bold mb-2">Access Denied</h1>
                    <p className="text-lg text-gray-600">You don't have permission to enter this page.</p>
                </div>
            )
        }
        </>
    );
}

