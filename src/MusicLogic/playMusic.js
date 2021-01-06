import handleKeyboard from './handleKeyboard';
import handleNoise from './handleNoise';
import handleSkronk from './handleSkronk';
import handlePercussion from './handlePercussion';
import handleTheremin from './handleTheremin';
import handleUserUpdate from './handleUserUpdate';

const skronk = 'skronk';
const noise = 'noise';
const keyboard = 'keyboard';
const theremin = 'theremin';
const percussion = 'percussion';

function handler(data) {
  switch (data.instrument) {
    case keyboard:
      handleKeyboard(data);
      break;
    case noise:
      handleNoise(data);
      break;
    case skronk:
      handleSkronk(data);
      break;
    case theremin:
      handleTheremin(data);
      break;
    case percussion:
      handlePercussion(data);
      break;
    default:
      console.error(`No such instrument: ${data.instrument}`);
  }
}

export default function playMusic(data) {
  if (data && data.instrument) {
    handler(data);
  } else if (data && data.users) {
    handleUserUpdate(data.users);
  }
}
