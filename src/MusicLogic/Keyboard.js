import * as Tone from 'tone';
import defaultEnvelopeSettings from '../Components/Settings/DefaultEnvelopeSettings';
import Instrument from './Instrument';
import { checkIfSoundsLoaded } from './Instrument';
import { setLoaded } from '../App';

class Keyboard extends Instrument {
  constructor() {
    super();
    this.keyboardGain = new Tone.Gain(1).connect(this.vibrato);
    this.filter = new Tone.Filter({
      type: 'lowpass',
      frequency: 700,
      rolloff: -12,
      Q: 1,
      gain: 0
    });
    this.envelope = new Tone.AmplitudeEnvelope(defaultEnvelopeSettings);
    this.keyboardPlayer = new Tone.Player();
    this.keyboardPlayer.loop = true;
    this.keyboardPlayer.loopStart = 0;
    this.rampTo = 0;
    this.playing = false;
    this.pbr = 1;
    this.setFirstBuffer = setInterval(() => {
      if (checkIfSoundsLoaded()) {
        this.keyboardPlayer.chain(this.envelope, this.filter, this.keyboardGain);
        clearInterval(this.setFirstBuffer);
        this.connect();
        setLoaded();
        this.keyboardPlayer.buffer = this.getWave('sine');
        this.keyboardPlayer.start();
      }
    }, 100);
  }

  play() {
    if (this.playing) {
      this.envelope.triggerRelease(Tone.now());
    }
    this.keyboardPlayer.restart(Tone.now());
    this.envelope.triggerAttack(Tone.now());
    this.playing = true;
  }
  stop() {
    this.playing = false;
    this.envelope.triggerRelease(Tone.now());
  }
}

export default Keyboard;
