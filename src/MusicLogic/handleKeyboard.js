import { Frequency } from 'tone';

export default function handleKeyboard(data, soundSet) {
  switch (data.type) {
    case 'play':
      const pbr =
        Math.round((Frequency(data.data.note + data.data.octave).toFrequency() / 440 + Number.EPSILON) * 100) / 100;
      soundSet.keyboard.play(pbr, soundSet.keyboard.getWave(soundSet.keyboard.wave));
      break;
    case 'stop':
      soundSet.keyboard.stop();
      break;
    default:
      console.error('Handle keyboard error');
  }
}
