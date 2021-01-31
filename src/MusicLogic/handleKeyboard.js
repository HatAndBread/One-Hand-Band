import * as Tone from 'tone';

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
    const note = Tone.Frequency(data.data.note + data.data.octave).toFrequency();
    if (soundSet) {
      console.log(data.data.note + data.data.octave);
      soundSet.keyboard.oscillator.frequency.rampTo(note, soundSet.keyboard.rampTo);
      soundSet.keyboard.play();
    }
  }
};

const stopNote = (soundSet) => {
  if (soundSet) {
    soundSet.keyboard.stop();
  }
};
