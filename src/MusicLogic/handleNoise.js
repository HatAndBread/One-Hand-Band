export default function handleNoise(data, soundSet) {
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
