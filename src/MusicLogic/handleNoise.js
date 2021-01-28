import soundSet from './SoundSet';

export default function handleNoise(data) {
  if (soundSet) {
    if (data.start) {
      soundSet.noise.start(data);
    } else if (data.stop) {
      soundSet.noise.stop(data);
    } else {
      soundSet.noise.play(data);
    }
  }
}
