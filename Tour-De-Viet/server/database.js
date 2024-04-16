import sqlite3 from 'sqlite3';
import BookingService from './BookingService.js';
import ToursService from './TourService.js';

const newTour = new ToursService();

class UserModel {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.error('Error connecting to database:', err.message);
      } else {
        this.db.run("CREATE TABLE IF NOT EXISTS comments (townID INT, tourName TEXT, comment TEXT, userName TEXT, rating REAL, FOREIGN KEY (townID) REFERENCES tours(townID), FOREIGN KEY (tourName) REFERENCES tours(tourName), FOREIGN KEY (userName) REFERENCES books(userName))");
        this.db.run("CREATE TABLE IF NOT EXISTS tours    (townID INT, tourName TEXT, description TEXT, totalTime text, transport text, startDate TEXT, endDate TEXT, price REAL, images TEXT, PRIMARY KEY (townID, tourName))");
        this.db.run("CREATE TABLE IF NOT EXISTS flights (flightID INTEGER PRIMARY KEY AUTOINCREMENT, flightName TEXT, startDate TEXT, endDate TEXT, price REAL, goFrom TEXT, arriveAt TEXT)");
        this.db.run("CREATE TABLE IF NOT EXISTS accounts (userName TEXT UNIQUE, password TEXT, citizenID TEXT, name TEXT, address TEXT, age INT, telNum TEXT, email TEXT)");
        this.db.run("CREATE TABLE IF NOT EXISTS books (userName TEXT, tourName TEXT, flightID INT, cardID INT, FOREIGN KEY (tourName) REFERENCES tours(tourName),FOREIGN KEY (userName) REFERENCES accounts(userName), FOREIGN KEY (flightID) REFERENCES flights(flightID))");
        console.log('Connected to the database.');
      }
    });
  }


  getBook(userName, tourName, callback) {
    let sql = "SELECT userName, tourName, flightID FROM books WHERE userName = ?";
    if (tourName) {
      sql += " AND tourName = ?";
    }
    this.db.all(sql, [userName, tourName], callback);
  }


  createBook(UserName, Tourname, FlightID, CardID, callback) {
    this.db.run("INSERT INTO books (userName, tourName, flightID, cardID) VALUES (?, ?, ?, ?)",
      [UserName, Tourname, FlightID, CardID],
      callback
    );
  }

  getAllComments(callback) {
    this.db.all("SELECT * FROM comments ", callback)
  }
  getComments(townID, tourName, callback) {
    this.db.all("SELECT * FROM comments WHERE townID = ? AND tourName = ?", [townID, tourName], callback)
  }

  createComments(townID, tourName, userName, comment, rating, callback) {
    this.db.run("INSERT INTO comments (townID , tourName , comment, userName, rating) VALUES (?, ?, ?, ?, ?)",
      [townID, tourName, comment, userName, rating],
      callback
    );
  }

  updateRating(townID, tourName, userName, rating, callback) {
    let sql = "UPDATE comments SET rating = ? WHERE townID = ? AND tourName = ? and userName = ?";
    this.db.run(sql, [rating, townID, tourName, userName], callback);
  }


  getFlights(flightID, callback) {
    this.db.all("SELECT * FROM flights WHERE flightID = ?", [flightID], callback)
  }

  createFlights(flightName, startDate, endDate, price, goFrom, arriveAt, callback) {
    this.db.run("INSERT INTO flights (flightName , startDate, endDate, price, goFrom, arriveAt) VALUES (?, ?, ?, ?, ?, ?)",
      [flightName, startDate, endDate, price, goFrom, arriveAt],
      callback
    );
  }

  updateFlights(flightID, flightName, startDate, endDate, price, goFrom, arriveAt, callback) {
    let sql = "UPDATE flights SET flightName = ?, startDate=?, endDate=? , price=? , goFrom=? , arriveAt=? WHERE flightID = ?"
    this.db.run(sql, [flightName, startDate, endDate, price, goFrom, arriveAt, flightID], callback);
  }

  getTour(tourName, callback) {
    this.db.get("SELECT *  FROM tours WHERE tourName = ?", [tourName], callback);
  }

  getAllTour(callback) {
    let sql = `SELECT t.townID, t.totalTime, t.transport, t.price, AVG(c.rating) AS avg_rating
    FROM tours t
    LEFT JOIN comments c ON t.townID = c.townID AND t.tourName = c.tourName
    GROUP BY t.townID, t.totalTime, t.price;`
    this.db.all(sql, callback)
  }

  createTour(townID, tourName, description, totalTime, transport, startDate, endDate, price, images, callback) {
    this.db.run("INSERT INTO tours (townID, tourName, description, totalTime, transport, startDate, endDate, price, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [townID, tourName, description, totalTime, transport, startDate, endDate, price, images],
      callback
    );
  }

  updateTour(tourName, description, totalTime, transport, startDate, endDate, price, images, callback) {
    let sql = "UPDATE tours SET tourName = ?, description=?, totalTime = ?, transport = ?, startDate=? , endDate=? , price=? , images=? WHERE tourName = ?"
    this.db.run(sql, [tourName, description, totalTime, transport, startDate, endDate, price, images], callback);
  }



  getAccount(username, callback) {
    let sql = `SELECT * FROM accounts WHERE userName = ?`;
    this.db.run(sql, username, callback);
  }

  getUser(username, password) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM accounts WHERE username = ? AND password = ?';
      this.db.get(query, [username, password], (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(row);
      });
    });
  }

  updateAccount(username, password, citizenID, name, address, age, tel, email, callback) {
    let sql = `UPDATE accounts SET password = COALESCE(?, password),
    citizenID = COALESCE(?, citizenID),
    name = COALESCE(?, name),
    address = COALESCE(?, address),
    age = COALESCE(?, age),
    telNum = COALESCE(?, telNum),
    email = COALESCE(?, email)
    WHERE userName = ?`
    this.db.run(sql, [password, citizenID, name, address, age, tel, email, username], callback);
  }

  createAccount(username, password, citizenID, name, address, age, tel, email, callback) {
    let sql = `INSERT INTO accounts (username, password, citizenID, name, address, age, telNum, email)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    this.db.run(sql, [username, password, citizenID, name, address, age, tel, email], callback);
  }

  getEmail(username, callback) {
    let sql = `SELECT email FROM accounts WHERE userName = ?`;
    this.db.run(sql, username, callback);
  }

  closeConnection() {
    this.db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('Database connection closed.');
      }
    });
  }
}



export default UserModel;

