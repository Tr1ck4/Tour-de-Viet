import sqlite3 from 'sqlite3';

const arr = [
  "Ha Noi",
  "Ha Tay",
  "Vinh Phuc",
  "Bac Ninh"
];
class UserModel {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {  
        console.error('Error connecting to database:', err.message);
      } else {
        this.db.run("CREATE TABLE IF NOT EXISTS towns (townID INTEGER PRIMARY KEY AUTOINCREMENT, townName TEXT)");
        this.db.run("CREATE TABLE IF NOT EXISTS tours (townID INT, tourName TEXT, description TEXT, startDate TEXT, endDate TEXT, price REAL, images TEXT, FOREIGN KEY (townID) REFERENCES towns(townID))");
        this.db.run("CREATE TABLE IF NOT EXISTS flights (flightID INTEGER PRIMARY KEY AUTOINCREMENT, flightName TEXT, StartDate TEXT, EndDate TEXT, price REAL, destination TEXT, start TEXT)");
        this.db.run("CREATE TABLE IF NOT EXISTS accounts (userName TEXT UNIQUE, password TEXT, citizenID TEXT, name TEXT, address TEXT, age INT, telNum TEXT, email TEXT)");
        this.db.run("CREATE TABLE IF NOT EXISTS cards (cardID INTEGER PRIMARY KEY, cardNum TEXT, expirationDate TEXT, securityNum TEXT, userName TEXT, FOREIGN KEY (userName) REFERENCES accounts(userName))");
        this.db.run("CREATE TABLE IF NOT EXISTS books (userName TEXT, tourName TEXT, flightID INT, cardID INT, FOREIGN KEY (tourName) REFERENCES tours(tourName),FOREIGN KEY (userName) REFERENCES accounts(userName), FOREIGN KEY (flightID) REFERENCES flights(flightID), FOREIGN KEY (cardID) REFERENCES cards(cardID))");
        this.insertInitialData();

        console.log('Connected to the database.');
      }
    });
  }
  
  insertInitialData(callback) {
    this.db.get("SELECT COUNT(*) AS count FROM towns", (err, row) => {
      if (err) { 
        console.error('Error inserting initial data:', err.message);
        return;
      }
      if (row.count <  64) {
        this.db.run("INSERT INTO towns (townName) VALUES (?)", ['Random'], (err) => {
          if (err) {
            console.error('Error inserting initial data:', err.message);
          } else {
            console.log('Initial data inserted.');
          }
        });
      } 
    });
  }
  
  getTownID(name, callback) {
    this.db.get("SELECT townID FROM towns WHERE townName = ?", [name], callback);
  }

  // Function to get town name by townID
  getTownName(townID, callback) {
    this.db.get("SELECT townName FROM towns WHERE townID = ?", [townID], callback);
  }

  // Function to get user by userName and password
  getUser(userName, password, callback) {
    this.db.get("SELECT * FROM accounts WHERE userName = ? AND password = ?", [userName, password], callback);
  }

  // Function to get flight by flightID
  getFlight(flightID, callback) {
    this.db.get("SELECT * FROM flights WHERE flightID = ?", [flightID], callback);
  }

  // Function to get tour by tour name
  getTour(tourName, callback) {
    this.db.get("SELECT * FROM tours WHERE tourName = ?", [tourName], callback);
  }

  // Function to create a card
  createCard(cardNum, expirationDate, securityNum, userName, callback) {
    this.db.run("INSERT INTO cards (cardNum, expirationDate, securityNum, userName) VALUES (?, ?, ?, ?)",
      [cardNum, expirationDate, securityNum, userName],
      callback
    );
  }

  // Function to create a tour
  createTour(townID, name, description, startDate, endDate, price, images, callback) {
    this.db.run("INSERT INTO tours (townID, tourName, description, startDate, endDate, price, images) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [townID, name, description, startDate, endDate, price, images],
      callback
    );
  }

  // Function to create an account
  createAccount(userName, password, citizenID, name, address, age, telNum, email, callback) {
    this.db.run("INSERT INTO accounts (userName, password, citizenID, name, address, age, telNum, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [userName, password, citizenID, name, address, age, telNum, email],
      callback
    );
  }

  // Function to create a flight
  createFlight(flightName, startDate, endDate, price, destination, start, callback) {
    this.db.run("INSERT INTO flights (flightName, startDate, endDate, price, destination, start) VALUES (?, ?, ?, ?, ?, ?)",
      [flightName, startDate, endDate, price, destination, start],
      callback
    );
  }

  // Function to update a tour
  updateTour(tourName, newData, callback) {
    // Assuming newData is an object with properties to be updated
    let sql = "UPDATE tours SET ";
    let params = [];
    Object.keys(newData).forEach((key, index) => {
      sql += `${key} = ?`;
      params.push(newData[key]);
      if (index < Object.keys(newData).length - 1) {
        sql += ", ";
      }
    });
    sql += " WHERE tourName = ?";
    params.push(tourName);

    this.db.run(sql, params, callback);
  }

  // Function to update a flight
  updateFlight(flightID, newData, callback) {
    // Assuming newData is an object with properties to be updated
    let sql = "UPDATE flights SET ";
    let params = [];
    Object.keys(newData).forEach((key, index) => {
      sql += `${key} = ?`;
      params.push(newData[key]);
      if (index < Object.keys(newData).length - 1) {
        sql += ", ";
      }
    });
    sql += " WHERE flightID = ?";
    params.push(flightID);

    this.db.run(sql, params, callback);
  }

  // Function to update an account
  updateAccount(userName, newData, callback) {
    // Assuming newData is an object with properties to be updated
    let sql = "UPDATE accounts SET ";
    let params = [];
    Object.keys(newData).forEach((key, index) => {
      sql += `${key} = ?`;
      params.push(newData[key]);
      if (index < Object.keys(newData).length - 1) {
        sql += ", ";
      }
    });
    sql += " WHERE userName = ?";
    params.push(userName);

    this.db.run(sql, params, callback);
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
//getTownID
//getTownName
//getUserName&&Password
//getflight
//gettour
//createCard
//createTour
//createAccount
//createFlight
//UpdateTour
//updateFLight
//update
