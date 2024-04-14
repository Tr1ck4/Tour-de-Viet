
class BookingService{
  constructor(userName, tourName, flightID, cardID) {
      this.baseUrl  = 'http://localhost:3000';
      this.userName = userName;
      this.tourName = tourName;
      this.flightID = flightID; 
      this.cardID   = cardID;
  }

  async fetchBookings(userName) {
    return fetch(`${this.baseUrl}/api/bookings/${userName}`)
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching bookings:', error);
      });
  }

  async createBooking(newData) {
    try {
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
        console.error('Error creating booking:', error);
        throw error; 
    }
  }
}

export default BookingService;





