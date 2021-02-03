export default function handlePercussion(data, soundSet) {
  if (soundSet) {
    if (data.drum === 'rhythmMachine') {
      // soundSet.percussion.setLoop(data);
      switch (data.status) {
        case 'update':
          soundSet.percussion.updateMachine(data);
          break;
        case 'start':
          soundSet.percussion.updateMachine(data);
          soundSet.percussion.startMachine();
          break;
        case 'stop':
          soundSet.percussion.stopMachine();
          break;
        default:
          break;
      }
    } else {
      soundSet.percussion.play(data.drum, data.sampleRate, data.number);
    }
  }
}
