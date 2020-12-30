const sqlite = require('sqlite3').verbose();

function createTables() {
  const db = new sqlite.Database('./.data/db.db', (err) => {
    if (err) {
      console.log(err);
    }
  });
  db.serialize(() => {
    db.run(/*sql*/ `
        CREATE TABLE IF NOT EXISTS sessions(
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        pin TEXT NOT NULL, date TEXT NOT NULL, hostId TEXT NOT NULL)`);
  });
  db.run(/*sql*/ `
        CREATE TABLE IF NOT EXISTS users(
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        socketId TEXT NOT NULL, date TEXT NOT NULL,
        pin TEXT NOT NULL,
        userName TEXT NOT NULL,
        FOREIGN KEY (pin) REFERENCES sessions (pin)
        )
    `);

  db.close();
}

module.exports = createTables;
