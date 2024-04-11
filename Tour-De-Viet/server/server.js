import express from 'express';
import UserModel from './database.js';
import path from 'path';
const userModel = new UserModel('./database.db');
const __dirname = path.resolve(path.dirname(''));
export const app = express();
const PORT = 3000;


app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/para', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

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

// Route to get flights
app.get('/api/flights/:flightID', (req, res) => {
  const { flightID} = req.params;

  userModel.getFlights(flightID, (err, row) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json(row);
  });
});

// Route to create a flight
app.post('/api/flights', (req, res) => {
  const {flightName, startDate, endDate , price , goFrom , arriveAt } = req.body;

  userModel.createFlights(flightName, startDate, endDate , price , goFrom , arriveAt, (err, result) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json({
          message: 'Flight created',
          data: req.body,
      });
  });
});

// Route to update a flight's info
app.put('/api/flights/:flightID', (req, res) => {
  const { flightID } = req.params;
  const { flightName, startDate, endDate , price , goFrom , arriveAt } = req.body;

  userModel.updateFlights(flightName, startDate, endDate , price , goFrom , arriveAt, (err) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json({
          message: 'Flight updated',
          data: req.body
      });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
