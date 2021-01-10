import * as Tone from 'tone';
import defaultEnvelopeSettings from '../Components/Settings/DefaultEnvelopeSettings';

class Keyboard {
  constructor() {
    this.settings = { defaultEnvelopeSettings };
    this.gain = new Tone.Gain(1).toDestination();
    this.pulverizer = new Tone.BitCrusher(16).connect(this.gain);
    this.delay = new Tone.Delay(1, 1);
    this.distortion = new Tone.Distortion(0);
    this.pitchShifter = new Tone.PitchShift(0);
    this.vibrato = new Tone.Vibrato(3, 1).connect(this.gain);
    this.envelope = new Tone.AmplitudeEnvelope(defaultEnvelopeSettings).connect(this.vibrato);
    this.keyboard = new Tone.Oscillator().connect(this.envelope).start();
  }
  setEffects(effects) {
    console.log('SUXCESS', effects);
    Object.keys(effects).forEach((effect) => {
      console.log(effect);
      switch (effect) {
        case 'pulverizer':
          //this.pulverizer.bits = effects.pulverizer.level.level;
          console.log(this.pulverizer.bits);
          break;
        case 'delay':
          console.log('delay');
          break;
        case 'distortion':
          console.log('delay');
          break;
        case 'pitchShifter':
          console.log('delay');
          break;
        case 'vibrato':
          this.vibrato.depth.value = effects.vibrato.depth.level;
          this.vibrato.frequency.value = effects.vibrato.freq.level;
          effects.vibrato.on ? (this.vibrato.wet.value = effects.vibrato.wet.level) : (this.vibrato.wet.value = 0);
          console.log(effects.vibrato.freq.level);
          break;
        default:
          console.log('Hi!');
      }
    });
  }
  play() {
    this.envelope.triggerAttack(Tone.now());
  }
  stop() {
    this.envelope.triggerRelease(Tone.now());
  }
}

export default Keyboard;
