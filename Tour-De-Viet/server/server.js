import express from 'express';
import UserModel from './database.js';
import path from 'path';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { expressjwt } from "express-jwt";
import OpenAI from 'openai';
import { storeImage, createFolder } from './ImageBuilder.js'
import multer from 'multer';

import nodemailer from 'nodemailer';

function createBookingEmailContent(tourName, username, telNum, startDate, endDate, goFrom, arriveAt, price) {
    return `
        <h1>Confirm booking: ${tourName}</h1>
        <p>Your tour is ready to be scheduled. Please check the below information:</p>
        <ul>
            <li><strong>Tour Name:</strong> ${tourName}</li>
            <li><strong>Your Name:</strong> ${username}</li>
            <li><strong>Contact Number:</strong> ${telNum}</li>
            <li><strong>Start Date:</strong> ${startDate}</li>
            <li><strong>End Date:</strong> ${endDate}</li>
            <li><strong>Departure:</strong> ${goFrom}</li>
            <li><strong>Arrival:</strong> ${arriveAt}</li>
            <li><strong>Price:</strong> ${price}</li>
        </ul>
        <p>We are excited to have you join us on this tour. If you have any questions, please feel free to contact us.</p>
        <p>Thank you for booking with us!</p>
    `;
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rishviet@gmail.com',
        pass: 'rfvjskryezkzgnvn'
    }
});




const upload = multer();

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

app.post('/api/send', (req, res) => {
    const { tourName, username, telNum, startDate, endDate, goFrom, arriveAt, price, email } = req.body;

    if (!tourName || !username || !telNum || !startDate || !endDate || !goFrom || !arriveAt || !price || !email) {
        console.log("Error: Missing required parameters for sending email.");
        return res.status(400).send("Missing required parameters");
    }

    const mailOptions = {
        from: 'rishviet@gmail.com',
        to: email,
        subject: `Confirmation to ${tourName}`,
        html: createBookingEmailContent(tourName, username, telNum, startDate, endDate, goFrom, arriveAt, price),
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log("Error sending email:", error);
            return res.status(500).send("Error sending email");
        } else {
            console.log('Email sent:', info.response);
            return res.status(200).send("Email sent successfully");
        }
    });
});


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

app.get('/api/checkcomments/:tourName/:username', (req, res) => {
    const { tourName, username } = req.params;
    userModel.checkComment(tourName, username, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});

app.get('/api/rating/:tourName/:username', (req, res) => {
    const { tourName, username } = req.params;
    userModel.getUserRating(username, tourName, (err, row) => {
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

app.put('/api/comments/:townID/:tourName/:userName', (req, res) => {
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
    const { Name, startDate, endDate, price, goFrom, arriveAt, type } = req.body;
    console.log(Name, startDate, endDate, price, goFrom, arriveAt, type);
    userModel.createTransportations(Name, startDate, endDate, price, goFrom, arriveAt, type, (err, result) => {
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

app.put('/api/transportations/:ID', authenticateToken, (req, res) => {

    const { ID } = req.params;
    const { Name, startDate, endDate, price, goFrom, arriveAt, type } = req.body;
    console.log(Name, startDate, endDate, price, goFrom, arriveAt, type);

    userModel.updateTransportations(ID, Name, startDate, endDate, price, goFrom, arriveAt, type, (err) => {
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

// app.post('/api/transportations', authenticateToken, (req, res) => {
//     const { name, startDate, endDate, price, goFrom, arriveAt } = req.body;

//     userModel.createTransportations(name, startDate, endDate, price, goFrom, arriveAt, (err, result) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'Transportation created',
//             data: req.body,
//         });
//     });
// });



app.get('/api/transportations', authenticateToken, (req, res) => {
    userModel.getAllTransportations((err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// app.put('/api/transportations/:transportationID', authenticateToken, (req, res) => {
//     const { ID } = req.params;
//     const { name, startDate, endDate, price, goFrom, arriveAt } = req.body;

//     userModel.updateTransportations(ID, name, startDate, endDate, price, goFrom, arriveAt, (err) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'Transportation updated',
//             data: req.body
//         });
//     });
// });
app.get('/api/tours/:townID/:tourName/:startDate', (req, res) => {
    const { townID, tourName, startDate } = req.params;
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



app.get('/api/tours', authenticateToken, (req, res) => {
    userModel.getAllTours((err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.get('/api/checkdate/:date/:tourName', (req, res) => {
    const { date, tourName } = req.params;
    userModel.checkForTour(date, tourName, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
})

app.put('/api/tours/:tourName', authenticateToken, (req, res) => {
    const { tourName } = req.params;
    const { townID, description, category, transportationID, startDate, endDate, price } = req.body;
    console.log(tourName, townID, description, category, transportationID, startDate, endDate, price)

    userModel.updateTour(townID, tourName, description, category, transportationID, startDate, endDate, price, (err) => {
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

app.delete('/api/tours/:tourName', authenticateToken, (req, res) => {
    const { tourName } = req.params;

    userModel.deleteTour(tourName, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Tour deleted',
        });
    });
});

app.delete('/api/transportation/:transportationID', authenticateToken, (req, res) => {
    const { transportationID } = req.params;

    userModel.deleteTransportations(transportationID, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Transportation deleted',
        });
    });
});

app.post('/upload', upload.single('image'), async (req, res) => {
    const { townID, tourName } = req.body; // Access townID and tourName from req.body
    const imageFile = req.file; // Access image file from req.file

    try {
        // Create folder and store image
        await createFolder(tourName);
        await storeImage(imageFile.buffer, tourName, imageFile.originalname);

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