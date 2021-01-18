import { getSoundSet } from './instrumentBank';

export default function handleNoise(data) {
  const soundSet = getSoundSet(data.socketId);
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
