import * as Tone from 'tone';

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
  console.log('VOLUMES', volumes, soundSet.drone.droneOne.volume.value);
  volumes[0] !== soundSet.drone.droneOne.volume.value && (soundSet.drone.droneOne.volume.value = volumes[0]);
  volumes[1] !== soundSet.drone.droneTwo.volume.value && (soundSet.drone.droneTwo.volume.value = volumes[1]);
  volumes[2] !== soundSet.drone.droneThree.volume.value && (soundSet.drone.droneThree.volume.value = volumes[2]);
};
const setWaves = (waves, soundSet) => {
  waves[0] !== soundSet.drone.droneOne.type && (soundSet.drone.droneOne.type = waves[0]);
  waves[1] !== soundSet.drone.droneTwo.type && (soundSet.drone.droneTwo.type = waves[1]);
  waves[2] !== soundSet.drone.droneThree.type && (soundSet.drone.droneThree.type = waves[2]);
};
const setPitches = (pitches, soundSet) => {
  pitches.forEach((pitch, index, arr) => (arr[index] = Tone.Frequency(pitch).toFrequency()));
  soundSet.drone.droneOne.frequency.rampTo(pitches[0], 0.2);
  soundSet.drone.droneTwo.frequency.rampTo(pitches[1], 0.2);
  soundSet.drone.droneThree.frequency.rampTo(pitches[2], 0.2);
};
const play = (drones, soundSet) => {
  drones[0] ? soundSet.drone.play('One') : soundSet.drone.stop('One');
  drones[1] ? soundSet.drone.play('Two') : soundSet.drone.stop('Two');
  drones[2] ? soundSet.drone.play('Three') : soundSet.drone.stop('Three');
};
