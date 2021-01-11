import * as Tone from 'tone';
import defaultEnvelopeSettings from '../Components/Settings/DefaultEnvelopeSettings';
import Instrument from './Instrument';

class Keyboard extends Instrument {
  constructor() {
    super();
    this.envelope = new Tone.AmplitudeEnvelope(defaultEnvelopeSettings).connect(this.vibrato);
    this.keyboard = new Tone.Oscillator().connect(this.envelope).start();
    this.rampTo = 0;
    this.playing = false;
  }

  play() {
    this.playing = true;
    this.envelope.triggerAttack(Tone.now());
  }
  stop() {
    this.playing = false;
    this.envelope.triggerRelease(Tone.now());
  }
}

export default Keyboard;
