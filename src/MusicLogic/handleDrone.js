import * as Tone from 'tone';
import { getSoundSet } from './instrumentBank';

export default function handleDrone(data) {
  console.log(data);
  const soundSet = getSoundSet(data.socketId);
  if (soundSet) {
    setPitches([data.one.pitch, data.two.pitch, data.three.pitch], soundSet);
    play([data.one.playing, data.two.playing, data.three.playing], soundSet);
  }
}

const setPitches = (pitches, soundSet) => {
  pitches.forEach((pitch, index, arr) => (arr[index] = Tone.Frequency(pitch).toFrequency()));
  soundSet.drone.droneOne.frequency.rampTo(pitches[0], 0.2);
  soundSet.drone.droneTwo.frequency.rampTo(pitches[1], 0.2);
  soundSet.drone.droneThree.frequency.rampTo(pitches[2], 0.2);
  console.log(soundSet);
};
const play = (drones, soundSet) => {
  drones[0] ? soundSet.drone.play('One') : soundSet.drone.stop('One');
  drones[1] ? soundSet.drone.play('Two') : soundSet.drone.stop('Two');
  drones[2] ? soundSet.drone.play('Three') : soundSet.drone.stop('Three');
};

const stop = (data) => {
  console.log('stopping note!');
  const soundSet = getSoundSet(data.socketId);
  if (soundSet) {
    //soundSet.drone.stop();
  }
};
