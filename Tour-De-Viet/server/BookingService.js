
class BookingService{
  constructor() {
      this.baseUrl = 'http://localhost:3000';
  }

  async fetchBookings(userName) {
    return fetch(`${this.baseUrl}/api/bookings/${userName}`)
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching bookings:', error);
      });
  }

  async createBooking(userName, tourName, flightID, cardID) {
    const requestData = {
      userName,
      tourName,
      flightID,
      cardID
    };  
    return fetch(`${this.baseUrl}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error creating booking:', error);
      });
  }
}

export default BookingService;





