import sqlite3 from 'sqlite3';

class UserModel {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {  
        console.error('Error connecting to database:', err.message);
      } else {
        this.db.run("CREATE TABLE IF NOT EXISTS comments (townID INT, tourName TEXT, comment TEXT, userName TEXT, rating REAL, PRIMARY KEY (townID, tourName), FOREIGN KEY (townID) REFERENCES tours(townID), FOREIGN KEY (tourName) REFERENCES tours(tourName), FOREIGN KEY (userName) REFERENCES books(userName))");
        this.db.run("CREATE TABLE IF NOT EXISTS tours    (townID INT, tourName TEXT, description TEXT, startDate TEXT, endDate TEXT, price REAL, images TEXT, PRIMARY KEY (townID, tourName))");
        this.db.run("CREATE TABLE IF NOT EXISTS flights (flightID INTEGER PRIMARY KEY AUTOINCREMENT, flightName TEXT, StartDate TEXT, EndDate TEXT, price REAL, destination TEXT, start TEXT)");
        this.db.run("CREATE TABLE IF NOT EXISTS accounts (userName TEXT UNIQUE, password TEXT, citizenID TEXT, name TEXT, address TEXT, age INT, telNum TEXT, email TEXT)");
        this.db.run("CREATE TABLE IF NOT EXISTS books (userName TEXT, tourName TEXT, flightID INT, cardID INT, FOREIGN KEY (tourName) REFERENCES tours(tourName),FOREIGN KEY (userName) REFERENCES accounts(userName), FOREIGN KEY (flightID) REFERENCES flights(flightID), FOREIGN KEY (cardID) REFERENCES cards(cardID))");
        console.log('Connected to the database.');
        this.createBook('haha','Du lich',1, 123);
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
    this.db.get("SELECT * FROM comments WHERE townID = ? AND tourName = ?", [townID, tourName],callback)
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

