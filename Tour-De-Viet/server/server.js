import express from 'express';
import UserModel from './database.js';
import path from 'path';
import jwt from 'jsonwebtoken';
import { expressjwt } from "express-jwt";
 
const userModel = new UserModel('./database.db');
const __dirname = path.resolve(path.dirname(''));
const PORT = 3000;
const secretKey = 'TQEWE31824'; 

export const app = express();
export const authenticateJWT = expressjwt({ secret: secretKey, algorithms: ['HS256'] });

app.use(express.json());

app.use(express.static(path.join(__dirname, 'dist')));



function generateToken(user) {
    return jwt.sign(user, secretKey, { expiresIn: '1h' });
}

function authenticateToken(req, res, next) {
    const decoded = jwt.verify(token, secretKey);  
    req.user = decoded;
    next(); 
}

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = userModel.getUser(username, password); 

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = generateToken({ username: user.username });
    res.json({ token });
});

app.get('/api/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'You are authorized', user: req.user });
});

app.get('/para', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/api/bookings/:userName', (req, res) => {
    const { userName } = req.params;

    userModel.getBookings(userName, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// app.get('/api/bookings/:userName', authenticateJWT, (req, res) => {
//     const { userName } = req.params;
//     const { tourName } = req.query;

//     userModel.getBook(userName, tourName, (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json(rows);
//     });
// });

app.post('/api/bookings', authenticateJWT, (req, res) => {
    const { userName, tourName, transportationID, cardID } = req.body;
    userModel.createBooking(userName, tourName, transportationID, cardID, (err, result) => {
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

// app.post('/api/bookings', authenticateJWT, (req, res) => {
//     const { userName, tourName, flightID, cardID } = req.body;
//     userModel.createBook(userName, tourName, flightID, cardID, (err, res) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'Booking created',
//             data: req.body,
//         });
//     });
// });

app.get('/api/comments', (req, res) => {
    userModel.getAllComments((err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});
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

app.put('/api/comments/:townID/:tourName', (req, res) => {
    const { townID, tourName, userName } = req.params;
    const { rating } = req.body;

    userModel.updateRating(townID, tourName, userName, rating, (err) => {
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

app.post('/api/accounts', (req, res) => {
    const { username, password, citizenID, name, address, age, tel, email } = req.body;

    userModel.createAccount(username, password, citizenID, name, address, age, tel, email, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'account created',
            data: req.body,
            result,
        });
    });
});



app.get('/api/accounts/:userName', (req, res) => {
    const { userName } = req.params;

    userModel.getAccount(userName, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});

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

app.get('/api/transportations/:ID', (req, res) => {
  const {ID} = req.params;

  userModel.getTranportations(ID, (err, row) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json(row);
  });
});

app.post('/api/transportations', authenticateJWT, (req, res) => {
  const {name, startDate, endDate , price , goFrom , arriveAt,type } = req.body;

  userModel.createTransportations(name, startDate, endDate , price , goFrom , arriveAt,type, (err, result) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json({
          message: 'Transportation created',
          data: req.body,
      });
  });
});

app.put('/api/transportations/:transportationID', authenticateJWT, (req, res) => {
  const {ID } = req.params;
  const { name, startDate, endDate , price , goFrom , arriveAt,type } = req.body;

  userModel.updateTransportations(ID,name, startDate, endDate , price , goFrom , arriveAt,type, (err) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json({
          message: 'Transportation updated',
          data: req.body
      });
  });
});

app.get('/api/tours', (req, res) => {
    userModel.getAllTour((err,rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.get('/api/tours/:tourName', (req, res) => {
    const { tourName } = req.params;

    userModel.getTour(tourName, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});

app.post('/api/tours', authenticateJWT, (req, res) => {
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

app.put('/api/tours/:tourName', authenticateJWT, (req, res) => {
    const { tourName } = req.params;
    const { description, startDate, endDate, price, images } = req.body;

    userModel.updateTour(tourName, description, startDate, endDate, price, images, (err) => {
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

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});