class ToursService{
    constructor() {
        this.baseUrl = 'http://localhost:3000';
      }
    
    async fetchTour(tourName){
        return fetch(`${this.baseUrl}/api/tours/${tourName}`)
        .then(response => response.json())
        .catch(error => {
          console.error('Error fetching comments:', error);
        });
    }

    async createTour(townID, tourName, description, startDate, endDate, price, images){
        const requestData ={
            townID, tourName, description, startDate, endDate, price, images
        };

        return fetch(`${this.baseUrl}/api/tours`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
          })
            .then(response => response.json())
            .catch(error => {
              console.error('Error creating comment:', error);
            });
    }

    async updateTour(tourName, description, startDate, endDate, price, images){
        return fetch(`${this.baseUrl}/api/tours/${tourName}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tourName, description, startDate, endDate, price, images })
          })
            .then(response => response.json())
            .catch(error => {
              console.error('Error updating rating:', error);
            });
    }

}

export default ToursService;