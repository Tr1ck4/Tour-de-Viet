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
        return fetch(`${baseUrl}/api/flights`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "flightID":newData.flightID,
                "flightName":newData.flightName, 
                "startDate":newData.startDate, 
                "endDate" :newData.endDate, 
                "price" :newData.price, 
                "goFrom" :newData.goFrom, 
                "arriveAt":newData.arriveAt,
            })
        })
            .then(response => response.json())
            .catch(error => {
                console.error('Error creating flights:', error);
            });
    }
    
    async updateFlights(newData) {
        return fetch(`${baseUrl}/api/flights/${flightID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "flightID":newData.flightID,
                "flightName":newData.flightName, 
                "startDate":newData.startDate, 
                "endDate" :newData.endDate, 
                "price" :newData.price, 
                "goFrom" :newData.goFrom, 
                "arriveAt":newData.arriveAt,
            })
        })
        .then(response => response.json())
        .catch(error => {
            console.error('Error updating flights', error);
        });
    }
}