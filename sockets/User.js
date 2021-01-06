const generateName = require('./generateName');
const run = require('../db/run');

module.exports = class User {
  /**
   *
   * @param {*} params - socketId, pin
   */
  constructor(params) {
    this.userName = params.userName;
    this.socketId = params.socketId;
    this.pin = params.pin;
    this.instrument = params.instrument;
  }

  async create() {
    return await run({
      query: /*sql*/ `
      INSERT INTO users (pin, socketId, userName, instrument, date)
      VALUES(?, ?, ?, ?, ?)`,
      parameters: [this.pin, this.socketId, this.userName, this.instrument, Date.now()]
    });
  }
  static async update(user, pin, userName) {
    return await run({
      query: /*sql*/ `
      UPDATE users
        SET pin = ?,
        socketId = ?,
        userName = ?,
        instrument = ?,
        date = ?
        WHERE pin = ?
        AND userName = ?
      `,
      parameters: [user.pin, user.socketId, user.userName, user.instrument, Date.now(), pin, userName]
    });
  }
};
