import * as Tone from 'tone';
import defaultEnvelopeSettings from '../Components/Settings/DefaultEnvelopeSettings';
import Instrument from './Instrument';

class Drone extends Instrument {
  constructor() {
    super();
    this.envelope = new Tone.AmplitudeEnvelope(defaultEnvelopeSettings).connect(this.vibrato);
    this.one = new Tone.Player().connect(this.envelope);
    this.two = new Tone.Player().connect(this.envelope);
    this.three = new Tone.Player().connect(this.envelope);
    this.rampTo = 0;
    this.one.loop = true;
    this.two.loop = true;
    this.three.loop = true;
  }

  setBuffer(droneNum, waveType) {
    const drone = this[droneNum];
    if (drone.playing) {
      drone.stop(`+${this.envelope.release}`);
      this.envelope.triggerRelease(Tone.now());
      drone.buffer = this.getWave(waveType);
      drone.start(Tone.now());
      this.envelope.triggerAttack(Tone.now());
    }
    drone.type = waveType;
  }

  play(number) {
    const drone = this[number];
    drone.buffer = this.getWave(drone.type);
    if (!drone.playing) {
      drone.start(Tone.now());
      drone.playing = true;
      this.envelope.triggerAttack(Tone.now());
    }
  }
  stop(number) {
    const drone = this[number];
    if (drone.playing) {
      drone.playing = false;
      drone.stop(`+${this.envelope.release}`);
      this.envelope.triggerRelease(Tone.now());
    }
  }
}

export default Drone;
