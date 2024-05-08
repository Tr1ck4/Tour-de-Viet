class ToursService {
  constructor(townID, tourName, description, category, startDate, endDate, price, images) {
    this.baseUrl = 'http://localhost:3000';
    this.townID = townID;
    this.tourName = tourName;
    this.description = description;
    this.category = category;
    this.startDate = startDate;
    this.endDate = endDate;
    this.price = price;
    this.images = images;
  }

  async fetchTour(townID, tourName) {
    return fetch(`${this.baseUrl}/api/tours/${townID}/${tourName}`)
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching tours:', error);
      });
  }

  async fetchAllTour(townID) {
    return fetch(`${this.baseUrl}/api/tours/${townID}`)
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching tours:', error);
      });
  }

  async createTour(newData) {
    try {
      const response = await fetch(`${this.baseUrl}/api/tours`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'townID': newData.townID,
          'tourName': newData.tourName,
          'description': newData.description,
          'category': newData.category,
          'startDate': newData.startDate,
          'endDate': newData.endDate,
          'price': newData.price,
          'transportationID': newData.transportationID
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create tour');
      }

      return response.status;
    } catch (error) {
      console.error('Error creating tour:', error);
      if (error.message === 'Token not found') {
        window.location.href('/login');
      }
      throw error;
    }
  }

  async updateTour(newData) {
    try {
      const response = await fetch(`${this.baseUrl}/api/tours/${newData.tourName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'townID': newData.townID,
          'tourName': newData.tourName,
          'description': newData.description,
          'category': newData.category,
          'startDate': newData.startDate,
          'endDate': newData.endDate,
          'price': newData.price,
          'images': newData.images
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update tour');
      }

      return response.status;
    } catch (error) {
      console.error('Error updating tour:', error);
      if (error.message === 'Token not found') {
        window.location.href('/login');
      }
      throw error;
    }
  }
}

export default ToursService;