import instrumentBank from './instrumentBank';
import SoundSet from './SoundSet';

const userIsUnique = (user) => {
  for (let i = 0; i < instrumentBank.length; i++) {
    if (user.socketId === instrumentBank[i].socketId) {
      return false;
    }
  }
  return true;
};

export default function handleUserUpdate(users) {
  users.forEach((user) => {
    if (userIsUnique(user)) {
      instrumentBank.push(new SoundSet(user.socketId));
    }
  });
  console.log('INSTRUMENT BANK');
  console.log(instrumentBank);
}
