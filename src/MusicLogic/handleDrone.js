import { Frequency } from 'tone';
import { setDronePitch } from './playMusic';

export default function handleDrone(data, soundSet) {
  if (soundSet) {
    setPitches([data.one.pitch, data.two.pitch, data.three.pitch], soundSet);
    setWaves([data.one.wave, data.two.wave, data.three.wave], soundSet);
    setVolumes(
      [parseInt(data.one.volume, 10), parseInt(data.two.volume, 10), parseInt(data.three.volume, 10)],
      soundSet
    );
    play([data.one.playing, data.two.playing, data.three.playing], soundSet);
  }
}

const setVolumes = (volumes, soundSet) => {
  volumes[0] !== soundSet.drone.one.volume.value && (soundSet.drone.one.volume.value = volumes[0]);
  volumes[1] !== soundSet.drone.two.volume.value && (soundSet.drone.two.volume.value = volumes[1]);
  volumes[2] !== soundSet.drone.three.volume.value && (soundSet.drone.three.volume.value = volumes[2]);
};
const setWaves = (waves, soundSet) => {
  waves[0] !== soundSet.drone.one.type && soundSet.drone.setBuffer('one', waves[0]);
  waves[1] !== soundSet.drone.two.type && soundSet.drone.setBuffer('two', waves[1]);
  waves[2] !== soundSet.drone.three.type && soundSet.drone.setBuffer('three', waves[2]);
};
const setPitches = (pitches, soundSet) => {
  pitches.forEach((pitch, index, arr) => (arr[index] = Frequency(pitch).toFrequency()));
  setDronePitch(pitches[0] / 440, pitches[1] / 440, pitches[2] / 440);
};
const play = (drones, soundSet) => {
  console.log('LOOK HERE', drones);
  if (drones.includes(true)) {
    drones[0] ? soundSet.drone.play('one') : soundSet.drone.stop('one');
    drones[1] ? soundSet.drone.play('two') : soundSet.drone.stop('two');
    drones[2] ? soundSet.drone.play('three') : soundSet.drone.stop('three');
  } else {
    soundSet.drone.stopAll();
  }
};
