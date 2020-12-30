const sqlite = require('sqlite3');

module.exports = function (queries) {
  const db = new sqlite.Database('./.data/db.db');
  db.serialize(() => {
    queries.forEach((query) => {
      db.run(query.query, query.parameters);
    });
  });
  db.close();
};
