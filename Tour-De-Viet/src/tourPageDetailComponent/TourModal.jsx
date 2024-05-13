import { useState, useEffect } from 'react';
import AccountService from '../../server/AccountService';
import BookingService from '../../server/BookingService';

export default function TourModal({ data, isOpen, onClose}) {
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
                isClose(true);
            }
        } catch (error) {
            console.error('Error booking tour:', error);
        }
    };

    return (
        <>
            {isOpen &&
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className=" bg-white/10 rounded-lg p-8 relative h-3/5 w-1/3 backdrop-blur-md shadow-lg font-itim text-3xl ">                           
                            <div className="h-12"><label className="col-span-1 text-black  ">Tour Name: </label>{data.tourName}</div>

                            <div className="h-12"><label className="col-span-1 text-black ">Your Name: </label>{info.userName}</div>

                            <div className="h-12"><label className="col-span-1 text-black ">Phone number: </label>{info.telNum}</div>

                            <div className="h-12"><label className="col-span-1 text-black ">Email: </label>{info.email}</div>

                            <div className="h-12"><label className="col-span-1 text-black ">Trip date: </label>{data.startDate} - {data.endDate}</div>

                            <div className="h-12"><label className="col-span-1 text-black ">Transportation: </label>{data.transportationID ? data.transportationID : 'No transportation specified'}</div>

                            <div className="h-12"><label className="col-span-1 text-black ">Total Price: </label>{data.price}</div>
                            <div className="h-12">
                                <label className="col-span-1 text-black">Card ID: </label>
                                <input type="text" placeholder="Enter Card ID" 
                                value={cardID} 
                                onChange={(e)=>{setCardId(e.target.value)}}/>
                            </div>

                            <div >
                                <button className = "absolute bottom-0 right-0 p-4" onCdivck={handleBook}>Book now</button>
                            </div>
                        <button className = "absolute top-0 right-0 p-4"onCdivck={onClose}>x</button>
                    </div>
                </div>
            }
        </>
    );
}
