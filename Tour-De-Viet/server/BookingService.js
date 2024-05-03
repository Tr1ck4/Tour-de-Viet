
class BookingService{
  constructor(userName, tourName, flightID, cardID) {
      this.baseUrl  = 'http://localhost:3000';
      this.userName = userName;
      this.tourName = tourName;
      this.flightID = flightID; 
      this.cardID   = cardID;
  }

  async fetchBookings(userName) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await fetch(`${this.baseUrl}/api/bookings/${userName}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      if (error.message === 'Token not found'){
        window.location.href('/login');
      }
      throw error; 
    }
  }
  
  async createBooking(newData) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await fetch(`${this.baseUrl}/api/bookings`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
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





