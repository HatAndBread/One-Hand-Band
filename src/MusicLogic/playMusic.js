import handleKeyboard from './handleKeyboard';
import handleNoise from './handleNoise';
import handlePercussion from './handlePercussion';
import handleDrone from './handleDrone';

const noise = 'noise';
const keyboard = 'keyboard';
const percussion = 'percussion';
const drone = 'drone';

function handler(data, soundSet) {
  switch (data.instrument) {
    case keyboard:
      handleKeyboard(data, soundSet);
      break;
    case noise:
      handleNoise(data, soundSet);
      break;
    case percussion:
      handlePercussion(data, soundSet);
      break;
    case drone:
      handleDrone(data, soundSet);
      break;
    default:
      console.error(`No such instrument: ${data.instrument}`);
  }
}

export default function playMusic(data, soundSet) {
  if (data && data.instrument) {
    handler(data, soundSet);
  }
}
