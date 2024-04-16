class ToursService {
  constructor(townID, tourName, description, startDate, endDate, price, images) {
    this.baseUrl = 'http://localhost:3000';
    this.townID = townID;
    this.tourName = tourName;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.price = price;
    this.images = images;
  }


  async fetchTour(tourName) {
    return fetch(`${this.baseUrl}/api/tours/${tourName}`)
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching tours:', error);
      });
  }

  async fetchAllTour() {
    return fetch(`${this.baseUrl}/api/alltours`)
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching all tours:', error);
      });
  }

  async createTour(newData) {
    return fetch(`${this.baseUrl}/api/tours`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(
        {
          'townID': newData.townID,
          'tourName': newData.tourName,
          'description': newData.description,
          'startDate': newData.startDate,
          'endDate': newData.endDate,
          'price': newData.price,
          'images': newData.images
        }
      )
    })
      .then(response => response.status)
      .catch(error => {
        console.error('Error creating tour:', error);
      });
  }

  async updateTour(newdata) {
    return fetch(`${this.baseUrl}/api/tours/${newdata.tourName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        'townID': newdata.townID,
        'tourName': newdata.tourName,
        'description': newdata.description,
        'startDate': newdata.startDate,
        'endDate': newdata.endDate,
        'price': newdata.price,
        'images': newdata.images
      })
    })
      .then(response => response.status)
      .catch(error => {
        console.error('Error updating tour:', error);
      });
  }

}

export default ToursService;