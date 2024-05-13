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
                    <div className="popup-content">
                        <form>
                            <ul>
                                <li>{data.tourName}</li>
                                <li>{info.userName}</li>
                                <li>{info.telNum}</li>
                                <li>{info.email}</li>
                                <li>{data.price}</li>
                                <li>{data.startDate} - {data.endDate}</li>
                                <li>{data.transportationID ? data.transportationID : 'No transportation specified'}</li>
                                <li>
                                    <input type="text" placeholder="Enter Card ID" 
                                    value={cardID} 
                                    onChange={(e)=>{setCardId(e.target.value)}}/>
                                </li>
                                <li>
                                    <button onClick={handleBook}>Checkout</button>
                                </li>
                            </ul>
                        </form>
                        <div className="close-btn" onClick={onClose}>Close</div>
                    </div>
                </div>
            }
        </>
    );
}
