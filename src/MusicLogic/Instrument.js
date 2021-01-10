import * as Tone from 'tone';
import EffectsObject from '../Components/Effects/EffectsObject';

export default class Instrument {
  constructor() {
    this.gain = new Tone.Gain(1).toDestination();
    this.delay = new Tone.FeedbackDelay(0, 1).connect(this.gain);
    this.pulverizer = new Tone.BitCrusher(1).connect(this.delay);
    this.distortion = new Tone.Distortion(0).connect(this.pulverizer);
    this.pitchShifter = new Tone.PitchShift(0).connect(this.distortion);
    this.vibrato = new Tone.Vibrato(3, 1).connect(this.pitchShifter);

    this.setEffects(EffectsObject());
  }

  setEffects(effects) {
    console.log(effects);
    Object.keys(effects).forEach((effect) => {
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
}
