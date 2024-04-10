import sqlite3 from 'sqlite3';
import BookingService from './BookingService.js';

const bookings = new BookingService();

class UserModel {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {  
        console.error('Error connecting to database:', err.message);
      } else {
        this.db.run("CREATE TABLE IF NOT EXISTS comments (townID INT, tourName TEXT, comment TEXT, userName TEXT, rating REAL, FOREIGN KEY (townID) REFERENCES tours(townID), FOREIGN KEY (tourName) REFERENCES tours(tourName), FOREIGN KEY (userName) REFERENCES books(userName))");
        this.db.run("CREATE TABLE IF NOT EXISTS tours    (townID INT, tourName TEXT, description TEXT, startDate TEXT, endDate TEXT, price REAL, images TEXT, PRIMARY KEY (townID, tourName))");
        this.db.run("CREATE TABLE IF NOT EXISTS flights (flightID INTEGER PRIMARY KEY AUTOINCREMENT, flightName TEXT, startDate TEXT, endDate TEXT, price REAL, goFrom TEXT, arriveAt TEXT)");
        this.db.run("CREATE TABLE IF NOT EXISTS accounts (userName TEXT UNIQUE, password TEXT, citizenID TEXT, name TEXT, address TEXT, age INT, telNum TEXT, email TEXT)");
        this.db.run("CREATE TABLE IF NOT EXISTS books (userName TEXT, tourName TEXT, flightID INT, cardID INT, FOREIGN KEY (tourName) REFERENCES tours(tourName),FOREIGN KEY (userName) REFERENCES accounts(userName), FOREIGN KEY (flightID) REFERENCES flights(flightID))");
        console.log('Connected to the database.');
        this.createComments(1,'Du lich','hihi','Fine',1.0);
        this.createComments(1,'Du lich','haha','Cool one', null);
        this.createComments(1,'Du lich','hoho','Fine',5.0);
        this.createComments(1,'Du lich','qewqwe','Fasdasdaasdadqweine',2.0);
        this.createFlights('VietnamAirline','10/4/2024','15/4/2024',1000000,'HCM','Vung Tau');
        this.createFlights('VietnamAirline','10/4/2024','15/4/2024',1000000,'HCM','Ha Noi');
        this.createFlights('VietnamAirline','10/4/2024','15/4/2024',1000000,'HCM','Dak Lak');
        this.createFlights('VietnamAirline','10/4/2024','15/4/2024',1000000,'HCM','Da Nang');
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


  createBook(UserName , Tourname  , FlightID , CardID ,callback) {
    this.db.run("INSERT INTO books (userName, tourName, flightID, cardID) VALUES (?, ?, ?, ?)",
      [UserName , Tourname  , FlightID , CardID],
      callback
    );
  }

  getComments(townID , tourName ,callback) {
    this.db.all("SELECT * FROM comments WHERE townID = ? AND tourName = ?", [townID, tourName],callback)
  }

  createComments(townID , tourName , userName, comment, rating, callback) {
    this.db.run("INSERT INTO comments (townID , tourName , comment, userName, rating) VALUES (?, ?, ?, ?, ?)",
      [townID , tourName ,comment, userName, rating],
      callback
    );
  }
  
  updateRating(townID, tourName, rating, callback) {
    let sql = "UPDATE comments SET rating = ? WHERE townID = ? AND tourName = ?";
    this.db.run(sql, [rating, townID, tourName], callback);
  }

  getFlights(flightID,callback) {
    this.db.all("SELECT * FROM flights WHERE flightID = ?", [flightID],callback)
  }

  createFlights(flightName, startDate, endDate , price , goFrom , arriveAt ,callback) {
    this.db.run("INSERT INTO flights (flightName , startDate, endDate, price, goFrom, arriveAt) VALUES (?, ?, ?, ?, ?, ?)",
      [flightName , startDate, endDate, price, goFrom, arriveAt],
      callback
    );
  }
  
  updateFlights(flightID,flightName, startDate, endDate , price , goFrom , arriveAt ,callback) {
    let sql = "UPDATE flights SET flightName = ?, startDate=?, endDate=? , price=? , goFrom=? , arriveAt=? WHERE flightID = ?"
    this.db.run(sql, [flightName, startDate, endDate , price , goFrom , arriveAt,flightID], callback);
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

