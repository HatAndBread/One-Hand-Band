import soundSet from './SoundSet';

export default function handlePercussion(data) {
  if (soundSet) {
    if (data.drum === 'rhythmMachine') {
      soundSet.percussion.setLoop(data);
    } else {
      soundSet.percussion.play(data.drum, data.sampleRate);
      console.log(soundSet, data.drum);
    }
  }
}
