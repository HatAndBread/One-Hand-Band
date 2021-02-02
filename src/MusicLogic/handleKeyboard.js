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

// Sampler = mistake.
const playNote = (data, soundSet) => {
  if (data.data.note) {
    const note =
      Math.round((Tone.Frequency(data.data.note + data.data.octave).toFrequency() + Number.EPSILON) * 100) / 100;
    if (soundSet) {
      if (!soundSet.keyboard[`${soundSet.keyboard.currentSampler}Sampler`].loaded) {
        soundSet.keyboard[`${soundSet.keyboard.currentSampler}Sampler`].add('A4', soundSet.keyboard.getWave('sine'));
      }
      soundSet.keyboard.playing &&
        soundSet.keyboard[`${soundSet.keyboard.currentSampler}Sampler`].releaseAll(Tone.now());
      soundSet.keyboard[`${soundSet.keyboard.currentSampler}Sampler`].triggerAttack(note, Tone.now());
      soundSet.keyboard.playing = true;
    }
  }
};

const stopNote = (soundSet) => {
  if (soundSet) {
    soundSet.keyboard[`${soundSet.keyboard.currentSampler}Sampler`].releaseAll(Tone.now());
    soundSet.keyboard.playing = false;
  }
};
