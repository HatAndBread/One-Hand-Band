const sqlite = require('sqlite3');

module.exports = (sql, params, callback) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite.Database('./.data/db.db');
    try {
      console.log('HI');
      db.all(sql, params, callback);
      db.close();
      resolve(true);
    } catch (err) {
      reject(err);
      db.close();
    }
  });
};
