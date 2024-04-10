export default UserModel;

const baseUrl = 'http://localhost:3000';

export function fetchBookings(userName) {
  return fetch(`${baseUrl}/api/bookings/${userName}`)
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching bookings:', error);
    });
}

export function createBooking(userName, tourName, flightID, cardID) {
  const requestData = {
    userName,
    tourName,
    flightID,
    cardID
  };

  return fetch(`${baseUrl}/api/bookings`, {
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

export function fetchComments(townID, tourName) {
  return fetch(`${baseUrl}/api/comments/${townID}/${tourName}`)
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching comments:', error);
    });
}

export function createComment(townID,tourName,userName,comment,rating) {
  const requestData = {
    townID,
    tourName,
    userName,
    comment,
    rating
  };

  return fetch(`${baseUrl}/api/comments`, {
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

export function updateCommentRating(townID, tourName, rating) {
  return fetch(`${baseUrl}/api/comments/${townID}/${tourName}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ rating })
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error updating rating:', error);
    });
}
