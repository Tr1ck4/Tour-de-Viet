export default UserModel;
export const app = express();
const PORT = 3000;


export function fetchBookings(userName) {
  return fetch(`${baseUrl}/api/bookings/${userName}`)
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching bookings:', error);
    });
}

app.use(express.json());

app.get('/api/bookings/:userName', (req, res) => {
  const { userName } = req.params;
  const { tourName } = req.query;

  userModel.getBook(userName, tourName, (err, rows) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json(rows);
  });
});

// Route to create a booking
app.post('/api/bookings', (req, res) => {
  const { userName, tourName, flightID, cardID } = req.body;

  userModel.createBook(userName, tourName, flightID, cardID, (err, result) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json({
          message: 'Booking created',
          data: req.body,
      });
  });
});

// Route to get comments
app.get('/api/comments/:townID/:tourName', (req, res) => {
  const { townID, tourName } = req.params;

  userModel.getComments(townID, tourName, (err, row) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json(row);
  });
});

// Route to create a comment
app.post('/api/comments', (req, res) => {
  const { townID, tourName, userName, comment, rating } = req.body;

  userModel.createComments(townID, tourName, userName, comment, rating, (err, result) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json({
          message: 'Comment created',
          data: req.body,
      });
  });
});

// Route to update a comment's rating
app.put('/api/comments/:townID/:tourName', (req, res) => {
  const { townID, tourName } = req.params;
  const { rating } = req.body;

  userModel.updateRating(townID, tourName, rating, (err) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json({
          message: 'Rating updated',
          data: req.body
      });
  });
});

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
