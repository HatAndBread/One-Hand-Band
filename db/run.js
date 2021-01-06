const sqlite = require('sqlite3');

module.exports = function (query) {
  const db = new sqlite.Database('./.data/db.db');
  return new Promise((resolve, reject) => {
    try {
      db.run(query.query, query.parameters);
      db.close();
      resolve(true);
    } catch (err) {
      reject(err);
      db.close();
    }
  });
};
