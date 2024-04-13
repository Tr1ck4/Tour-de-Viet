class ToursService{
    constructor(townID, tourName, description, startDate, endDate, price, images) {
      this.baseUrl = 'http://localhost:3000';
      this.townID =townID;
      this.tourName =tourName;
      this.description =description;
      this.startDate =startDate;
      this.endDate =endDate;
      this.price =price;
      this.images =images;
    }
    

    async fetchTour(tourName){
        return fetch(`${this.baseUrl}/api/tours/${tourName}`)
        .then(response => response.json())
        .catch(error => {
          console.error('Error fetching tours:', error);
        });
    }

    async createTour(){
        return fetch(`${this.baseUrl}/api/tours`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              'townID':this.townID, 
              'tourName':this.tourName, 
              'description':this.description, 
              'startDate':this.startDate, 
              'endDate':this.endDate, 
              'price':this.price, 
              'images':this.images
            }
          )
        })
        .then(response => response.status)
        .catch(error => {
          console.error('Error creating tour:', error);
        });
    }

    async updateTour(newdata){
        return fetch(`${this.baseUrl}/api/tours/${newdata.tourName}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            'townID':newdata.townID, 
            'tourName':newdata.tourName, 
            'description':newdata.description, 
            'startDate':newdata.startDate, 
            'endDate':newdata.endDate, 
            'price':newdata.price, 
            'images':newdata.images
          })
        })
        .then(response => response.status)
        .catch(error => {
          console.error('Error updating tour:', error);
        });
    }

}

export default ToursService;