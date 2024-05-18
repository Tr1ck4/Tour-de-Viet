import { useState, useEffect } from 'react';
import AccountService from '../../server/AccountService';
import BookingService from '../../server/BookingService';
import './TourModal.css'
// import { MailService } from '../../server/MailService';

function createBookingEmailContent(tourName, username, telNum, startDate, endDate, goFrom, arriveAt, price) {
    return `
        <h1>Confirm booking: ${tourName}</h1>
        <p>Your tour is ready to be scheduled. Please check the below information:</p>
        <ul>
            <li>Tour Name: ${tourName}</li>
            <li>Your Name: ${username}</li>
            <li>Contact Number: ${telNum}</li>
            <li>Start Date: ${startDate}</li>
            <li>End Date: ${endDate}</li>
            <li>Departure: ${goFrom}</li>
            <li>Arrival: ${arriveAt}</li>
            <li>Price: ${price}</li>
        </ul>
        <p>We are excited to have you join us on this tour. If you have any questions, please feel free to contact us.</p>
        <p>Thank you for booking with us!</p>
    `;
}

export default function TourModal({ data, isOpen, onClose }) {
    const [info, setInfo] = useState({});
    const [cardID, setCardId] = useState('');
    const accountService = new AccountService();
    const bookingService = new BookingService();
    // const mailService = new MailService();


    useEffect(() => {
        console.log(data);
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

                // const htmlContent = createBookingEmailContent(
                //     data.tourName,
                //     info.username,
                //     info.telNum,
                //     data.startDate,
                //     data.endDate,
                //     data.goFrom,
                //     data.arriveAt,
                //     data.price
                // );

                // mailService.sendMail(info.email, `Confirm booking ${data.tourName}`, 'Your tour is ready to be scheduled. Please check the below information', htmlContent)
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
