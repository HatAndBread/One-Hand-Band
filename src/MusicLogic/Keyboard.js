import * as Tone from 'tone';
import defaultEnvelopeSettings from '../Components/Settings/DefaultEnvelopeSettings';
import Instrument from './Instrument';

class Keyboard extends Instrument {
  constructor() {
    super();
    this.keyboardGain = new Tone.Gain(0.5).connect(this.vibrato);
    this.filter = new Tone.Filter({
      type: 'lowpass',
      frequency: 300,
      rolloff: -12,
      Q: 1,
      gain: 0
    }).connect(this.keyboardGain);
    this.envelope = new Tone.AmplitudeEnvelope(defaultEnvelopeSettings).connect(this.filter);
    this.keyboardPlayer = new Tone.Player().connect(this.envelope);
    this.keyboardPlayer.loop = true;
    this.keyboardPlayer.loopStart = 0;
    this.rampTo = 0;
    this.playing = false;
    this.setFirstBuffer = setInterval(() => {
      if (this.loaded) {
        this.keyboardPlayer.buffer = this.getWave('sine');
        clearInterval(this.setFirstBuffer);
      }
    }, 100);
  }

  play() {
    this.envelope.triggerAttack(Tone.now());
    if (!this.playing) {
      this.keyboardPlayer.start(Tone.now());
    }
    this.playing = true;
  }
  stop() {
    this.playing = false;
    this.envelope.triggerRelease(Tone.now());
    this.keyboardPlayer.stop(`+${this.envelope.release}`);
  }
}

export default Keyboard;
