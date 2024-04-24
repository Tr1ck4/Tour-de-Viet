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
        this.db.run("CREATE TABLE IF NOT EXISTS \
        comments (townID INT, tourName TEXT, comment TEXT, userName TEXT UNIQUE, rating REAL,\
        FOREIGN KEY (townID) REFERENCES tours(townID),\
         FOREIGN KEY (tourName) REFERENCES tours(tourName),\
          FOREIGN KEY (userName) REFERENCES bookings(userName))");

        this.db.run("CREATE TABLE IF NOT EXISTS \
        tours(townID INT NOT NULL, tourName TEXT UNIQUE NOT NULL, description TEXT, startDate TEXT NOT NULL, endDate TEXT NOT NULL, price REAL, images TEXT, averageRating real, transportationID TEXT,\
          PRIMARY KEY (townID, tourName),\
          FOREIGN KEY (transportationID) REFERENCES transportation(ID))");

        this.db.run("CREATE TABLE IF NOT EXISTS \
        transportations (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL, startDate TEXT NOT NULL, endDate TEXT NOT NULL, price REAL NOT NULL, goFrom TEXT NOT NULL, arriveAt TEXT NOT NULL, type TEXT)");

        this.db.run("CREATE TABLE IF NOT EXISTS \
        accounts (userName TEXT NOT NULL, password TEXT NOT NULL, citizenID TEXT, name TEXT, address TEXT, age INT, telNum TEXT, email TEXT,\
        PRIMARY KEY(userName))");

        this.db.run("CREATE TABLE IF NOT EXISTS \
        bookings (userName TEXT NOT NULL, tourName TEXT NOT NULL, transportationID INT, cardID INT NOT NULL,\
          FOREIGN KEY (tourName) REFERENCES tours(tourName),\
          FOREIGN KEY (userName) REFERENCES accounts(userName),\
          FOREIGN KEY (transportationID) REFERENCES transportations(ID))");
        console.log('Connected to the database.');
      }
    });
  }


  getBookings(userName, callback) {
    let sql = "SELECT * FROM bookings JOIN tours ON (bookings.tourName = tours.tourName) WHERE userName = ?";
    this.db.all(sql, [userName], callback);
  }


  createBooking(UserName, Tourname, transportationID, CardID, callback) {
    this.db.run("INSERT INTO bookings (userName, tourName, transportationID, cardID) VALUES (?, ?, ?, ?)",
      [UserName, Tourname, transportationID, CardID],
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


  getTranportations(ID,callback) {
    this.db.all("SELECT * FROM transportations WHERE ID = ?", [ID],callback)
  }

  createTransportations(Name, startDate, endDate , price , goFrom , arriveAt,type ,callback) {
    this.db.run("INSERT INTO transportations (Name , startDate, endDate, price, goFrom, arriveAt,type) VALUES (?, ?, ?, ?, ?, ?,?)",
      [Name , startDate, endDate, price, goFrom, arriveAt,type],
      callback
    );
  }
  
  updateTransportations(ID,Name, startDate, endDate , price , goFrom , arriveAt,type ,callback) {
    let sql = "UPDATE transportations SET Name = ?, startDate=?, endDate=? , price=? , goFrom=? , arriveAt=?,type=? WHERE ID = ?"
    this.db.run(sql, [Name, startDate, endDate , price , goFrom , arriveAt,type,ID], callback);
  }

  getAllTour(callback){
    this.db.all("SELECT * FROM tours", callback);
  }

  getTour(tourName, callback) {
    this.db.get("SELECT *  FROM tours WHERE tourName = ?", [tourName], callback);
  }

  createTour(townID, tourName, description, startDate, endDate, price, images, callback) {
    this.db.run("INSERT INTO tours (townID, tourName, description, startDate, endDate, price, images) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [townID, tourName, description, startDate, endDate, price, images],
      callback
    );
  }

  updateTour(tourName, description, startDate, endDate, price, images, callback) {
    let sql = "UPDATE tours SET tourName = ?, description=?, startDate=? , endDate=? , price=? , images=? WHERE tourName = ?"
    this.db.run(sql, [tourName, description, startDate , endDate , price , images], callback);
  }


  
  getAccount(username, callback) {
    this.db.get(`SELECT * FROM accounts WHERE userName = ?`,[username],callback);
    
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

