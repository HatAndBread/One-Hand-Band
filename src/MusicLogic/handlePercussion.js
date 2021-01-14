import { getSoundSet } from './instrumentBank';

export default function handlePercussion(data) {
  console.log(data);
  const soundSet = getSoundSet(data.socketId);
  if (soundSet) {
    soundSet.percussion.play(data.drum, data.sampleRate);
    console.log(soundSet, data.drum);
  }
}
