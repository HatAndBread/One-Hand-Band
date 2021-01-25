const sqlite = require('sqlite3').verbose();

function clean() {
  console.log('Cleaning old sessions from db...');
  const db = new sqlite.Database('./.data/db.db');
  try {
    db.run(/*SQL */ `DELETE FROM sessions WHERE date < ?`, [Date.now() - 1000 * 60 * 60 * 24], function (err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Sessions deleted: ${this.changes}`);
    });
    db.run(/*SQL */ `DELETE FROM users WHERE date < ?`, [Date.now() - 1000 * 60 * 60 * 24], function (err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Users deleted: ${this.changes}`);
    });
  } catch (err) {
    console.error(err);
  }
  db.close();
}

module.exports = clean;
