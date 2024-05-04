class Flight{
    constructor(flightID,flightName, startDate, endDate , price , goFrom , arriveAt) {
        this.baseUrl = 'http://localhost:3000';
        this.flightID = flightID; 
        this.flightName = flightName; 
        this.startDate = startDate; 
        this.endDate = endDate; 
        this.price = price; 
        this.goFrom = goFrom; 
        this.arriveAt = arriveAt; 
    }
    async fetchFlights(flightID) {
        return fetch(`${baseUrl}/api/flights/${flightID}`)
          .then(response => response.json())
            .catch(error => {
            console.error('Error fetching comments:', error);
          });
    }
    
    async createFlights(newData) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
            throw new Error('Token not found');
            }
            const response = await fetch(`${baseUrl}/api/flights`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "flightID": newData.flightID,
                    "flightName": newData.flightName, 
                    "startDate": newData.startDate, 
                    "endDate": newData.endDate, 
                    "price": newData.price, 
                    "goFrom": newData.goFrom, 
                    "arriveAt": newData.arriveAt,
                })
            });
            if (!response.ok) {
                throw new Error('Failed to create flights');
            }
            return response.json();
        } catch (error) {
            console.error('Error creating flights:', error);
            if (error.message === 'Token not found'){
                window.location.href('/login');
              }
            throw error;
        }
    }
    
    async updateFlights(flightID, newData) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
            throw new Error('Token not found');
            }
            const response = await fetch(`${baseUrl}/api/flights/${flightID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "flightID": newData.flightID,
                    "flightName": newData.flightName, 
                    "startDate": newData.startDate, 
                    "endDate": newData.endDate, 
                    "price": newData.price, 
                    "goFrom": newData.goFrom, 
                    "arriveAt": newData.arriveAt,
                })
            });
            if (!response.ok) {
                throw new Error('Failed to update flights');
            }
            return response.json();
        } catch (error) {
            console.error('Error updating flights:', error);
            if (error.message === 'Token not found'){
                window.location.href('/login');
              }
            throw error;
        }
    }
    
}