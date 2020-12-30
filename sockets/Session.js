const run = require('../db/run');
const get = require('../db/get');
const all = require('../db/all');
const User = require('./User');

const getUsers = (pin, firstRow) => {
  return new Promise(async (resolve, reject) => {
    await all(/*sql*/ `SELECT * FROM users WHERE pin = ?`, [pin], function (err, secondRow) {
      if (err) {
        reject(console.error(err));
      }
      if (!secondRow) {
        reject('no such user');
      } else {
        const params = { pin: firstRow.pin, host: firstRow.hostId, users: [] };
        secondRow.forEach((user) => {
          params.users.push({ sockedId: user.socketId, userName: user.userName });
        });
        resolve(new Session(params));
      }
    });
  });
};

class Session {
  /**
   *
   * @param {object} params - pin, host
   */
  constructor(params) {
    this.pin = params.pin;
    this.host = params.host;
    this.users = params.users;
  }
  create() {
    run([
      {
        query: /*sql*/ `
      INSERT INTO sessions (pin, hostId, date)
      VALUES(?, ?, ?)`,
        parameters: [this.pin, this.host, Date.now()]
      }
    ]);
  }
  destroy() {
    console.log(`I'm destroying myself`);
  }

  addUser(socketId, pin) {
    const newUser = new User({ socketId: socketId, pin: pin });
    newUser.create();
    this.users.push(newUser);
    return newUser;
  }

  static async findByHost(hostId) {
    return await new Promise(async (resolve, reject) => {
      await get(/*sql*/ `SELECT * FROM sessions WHERE hostId = ?`, [hostId], async function (err, row) {
        if (err) {
          return console.error(err);
        }
        resolve(await getUsers(row.pin, row));
      });
    });
  }

  static async findByPin(pin) {
    return await new Promise(async (resolve, reject) => {
      await get(/*sql*/ `SELECT * FROM sessions WHERE pin = ?`, [pin], async function (err, firstRow) {
        if (err) {
          reject(console.error(err));
        }
        if (!firstRow) {
          reject('no such session');
        } else {
          resolve(await getUsers(pin, firstRow));
        }
      });
    });
  }
}

module.exports = Session;
