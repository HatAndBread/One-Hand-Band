import handleKeyboard from './handleKeyboard';
import handleNoise from './handleNoise';
import handlePercussion from './handlePercussion';
import handleDrone from './handleDrone';

const noise = 'noise';
const keyboard = 'keyboard';
const percussion = 'percussion';
const drone = 'drone';

let soundSetRef;

export const setKeyboardPitch = (value) => (soundSetRef.keyboard.pbr = value);
export const setDronePitch = (one, two, three) => {
  soundSetRef.drone.one.playbackRate = one;
  soundSetRef.drone.two.playbackRate = two;
  soundSetRef.drone.three.playbackRate = three;
};

// const pitchUpdater = () => {
//   if (soundSetRef) {
//     soundSetRef.keyboard.pbr = keyboardPbr;
//     soundSetRef.drone.one.playbackRate = oneDronePitch;
//     soundSetRef.drone.two.playbackRate = twoDronePitch;
//     soundSetRef.drone.three.playbackRate = threeDronePitch;
//   }
//   window.requestAnimationFrame(pitchUpdater);
// };

// pitchUpdater();
// pitchUpdater();
// pitchUpdater();
// pitchUpdater();

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
  if (!soundSetRef) {
    soundSetRef = soundSet;
  }
  if (data && data.instrument) {
    handler(data, soundSet);
  }
}
