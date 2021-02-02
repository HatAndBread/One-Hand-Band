import * as Tone from 'tone';
import defaultEnvelopeSettings from '../Components/Settings/DefaultEnvelopeSettings';
import Instrument from './Instrument';
import { checkIfSoundsLoaded, waveUrls } from './Instrument';
import { setLoaded } from '../App';

class Keyboard extends Instrument {
  constructor() {
    super();
    this.currentSampler = 'sine';
    this.keyboardGain = new Tone.Gain(1.5).connect(this.vibrato);
    this.filter = new Tone.Filter({
      type: 'lowpass',
      frequency: 700,
      rolloff: -12,
      Q: 1,
      gain: 0
    });
    this.rampTo = 0;
    this.playing = false;
    this.setFirstBuffer = setInterval(() => {
      if (checkIfSoundsLoaded()) {
        this.createSamplers();
        this.connect();
        setLoaded();
        clearInterval(this.setFirstBuffer);
      }
    }, 100);
  }

  createSamplers() {
    Object.keys(waveUrls).forEach((key) => {
      this[`${key}Sampler`] = new Tone.Sampler();
      this[`${key}Sampler`].add('A4', this.getWave(key));
      this[`${key}Sampler`].connect(this.keyboardGain);
    });
  }
}

export default Keyboard;
