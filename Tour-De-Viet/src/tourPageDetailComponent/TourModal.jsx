import { useState, useEffect } from 'react';
import AccountService from '../../server/AccountService';
import BookingService from '../../server/BookingService';
import './TourModal.css'

export default function TourModal({ data, isOpen, onClose }) {
    const [info, setInfo] = useState({});
    const [cardID, setCardId] = useState('');
    const accountService = new AccountService();
    const bookingService = new BookingService();

    useEffect(() => {
        const fetchAccountInfo = async () => {
            try {
                const response = await accountService.fetchAccount();
                if (response) {
                    setInfo(response);
                }
            } catch (error) {
                alert('You have to login to book');
                window.location.replace('/register');
                console.error('Error fetching account info:', error);
            }
        };
        fetchAccountInfo();
    }, []);

    const handleBook = async () => {
        try {
            const response = await bookingService.createBooking({
                "tourName": data.tourName,
                "transportationID": data.transportationID,
                "cardID": cardID,
            });
            if (response) {
                onClose(true);
            }
        } catch (error) {
            console.error('Error booking tour:', error);
        }
    };

    return (
        <>
            {isOpen &&
                <div className="fixed inset-0 flex items-center justify-center bg-slate-800 bg-opacity-50 z-50">
                    <div className=" bg-white/10 rounded-lg p-8 relative h-2/3 w-1/3 backdrop-blur-md shadow-lg font-itim text-3xl ">                           
                            <div className="h-12"><label className="col-span-1 text-bright-yellow font-bold  ">Tour Name: </label>{data.tourName}</div>

                            <div className="h-12"><label className="col-span-1  text-bright-yellow ">Your Name: </label>{info.userName}</div>

                            <div className="h-12"><label className="col-span-1  text-bright-yellow ">Phone number: </label>{info.telNum}</div>

                            <div className="h-12"><label className="col-span-1  text-bright-yellow ">Email: </label>{info.email}</div>

                            <div className="h-12"><label className="col-span-1  text-bright-yellow ">Trip date: </label>{data.startDate} to {data.endDate}</div>

                            <div className="h-12"><label className="col-span-1  text-bright-yellow ">Transportation: </label>{data.Name ? data.Name : 'No transportation specified'}</div>

                            <div className="h-12"><label className="col-span-1  text-bright-yellow ">Hub: </label>{data.goFrom ? `${data.goFrom} Arrival : ${data.arriveAt}` : 'No transportation specified'}</div>
                            <div className="h-12"><label className="col-span-1  text-bright-yellow ">Total Price: </label>{data.price}</div>
                            <div className="h-12">
                                <div>
                                    <label className="col-span-1  text-bright-yellow">Card ID: </label>
                                </div>
                                <div className='mt-2'>
                                    <input className='bg-bone-white text-dark-green inputCard' type="text" placeholder="Enter Card ID" 
                                    value={cardID} 
                                    onChange={(e)=>{setCardId(e.target.value)}}/>
                                </div>
                            </div>

                            <div>
                                <button className = "absolute bottom-2 right-2 p-4 outline-none hover:outline-none hover:border-none hover:bg-light-green focus:outline-none focus:border-none bookingButton" onClick={handleBook}>Book now</button>
                            </div>
                        <button className = "absolute top-0 right-0 p-4 hover:outline-none hover:border-none focus:outline-none focus:border-none" onClick={onClose}>x</button>
                    </div>
                </div>
            }
        </>
    );
}
