import * as Tone from 'tone';
import { getSoundSet } from './instrumentBank';

export default function handleKeyboard(data) {
  switch (data.type) {
    case 'play':
      playNote(data);
      break;
    case 'stop':
      stopNote(data);
      break;
    default:
      console.error('No Note!');
  }
}

const playNote = (data) => {
  const note = Tone.Frequency(data.data.note + data.data.octave).toFrequency();
  const soundSet = getSoundSet(data.socketId);
  if (soundSet) {
    soundSet.keyboard.oscillator.frequency.rampTo(note, soundSet.keyboard.rampTo);
    soundSet.keyboard.play();
  }
};

const stopNote = (data) => {
  console.log('stopping note!');
  const soundSet = getSoundSet(data.socketId);
  if (soundSet) {
    soundSet.keyboard.stop();
  }
};
