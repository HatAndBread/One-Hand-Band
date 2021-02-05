import Keyboard from './Keyboard';
import Drone from './Drone';
import Percussion from './Percussion';
import Noise from './Noise';

export default class SoundSet {
  constructor() {
    this.keyboard = new Keyboard();
    this.drone = new Drone();
    this.percussion = new Percussion();
    this.noise = new Noise();
  }

  setEffects(instrument, effects) {
    const s = this[instrument];
    if (s) {
      Object.keys(effects).forEach((key) => {
        this[key] && this[key].setEffects(effects[key]);
      });
    }
  }
  setSettings(instrument, settings) {
    const s = this[instrument];
    if (s) {
      if (settings.envelope) {
        if (s.envelope) {
          s.envelope.attack = settings.envelope.attack;
          s.envelope.decay = settings.envelope.decay;
          s.envelope.sustain = settings.envelope.sustain;
          s.envelope.release = settings.envelope.release;
        }
        if (s.envelopeOne) {
          s.envelopeOne.attack = settings.envelope.attack;
          s.envelopeOne.decay = settings.envelope.decay;
          s.envelopeOne.sustain = settings.envelope.sustain;
          s.envelopeOne.release = settings.envelope.release;
        }
        if (s.envelopeTwo) {
          s.envelopeTwo.attack = settings.envelope.attack;
          s.envelopeTwo.decay = settings.envelope.decay;
          s.envelopeTwo.sustain = settings.envelope.sustain;
          s.envelopeTwo.release = settings.envelope.release;
        }
        if (s.envelopeThree) {
          s.envelopeThree.attack = settings.envelope.attack;
          s.envelopeThree.decay = settings.envelope.decay;
          s.envelopeThree.sustain = settings.envelope.sustain;
          s.envelopeThree.release = settings.envelope.release;
        }
      }
      this[instrument].gain.gain.value = settings.volume;
      if (instrument === 'keyboard') {
        //this[instrument].rampTo = settings.rampTo;
        this.keyboard.keyboardPlayer.stop(`+${this.keyboard.envelope.release}`);
        this.keyboard.keyboardPlayer.buffer = this.keyboard.getWave(settings.wave);
        this.keyboard.wave = settings.wave;
        this.keyboard.keyboardPlayer.start();
      }
    }
  }
}
