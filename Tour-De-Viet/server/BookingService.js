
class BookingService{
  constructor(userName, tourName, flightID, cardID) {
      this.baseUrl  = 'http://localhost:3000';
      this.userName = userName;
      this.tourName = tourName;
      this.flightID = flightID; 
      this.cardID   = cardID;
  }

  async fetchBookings() {
    try{
      const response = await fetch(`${this.baseUrl}/api/bookings/info`);
      if(response.status === 200){
        return response.json();
      }
      else{
        throw new Error(response.status);
      }
    }catch(error){
      throw error;
    }
    
  }
  async createBooking(newData) {
    try {
      const response = await fetch(`${this.baseUrl}/api/bookings`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              "userName": newData.userName,
              "tourName": newData.tourName,
              "flightID": newData.flightID,
              "cardID": newData.cardID,
          })
      });

      if (!response.ok) {
          throw new Error('Failed to create booking');
      }

      return response.status;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      if (error.message === 'Token not found'){
        window.location.href('/login');
      }
      throw error; 
    }
  }
}

export default BookingService;





