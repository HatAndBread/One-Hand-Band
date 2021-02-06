import defaultEnvelopeSettings from '../Components/Settings/DefaultEnvelopeSettings';
import Instrument from './Instrument';
import { setLoaded } from '../App';
import { checkIfSoundsLoaded } from './Instrument';
import { Gain, Filter, Player, AmplitudeEnvelope, now } from 'tone';

class Drone extends Instrument {
  constructor() {
    super();
    this.droneGain = new Gain(1);
    this.filter = new Filter({
      type: 'lowpass',
      frequency: 700,
      rolloff: -12,
      Q: 1,
      gain: 0
    });
    this.envelope = new AmplitudeEnvelope(defaultEnvelopeSettings);
    this.one = new Player();
    this.two = new Player();
    this.three = new Player();
    this.rampTo = 0;
    this.one.loop = true;
    this.two.loop = true;
    this.three.loop = true;
    this.setFirstBuffer = setInterval(() => {
      if (checkIfSoundsLoaded()) {
        this.one.buffer = this.getWave('sine');
        this.two.buffer = this.getWave('sine');
        this.three.buffer = this.getWave('sine');
        this.envelope.chain(this.filter, this.droneGain, this.distortion);
        this.one.connect(this.envelope);
        this.two.connect(this.envelope);
        this.three.connect(this.envelope);
        this.connect();
        clearInterval(this.setFirstBuffer);
        setLoaded();
      }
    }, 100);
  }

  setBuffer(droneNum, waveType) {
    const drone = this[droneNum];
    if (drone.playing) {
      drone.stop(`+${this.envelope.release}`);
      this.envelope.triggerRelease(now());
      drone.buffer = this.getWave(waveType);
      drone.start(now());
      this.envelope.triggerAttack(now());
    }
    drone.type = waveType;
  }

  play(number) {
    const drone = this[number];
    drone.buffer = this.getWave(drone.type);
    if (!drone.playing) {
      drone.start(now());
      drone.playing = true;
      this.envelope.triggerAttack(now());
    }
  }
  stop(number) {
    const drone = this[number];
    if (drone.playing) {
      drone.playing = false;
      drone.stop(`+${this.envelope.release}`);
      this.envelope.triggerRelease(now());
    }
  }
}

export default Drone;
