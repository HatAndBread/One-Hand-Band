import handleKeyboard from './handleKeyboard';
import handleNoise from './handleNoise';
import handlePercussion from './handlePercussion';
import handleDrone from './handleDrone';

const noise = 'noise';
const keyboard = 'keyboard';
const percussion = 'percussion';
const drone = 'drone';

function handler(data) {
  console.log('DATA HERE', data);
  switch (data.instrument) {
    case keyboard:
      handleKeyboard(data);
      break;
    case noise:
      handleNoise(data);
      break;
    case percussion:
      handlePercussion(data);
      break;
    case drone:
      handleDrone(data);
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
