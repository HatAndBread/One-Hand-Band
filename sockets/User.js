const Session = require('./Session');
const generateName = require('./generateName');
const run = require('../db/run');

module.exports = class User {
  /**
   *
   * @param {*} params - socketId, pin
   */
  constructor(params) {
    this.userName = generateName();
    this.socketId = params.socketId;
    this.pin = params.pin;
  }

  create() {
    run([
      {
        query: /*sql*/ `
      INSERT INTO users (pin, socketId, userName, date)
      VALUES(?, ?, ?, ?)`,
        parameters: [this.pin, this.socketId, this.userName, Date.now()]
      }
    ]);
  }
};
