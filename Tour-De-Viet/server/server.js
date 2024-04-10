import express from 'express';
import UserModel from './database.js';
const userModel = new UserModel('./database.db');

export const app = express();
const PORT = 3000;


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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/api/tours/:tourName', (req, res) => {
    const {tourName} = req.params;
  
    userModel.getTour(tourName, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
  });

  app.post('/api/tours', (req, res) => {
    const { townID, tourName, description, startDate, endDate, price, images } = req.body;
  
    userModel.createTour(townID, tourName, description, startDate, endDate, price, images, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Tour created',
            data: req.body,
            result,
        });
    });
  });

  app.put('/api/tours/:tourName', (req, res) => {
    const {tourName } = req.params;
    const { description, startDate, endDate, price, images } = req.body;
  
    userModel.updateRating(tourName, description, startDate, endDate, price, images, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Tour updated',
            data: req.body
        });
    });
  });
