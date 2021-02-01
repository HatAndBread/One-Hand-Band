import * as Tone from 'tone';
import defaultEnvelopeSettings from '../Components/Settings/DefaultEnvelopeSettings';
import Instrument from './Instrument';
import { setLoaded } from '../App';
import { checkIfSoundsLoaded } from './Instrument';

class Drone extends Instrument {
  constructor() {
    super();
    this.droneGain = new Tone.Gain(1).connect(this.vibrato);
    this.envelope = new Tone.AmplitudeEnvelope(defaultEnvelopeSettings).connect(this.droneGain);
    this.one = new Tone.Player();
    this.two = new Tone.Player();
    this.three = new Tone.Player();
    this.rampTo = 0;
    this.one.loop = true;
    this.two.loop = true;
    this.three.loop = true;
    this.setFirstBuffer = setInterval(() => {
      console.log(checkIfSoundsLoaded());
      if (checkIfSoundsLoaded()) {
        this.one.buffer = this.getWave('sine');
        this.two.buffer = this.getWave('sine');
        this.three.buffer = this.getWave('sine');
        this.one.connect(this.envelope);
        this.two.connect(this.envelope);
        this.three.connect(this.envelope);
        clearInterval(this.setFirstBuffer);
        setLoaded();
      }
    }, 100);
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
