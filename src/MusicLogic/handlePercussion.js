export default function handlePercussion(data, soundSet) {
  if (soundSet) {
    if (data.drum === 'rhythmMachine') {
      soundSet.percussion.setLoop(data);
    } else {
      soundSet.percussion.play(data.drum, data.sampleRate);
    }
  }
}
