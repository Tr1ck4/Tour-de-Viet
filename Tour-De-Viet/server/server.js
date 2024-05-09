import express from 'express';
import UserModel from './database.js';
import path from 'path';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { expressjwt } from "express-jwt";

import nodemailer from 'nodemailer';
import OpenAI from 'openai';
import {storeImage} from './ImageBuilder.js'

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

    const jwtCookie = cookies.find(cookie => cookie.startsWith('token='));

    if (!jwtCookie) {
        return null;
    }

    return jwtCookie.split('=')[1];
}
app.get('/api/authenticate', authenticateToken, (req, res) => {
    const token = getTokenFromCookie(req);

    const userName = jwt.decode(token).username;
    const accountname = jwt.decode(token).accountname;

    res.json({ "username": userName, "accountname": accountname });
});

app.post('/api/logout', (req, res) => {
    // Clear the 'token' cookie by setting its expiration to a past date
    res.setHeader('Set-cookie', `token=deleted; Max-Age=3600; HttpOnly`);

    // Send a response indicating success
    res.json({ message: 'Logout successful' });
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.getUser(username, password)
        .then(res => {
            return res;
        })


    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = generateToken({ username: user.name, accountname: username });
    res.setHeader('Set-cookie', `token=${token}; Max-Age=3600; HttpOnly`);
    res.json({ message: 'Login successful' });
});

app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: 'You are authorized', user: req.user });
});

app.get('/para', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/api/bookings/info', authenticateToken, (req, res) => {
    const token = getTokenFromCookie(req);

    const userName = jwt.decode(token).accountname;

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

    const userName = jwt.decode(token).accountname;
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

    userModel.createAccount(username, password, citizenID, name, address, age, tel, email, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'account created',
            data: req.body,
        });
    });
});



app.get('/api/accounts/info', authenticateToken, (req, res) => {
    const token = getTokenFromCookie(req);

    const userName = jwt.decode(token).accountname;

    userModel.getAccount(userName, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});

app.put('/api/accounts/info', authenticateToken, (req, res) => {
    const token = getTokenFromCookie(req);

    const userName = jwt.decode(token).accountname;
    const { password, citizenID, name, address, age, telNum, email } = req.body;
    // const { name,age,telNum,address,email,citizenID,userName,password } = req.body;

    userModel.updateAccount(userName, password, citizenID, name, address, age, telNum, email, (err) => {
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



app.get('/api/transportations',authenticateToken, (req, res) => {
    userModel.getAllTransportations((err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
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
app.get('/api/tours/:townID/:tourName/:startDate', (req, res) => {
    const {townID, tourName, startDate} = req.params;
    userModel.getTourbyDate(townID, tourName, startDate, (err, rows) => {
        if (err) {
            res.status(404).json({ error: err.message });
            return;
        }
        res.json(rows);
    })
})
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
    const { townID, tourName, description, category, price, transportationID, startDate, endDate } = req.body;

    userModel.createTour(townID, tourName, description, category, price, transportationID, startDate, endDate, (err, result) => {
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



app.get('/api/tours',authenticateToken, (req, res) => {
    userModel.getAllTours((err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.put('/api/tours/:tourName', authenticateToken, (req, res) => {
    const { tourName } = req.params;
    const { description, category, totalTime, transport, startDate, endDate, price, images } = req.body;

    userModel.updateTour(tourName, description, category, totalTime, transport, startDate, endDate, price, images, (err) => {
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

app.post('/upload', async (req, res) => {
    const { townID, tournament } = req.query;
    const imageFile = req.files.image; // Assuming multipart/form-data is used for image upload

    try {
        await storeImage(imageFile.data, townID, tournament, imageFile.name);
        res.status(200).send('Image uploaded successfully');
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send('Internal server error');
    }
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});