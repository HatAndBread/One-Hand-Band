import * as Tone from 'tone';
import soundSet from './SoundSet';

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
  console.log(data);
  if (data.data.note) {
    const note = Tone.Frequency(data.data.note + data.data.octave).toFrequency();
    if (soundSet) {
      soundSet.keyboard.oscillator.frequency.rampTo(note, soundSet.keyboard.rampTo);
      soundSet.keyboard.play();
    }
  }
};

const stopNote = (data) => {
  console.log('stopping note!');
  if (soundSet) {
    soundSet.keyboard.stop();
  }
};
