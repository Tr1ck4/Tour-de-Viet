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

//create account
app.post('/api/accounts', (req, res) => {
    const { username, password, citizenID, name, address, age, tel, email } = req.body;

    userModel.createAccounts(username, password, citizenID, name, address, age, tel, email, (err, result) => {
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

//get account info
app.get('/api/accounts/:userName', (req, res) => {
    const { username } = req.params;

    userModel.getAccount(username, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});

//update account
app.put('/api/accounts/:userName', (req, res) => {
    const { userName } = req.params;
    const { password, citizenID, name, address, age, tel, email } = req.body;

    userModel.updateRating(userName, password, citizenID, name, address, age, tel, email, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Account updated',
            data: req.body
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
