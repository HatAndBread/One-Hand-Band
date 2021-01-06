import * as Tone from 'tone';
import { getMyInstrument } from './instrumentBank';

const synth = new Tone.Synth().toDestination();

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
  const note = data.data.note + data.data.octave;
  const instrument = getMyInstrument(data.socketId);
  if (instrument) {
    instrument.triggerAttack(note, Tone.now());
  }
};

const stopNote = (data) => {
  console.log('stopping note!');
  const instrument = getMyInstrument(data.socketId);
  if (instrument) {
    instrument.triggerRelease(Tone.now());
  }
};
