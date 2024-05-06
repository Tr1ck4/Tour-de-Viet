import express from 'express';
import UserModel from './database.js';
import path from 'path';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { expressjwt } from "express-jwt";

import nodemailer from 'nodemailer';
import cors from 'cors';
import OpenAI from 'openai';

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tbnrfragsprest123@gmail.com',
        pass: 'vfrsjpltshlnarxd'
    }
});

var mailOptions = {
    from: 'tbnrfragsprest123@gmail.com',
    to: 'triet0612@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'This is not a spam'
};

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });


const openai = new OpenAI({
    baseURL: 'http://localhost:11434/v1',
    apiKey: 'ollama',
});

const userModel = new UserModel('./database.db');
const __dirname = path.resolve(path.dirname(''));
const PORT = 3000;
const secretKey = 'TQEWE31824';

export const app = express();
export const authenticateJWT = expressjwt({ secret: secretKey, algorithms: ['HS256'] });

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));

app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to your frontend URL or use '*' to allow all origins
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-stainless-os'], // Add 'x-stainless-os' here
}));

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: message }],
            model: 'gemma:2b',

        })
        const aiMessages = chatCompletion.choices.map(choice => choice.message.content);
        res.json({ messages: aiMessages });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
});



function generateToken(user) {
    return jwt.sign(user, secretKey, { expiresIn: '1h' });
}

function authenticateToken(req, res, next) {
    const token = getTokenFromCookie(req);

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

function getTokenFromCookie(req) {
    const cookieHeader = req.headers.cookie;

    if (!cookieHeader) {
        return null;
    }

    const cookies = cookieHeader.split(';').map(cookie => cookie.trim());

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = generateToken({ username: user.username });
    res.json({ token });
};


app.post('/chat', async (req, res) => {
    try {
        const resp = await openai.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "user", content: req.body.question }
            ]
        })

        res.status(200).json({ message: resp.data.choices[0].message.content })
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
})
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: 'You are authorized', user: req.user });
});

app.get('/para', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/api/bookings/info', authenticateToken, (req, res) => {
    const token = getTokenFromCookie(req);

    const userName = jwt.decode(token).username;

    userModel.getBookings(userName, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});


app.post('/api/bookings', authenticateToken, (req, res) => {
    const token = getTokenFromCookie(req);

    const userName = jwt.decode(token).username;
    const { tourName, transportationID, cardID } = req.body;
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

app.get('/api/accounts/info', authenticateToken, (req, res) => {
    const token = getTokenFromCookie(req);
    const accountName = jwt.decode(token).accountname;
    userModel.getAccount(accountName, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});

app.put('/api/accounts/info', authenticateToken, (req, res) => {
    const token = getTokenFromCookie(req);
    const accountName = jwt.decode(token).accountname;
    console.log(accountName);
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
    const { ID } = req.params;

    userModel.getTranportations(ID, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});

app.post('/api/transportations', authenticateToken, (req, res) => {
    const { name, startDate, endDate, price, goFrom, arriveAt, type } = req.body;

    userModel.createTransportations(name, startDate, endDate, price, goFrom, arriveAt, type, (err, result) => {
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

app.put('/api/transportations/:transportationID', authenticateToken, (req, res) => {
    const { ID } = req.params;
    const { name, startDate, endDate, price, goFrom, arriveAt, type } = req.body;

    userModel.updateTransportations(ID, name, startDate, endDate, price, goFrom, arriveAt, type, (err) => {
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

// app.get('/api/tours/:townID', (req, res) => {
//     userModel.getAllTour((err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json(rows);
//     });
// });

// app.get('/api/tours/:tourName', (req, res) => {
//     const { tourName } = req.params;

//     userModel.getTour(tourName, (err, row) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json(row);
//     });
// });

app.post('/api/transportations', authenticateToken, (req, res) => {
    const { name, startDate, endDate, price, goFrom, arriveAt } = req.body;

    userModel.createTransportations(name, startDate, endDate, price, goFrom, arriveAt, (err, result) => {
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

app.put('/api/transportations/:transportationID', authenticateToken, (req, res) => {
    const { ID } = req.params;
    const { name, startDate, endDate, price, goFrom, arriveAt } = req.body;

    userModel.updateTransportations(ID, name, startDate, endDate, price, goFrom, arriveAt, (err) => {
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

app.get('/api/tours/:townID', (req, res) => {
    const { townID } = req.params;
    userModel.getAllTour(townID, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.get('/api/tours/:townID/:tourName', (req, res) => {
    const { townID, tourName } = req.params;
    userModel.getTour(townID, tourName, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });

});

app.post('/api/tours', authenticateToken, (req, res) => {
    const { townID, tourName, description, price, images, transportationID } = req.body;

    userModel.createTour(townID, tourName, description, price, images, transportationID, (err, result) => {
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

app.get('/api/tours', (req, res) => {
    userModel.getAllTour((err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});

app.put('/api/tours/:tourName', authenticateToken, (req, res) => {
    const { tourName } = req.params;
    const { description, totalTime, transport, startDate, endDate, price, images } = req.body;

    userModel.updateTour(tourName, description, totalTime, transport, startDate, endDate, price, images, (err) => {
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