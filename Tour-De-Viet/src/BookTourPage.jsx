import background from './images/background.png'
import corner from './images/corner.png'
import table_bg from './images/bg.png'
import { useEffect } from 'react'
import {useState} from 'react'
import './BookTourPage.css'
// import {authenticateJWT} from '../server/server.js'
function BookTourPage() {
    const [bookings, setBookings] = useState([])
    const [ongoingBookings, setOngoingBookings] = useState([])
    const [historyBookings, setHistoryBookings] = useState([])

    useEffect(()=>{
        fetch('http://localhost:3000/api/bookings/exampleUser')
            .then(res=>{
                return res.json();
            })
            .then(data=>{
                setBookings(data);
                const currentDate = new Date();

                setOngoingBookings(bookings.filter(bookings => new Date(bookings.endDate) > currentDate));
                setHistoryBookings(bookings.filter(bookings => new Date(bookings.endDate) < currentDate));

                
            })
            .catch(err=>console.log(err))
    })

    const [showOngoing, setShowOngoing] = useState(true);

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
                    {showOngoing?(
                        <ul>
                            <li className='w-11/12 h-24 rounded-xl grid grid-cols-5 gap-10 bg-bone-white inset-0 mx-auto mt-7 font-Itim text-black  content-center pl-10 '>
                                <p>Tour's name</p>
                                <p>Start Date</p>
                                <p>End Date</p>
                                <p>Total payment</p>
                            </li>


                            {ongoingBookings.map((booking) => {
                                return (
                                    <li className='w-11/12 h-24 rounded-xl grid grid-cols-5 gap-10 bg-bone-white inset-0 mx-auto mt-7 font-Itim text-black  content-center pl-10 '>
                                        <p>{booking.tourName}</p>
                                        <p>{new Date(booking.startDate).toLocaleDateString(('en-GB'))}</p>
                                        <p>{new Date(booking.endDate).toLocaleDateString(('en-GB'))}</p>
                                        <p>{booking.price}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    ):(
                        <ul>
                                <li className='w-11/12 h-24 rounded-xl grid grid-cols-5 gap-10 bg-light-green-2 inset-0 mx-auto mt-7 font-Itim text-black  content-center pl-10 '>
                                    <p>Tour's name</p>
                                    <p>Start Date</p>
                                    <p >End Date</p>
                                    <p>Total payment</p>
                                </li>
                                {historyBookings.map((booking) => {
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
export default BookTourPage