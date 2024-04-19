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

    async createTour(newData){
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await fetch(`${this.baseUrl}/api/tours`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            'townID':newData.townID, 
            'tourName':newData.tourName, 
            'description':newData.description, 
            'startDate':newData.startDate, 
            'endDate':newData.endDate, 
            'price':newData.price, 
            'images':newData.images
          })
        });
    
        if (!response.ok) {
          throw new Error('Failed to create tour');
        }
    
        return response.status;
      } catch (error) {
        console.error('Error creating tour:', error);
        if (error.message === 'Token not found'){
          window.location.href('/login');
        }
        throw error;
      }
    }
    
    async updateTour(newData){
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await fetch(`${this.baseUrl}/api/tours/${newData.tourName}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ 
            'townID':newData.townID, 
            'tourName':newData.tourName, 
            'description':newData.description, 
            'startDate':newData.startDate, 
            'endDate':newData.endDate, 
            'price':newData.price, 
            'images':newData.images
          })
        });
    
        if (!response.ok) {
          throw new Error('Failed to update tour');
        }
    
        return response.status;
      } catch (error) {
        console.error('Error updating tour:', error);
        if (error.message === 'Token not found'){
          window.location.href('/login');
        }
        throw error;
      }
    }
    

}

export default ToursService;