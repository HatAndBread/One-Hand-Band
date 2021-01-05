import handleKeyboard from './handleKeyboard';
import handleNoise from './handleNoise';
import handleSkronk from './handleSkronk';
import handlePercussion from './handlePercussion';
import handleTheremin from './handleTheremin';

const skronk = 'skronk';
const noise = 'noise';
const keyboard = 'keyboard';
const theremin = 'theremin';
const percussion = 'percussion';

function handler(data) {
  switch (data.instrument) {
    case keyboard:
      handleKeyboard(data.data);
      break;
    case noise:
      handleNoise(data.data);
      break;
    case skronk:
      handleSkronk(data.data);
      break;
    case theremin:
      handleTheremin(data.data);
      break;
    case percussion:
      handlePercussion(data.data);
      break;
    default:
      console.error(`No such instrument: ${data.instrument}`);
  }
}

export default function playMusic(data) {
  if (data && data.instrument) {
    handler(data);
  }
}
