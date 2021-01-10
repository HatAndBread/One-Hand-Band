import * as Tone from 'tone';
import defaultEnvelopeSettings from '../Components/Settings/DefaultEnvelopeSettings';
import Instrument from './Instrument';

class Keyboard extends Instrument {
  constructor() {
    super();
    this.envelope = new Tone.AmplitudeEnvelope(defaultEnvelopeSettings).connect(this.vibrato);
    this.keyboard = new Tone.Oscillator().connect(this.envelope).start();
  }

  play() {
    this.envelope.triggerAttack(Tone.now());
  }
  stop() {
    this.envelope.triggerRelease(Tone.now());
  }
}

export default Keyboard;
