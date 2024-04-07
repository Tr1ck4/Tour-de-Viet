import express from 'express';
import UserModel from './database.js';
const userModel = new UserModel('./database.db');

const app = express();
const PORT = 3000;


userModel.con
app.post('/users', (req, res) => {
  const { name } = req.body;
  userModel.createUser(name, (err) => {
    if (err) {
      console.error('Error creating user:', err.message);
      res.status(500).send('Error creating user');
    } else {
      res.status(201).send('User created successfully');
    }
  });
});

// Example route to get all users
app.get('/users', (req, res) => {
  userModel.getUsers((err, users) => {
    if (err) {
      console.error('Error getting users:', err.message);
      res.status(500).send('Error getting users');
    } else {
      res.json(users);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
