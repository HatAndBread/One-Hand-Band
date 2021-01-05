import * as Tone from 'tone';

const synth = new Tone.Synth().toDestination();

export default function handleKeyboard(data) {
  console.log(data);
  switch (data.type) {
    case 'play':
      playNote(data.data);
      break;
    case 'stop':
      stopNote(data);
      break;
    default:
      console.error('No Note!');
  }
}

const playNote = (data) => {
  const note = data.note + data.octave;
  console.log(note);
  console.log('PLAYING NOTE');
  synth.triggerAttack(note, Tone.now());
};

const stopNote = (data) => {
  console.log('stopping note!');
  synth.triggerRelease(Tone.now());
};
