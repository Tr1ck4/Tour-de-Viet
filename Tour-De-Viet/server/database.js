
import sqlite3 from 'sqlite3';
class UserModel {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.error('Error connecting to database:', err.message);
      } else {

        // this.db.run("PRAGMA foreign_keys = ON");
        this.db.run("CREATE TABLE IF NOT EXISTS \
        comments (townID INT, tourName TEXT, comment TEXT, userName TEXT, rating REAL,\
          FOREIGN KEY (tourName) REFERENCES tours(tourName) ON DELETE CASCADE,\
          FOREIGN KEY (userName) REFERENCES accounts(userName))");

        this.db.run("CREATE TABLE IF NOT EXISTS \
        tours(townID INT NOT NULL, tourName TEXT NOT NULL, description TEXT, category NVARCHAR(15) NOT NULL, price REAL,  transportationID TEXT,\
          PRIMARY KEY (tourName),\
          FOREIGN KEY (transportationID) REFERENCES transportations(ID))");

        this.db.run("CREATE TABLE IF NOT EXISTS \
        tour_date(tourName TEXT NOT NULL, startDate TEXT NOT NULL, endDate TEXT NOT NULL,\
          FOREIGN KEY (tourName) REFERENCES tours(tourName) ON DELETE CASCADE)");

        this.db.run("CREATE TABLE IF NOT EXISTS \
        transportations (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL, startDate TEXT NOT NULL, endDate TEXT NOT NULL, price REAL NOT NULL, goFrom TEXT NOT NULL, arriveAt TEXT NOT NULL, type TEXT)");

        this.db.run("CREATE TABLE IF NOT EXISTS \
        accounts (userName TEXT UNIQUE NOT NULL, password TEXT NOT NULL, citizenID TEXT, name TEXT, address TEXT, age INT, telNum TEXT, email TEXT,\
          PRIMARY KEY(userName))");

        this.db.run("CREATE TABLE IF NOT EXISTS \
        bookings (userName TEXT NOT NULL, tourName TEXT NOT NULL, transportationID INT, cardID INT NOT NULL,\
          FOREIGN KEY (tourName) REFERENCES tours(tourName)ON DELETE CASCADE,\
          FOREIGN KEY (userName) REFERENCES accounts(userName),\
          FOREIGN KEY (transportationID) REFERENCES transportations(ID))");

        console.log('Connected to the database.');
      }
    });
  }


  getBookings(userName, callback) {
    let sql = "SELECT userName, bookings.tourName, bookings.transportationID, cardID, townID, startDate, endDate, price FROM bookings JOIN tours ON (bookings.tourName = tours.tourName) JOIN tour_date ON (tours.tourName = tour_date.tourName) WHERE userName = ?";
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

  checkComment(tourName, userName, callback) {
    let sql =
      `SELECT EXISTS (
        SELECT 1
        FROM bookings
        WHERE userName = ? AND tourName = ?
    ) AS hasBooked`;
    this.db.all(sql, [userName, tourName], callback)
  }

  getUserRating(userName, tourName, callback) {
    let sql =
      `SELECT comments.rating, comments.userName
      FROM comments
      WHERE userName = ? AND tourName = ? AND rating IS NOT NULL
      
      UNION
      
      SELECT comments.rating, comments.userName
      FROM comments
      WHERE userName = ? AND tourName = ? AND rating IS NULL
      
      LIMIT 1;`
    this.db.all(sql, [userName, tourName], callback)
  }


  updateRating(townID, tourName, userName, rating, callback) {
    let sql = "UPDATE comments SET rating = ? WHERE townID = ? AND tourName = ? and userName = ?";
    this.db.run(sql, [rating, townID, tourName, userName], callback);
  }

  getAllTransportations(callback) {
    this.db.all("SELECT * FROM transportations ", callback);
  }
  getTranportations(ID, callback) {
    this.db.all("SELECT * FROM transportations WHERE ID = ?", [ID], callback)
  }

  createTransportations(Name, startDate, endDate, price, goFrom, arriveAt, type, callback) {
    this.db.run("INSERT INTO transportations (Name , startDate, endDate, price, goFrom, arriveAt,type) VALUES (?, ?, ?, ?, ?, ?,?)",
      [Name, startDate, endDate, price, goFrom, arriveAt, type],
      callback
    );
  }

  updateTransportations(ID, Name, startDate, endDate, price, goFrom, arriveAt, type, callback) {
    console.log(ID);
    console.log(Name, startDate, endDate, price, goFrom, arriveAt, type);
    let sql = "UPDATE transportations SET Name = ?, startDate=?, endDate=? , price=? , goFrom=? , arriveAt=?,type=? WHERE ID = ?"
    this.db.run(sql, [Name, startDate, endDate, price, goFrom, arriveAt, type, ID], callback);
  }

  deleteTransportations(ID, callback) {
    let sql = "DELETE FROM transportations WHERE ID = ?"
    this.db.run(sql, ID, callback);
  }


  // getAllTours(callback) {
  //   this.db.all("SELECT * FROM tours JOIN tour_date ON tours.tourName = tour_date.tourName", callback);
  // }
  getAllTours(callback) {
    let sql = `SELECT t.townID, t.tourName, t.description, t.category, t.price, t.transportationID, 
              td.startDate, td.endDate, COUNT(b.tourName) AS numBookings
              FROM tours AS t
              JOIN tour_date AS td ON t.tourName = td.tourName
              LEFT JOIN bookings AS b ON t.tourName = b.tourName
              GROUP BY t.tourName;`
    this.db.all(sql,callback);
  }
  getTourbyDate(townID, tourName, startDate, callback) {
    let sql = `SELECT 
    t.*, td.startDate, td.endDate, tr.ID, tr.Name, tr.goFrom, tr.arriveAt, tr.type
    FROM tours as t 
    JOIN 
      tour_date AS td ON t.tourName = td.tourName
    LEFT JOIN 
      transportations AS tr ON t.transportationID = tr.ID
    WHERE  t.townID = ? AND t.tourName = ? AND td.startDate = ?
    `
    this.db.get(sql, [townID, tourName, startDate], callback)
  }
  getTour(townID, tourName, callback) {
    let sql = `SELECT 
    t.*,
    CASE
        WHEN t.transportationID IS NULL THEN NULL
        ELSE tr.type
    END AS transportation,
    td.startDate,
    td.endDate,
    AVG(uc.avg_rating) AS averageRating
    FROM 
        tours AS t
    JOIN 
        tour_date AS td ON t.tourName = td.tourName
    LEFT JOIN 
        transportations AS tr ON t.transportationID = tr.ID
    LEFT JOIN 
        (
            SELECT 
                tourName,
                townID,
                username,
                AVG(rating) AS avg_rating
            FROM 
                comments
            GROUP BY 
                tourName, townID, username
        ) AS uc ON t.tourName = uc.tourName AND t.townID = uc.townID
    WHERE 
        t.townID = ? AND t.tourName = ?
    GROUP BY 
        t.tourName;
    `

    this.db.get(sql, [townID, tourName], callback);
  }

  getAllTour(townID, callback) {
    let sql = `SELECT 
          t.tourName,
          t.description,
          t.category,
          CAST(julianday(td.endDate) - julianday(td.startDate) + 1 AS INTEGER) || ' day(s)' AS totalTime,
          CASE
              WHEN t.transportationID IS NULL THEN NULL
              ELSE tr.type
          END AS transport,
          t.price,
          t.townID,
          AVG(uc.avg_rating) AS avg_rating
      FROM 
          tours AS t
      JOIN 
          tour_date AS td ON t.tourName = td.tourName
      LEFT JOIN 
          transportations AS tr ON t.transportationID = tr.ID
      LEFT JOIN 
          (SELECT 
              tourName,
              userName,
              AVG(rating) AS avg_rating
          FROM 
              comments
          GROUP BY 
              tourName, userName
          ) AS uc ON t.tourName = uc.tourName
      WHERE 
          t.townID = ?
      GROUP BY 
          t.tourName;

    `;
    this.db.all(sql, townID, callback)
  }

  createTour(townID, tourName, description, category, price, transportationID, startDate, endDate, callback) {
    console.log('Create tour', tourName, townID, description, category, transportationID, startDate, endDate, price)
    this.db.run("INSERT INTO tours (townID, tourName, description, category, price, transportationID) VALUES (?, ?, ?, ?, ?, ?)",
      [townID, tourName, description, category, price, transportationID],
      function (err) {
        if (err) {
          callback(err);
          return;
        }
      }
    );
    this.db.run("INSERT INTO tour_date (tourName, startDate, endDate) VALUES(?, ?, ?)",
      [tourName, startDate, endDate],
      callback)
  }

  updateTour(townID, tourName, description, category, transportationID, startDate, endDate, price, callback) {
    console.log(tourName, townID, description, category, transportationID, startDate, endDate, price)
    let sql1 = "UPDATE tours SET townID = ?, description=?, category = ?, transportationID = ?, price=?  WHERE tourName = ?"
    this.db.run(sql1, [townID, description, category, transportationID, price, tourName],
      function (err) {
        if (err) {
          callback(err);
          return;
        }
      }
    );

    let sql2 = "UPDATE tour_date SET startDate = ?, endDate = ? WHERE tourName = ?"
    this.db.run(sql2, [startDate, endDate, tourName], callback);
  }

  deleteTour(tourName, callback) {
    let sql1 = "DELETE FROM tours WHERE tourName = ?"
    this.db.run(sql1, tourName, callback);

    // let sql2 = "DELETE FROM tour_date WHERE tourName = ?"
    // this.db.run(sql2,tourName,callback);

    // let sql3 = "DELETE FROM comments ƯHERE"

  }

  checkForTour(date, tourName, callback) {
    let sql = `SELECT
    CASE
        WHEN EXISTS (
            SELECT 1
            FROM tour_date
            WHERE startDate = ? AND tourName = ?)
        THEN 'true'
        ELSE 'false'
    END AS isTour;`
    this.db.all(sql, [date, tourName], callback)
  }

  getAccount(username, callback) {
    this.db.get(`SELECT * FROM accounts WHERE userName = ?`, [username], callback);

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

