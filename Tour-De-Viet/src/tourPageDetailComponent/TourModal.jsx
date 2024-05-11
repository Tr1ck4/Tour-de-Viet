import {setState, useEffect} from 'react';
import AccountService from '../../server/AccountService';
import BookingService from '../../server/BookingService';
export default function TourModal({data, isClose}){
    const [info, setInfo] = setState({});
    const accountservice = new AccountService();
    const bookservice = new BookingService();
    useEffect(async () => {
        const response = await accountservice.fetchAccount();
        if (response){
            setInfo(response);
        }
    },[])
    const handleBook = async ()=>{
        try{
            const response = await bookservice.createBooking({
                "userName": info.userName,
                "tourName": data.tourName,
                "flightID": data.transportationID,
                "cardID": info.cardID,
            })
            if (response){
                isClose = true;
            }
        }catch (error){
            console.log(error);
        }
        
        
    }
    return (
        <>
            {!isClose && 
                <div>
                    <div>
                        <form>
                            <div>
                                ${data.tourName}
                            </div>
                            <ul>
                                <li>
                                    ${info.userName}
                                </li>
                                <li>${info.telNum}</li>
                                <li>${info.email}</li>
                                <li>${data.price}</li>
                                <li>${data.startDate} - ${data.endDate}</li>
                                <li>${data.transportationID}? ${data.transportationID} : ${null}</li>
                                <li><input>
                                    Card ID
                                </input></li>
                                <li>
                                    <button onClick = {handleBook}> Checkout</button>
                                </li>
                            </ul>
                        </form>
                        <div> exit button</div>
                    </div>
                </div>
            }
        </>
    );
}