import * as Tone from 'tone';
import { setKeyboardPitch } from './playMusic';

export default function handleKeyboard(data, soundSet) {
  switch (data.type) {
    case 'play':
      playNote(data, soundSet);
      break;
    case 'stop':
      stopNote(soundSet);
      break;
    default:
      console.error('No Note!');
  }
}

const playNote = (data, soundSet) => {
  if (data.data.note) {
    const pbr =
      Math.round((Tone.Frequency(data.data.note + data.data.octave).toFrequency() / 440 + Number.EPSILON) * 100) / 100;
    setKeyboardPitch(pbr);
    if (soundSet) {
      soundSet.keyboard.play();
    }
  }
};

const stopNote = (soundSet) => {
  if (soundSet) {
    soundSet.keyboard.stop();
  }
};
