import * as Tone from 'tone';
import defaultEnvelopeSettings from '../Components/Settings/DefaultEnvelopeSettings';

class Keyboard {
  constructor() {
    this.settings = { defaultEnvelopeSettings };
    this.gain = new Tone.Gain(1).toDestination();
    this.delay = new Tone.FeedbackDelay(0, 1).connect(this.gain);
    this.pulverizer = new Tone.BitCrusher(1).connect(this.delay);
    this.distortion = new Tone.Distortion(0).connect(this.pulverizer);
    this.pitchShifter = new Tone.PitchShift(0).connect(this.distortion);
    this.vibrato = new Tone.Vibrato(3, 1).connect(this.pitchShifter);
    this.envelope = new Tone.AmplitudeEnvelope(defaultEnvelopeSettings).connect(this.vibrato);
    this.keyboard = new Tone.Oscillator().connect(this.envelope).start();
  }
  setEffects(effects) {
    console.log('SUXCESS', effects);
    Object.keys(effects).forEach((effect) => {
      console.log(effect);
      if (effects[effect].wet) {
        effects[effect].on ? (this[effect].wet.value = effects[effect].wet.level) : (this[effect].wet.value = 0);
      } else {
        effects[effect].on ? (this[effect].wet.value = 1) : (this[effect].wet.value = 0);
      }
      switch (effect) {
        case 'pulverizer':
          this.pulverizer.bits.setValueAtTime(effects.pulverizer.level.level, Tone.now());
          break;
        case 'delay':
          this.delay.feedback.value = effects.delay.feedback.level;
          this.delay.delayTime.value = effects.delay.time.level;
          break;
        case 'distortion':
          this.distortion.distortion = effects.distortion.level.level;
          break;
        case 'pitchShifter':
          console.log('delay');
          this.pitchShifter.pitch = effects.pitchShifter.shift.level;
          break;
        case 'vibrato':
          this.vibrato.depth.value = effects.vibrato.depth.level;
          this.vibrato.frequency.value = effects.vibrato.freq.level;
          break;
        default:
          return;
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
