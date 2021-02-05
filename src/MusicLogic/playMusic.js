import handleKeyboard from './handleKeyboard';
import handleNoise from './handleNoise';
import handlePercussion from './handlePercussion';
import handleDrone from './handleDrone';

const noise = 'noise';
const keyboard = 'keyboard';
const percussion = 'percussion';
const drone = 'drone';

let soundSetRef;
let keyboardPbr = 1;
let oneDronePitch = 440;
let twoDronePitch = 440;
let threeDronePitch = 440;
export const setKeyboardPitch = (value) => (keyboardPbr = value);
export const setDronePitch = (one, two, three) => {
  oneDronePitch = one;
  twoDronePitch = two;
  threeDronePitch = three;
};

const pitchUpdater = () => {
  if (soundSetRef) {
    soundSetRef.keyboard.pbr = keyboardPbr;
    soundSetRef.drone.one.playbackRate = oneDronePitch;
    soundSetRef.drone.two.playbackRate = twoDronePitch;
    soundSetRef.drone.three.playbackRate = threeDronePitch;
  }
  window.requestAnimationFrame(pitchUpdater);
};

pitchUpdater();
pitchUpdater();
pitchUpdater();
pitchUpdater();

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
