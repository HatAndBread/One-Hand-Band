import * as Tone from 'tone';
import EffectsObject from '../Components/Effects/EffectsObject';
import sine from '../assets/sine.mp3';
import sawtooth from '../assets/sawtooth.mp3';
import square from '../assets/square.mp3';
import triangle from '../assets/triangle.mp3';
import oboe from '../assets/oboe.mp3';
import oud from '../assets/oud.mp3';
import harmonium from '../assets/harmonium.mp3';
import kazoo from '../assets/kazoo.mp3';
import organ from '../assets/organ.mp3';
import swell from '../assets/swell.mp3';
import trumpet from '../assets/trumpet.mp3';
import piano from '../assets/piano.mp3';
import voice from '../assets/voice.mp3';
import tambura from '../assets/tambura.mp3';
import singing from '../assets/singing.mp3';
import cello from '../assets/cello.mp3';
import saw from '../assets/saw.mp3';
import kalimba from '../assets/kalimba.mp3';
import gamelan from '../assets/gamelan.mp3';
import gamelan2 from '../assets/gamelan2.mp3';
import gamelan3 from '../assets/gamelan3.mp3';
import violin from '../assets/violin.mp3';

const theLoop = () => {
  Tone.Destination.volume.value = -5;
  requestAnimationFrame(theLoop);
};

export const waveUrls = {
  sine,
  sawtooth,
  square,
  triangle,
  oboe,
  oud,
  harmonium,
  kazoo,
  organ,
  swell,
  trumpet,
  piano,
  voice,
  tambura,
  singing,
  cello,
  saw,
  kalimba,
  gamelan,
  gamelan2,
  gamelan3,
  violin
};

let waves;

const checkIfSoundsLoaded = () => (waves ? true : false);

export { checkIfSoundsLoaded };
let loadedInstrumentNumber = 0;
const compressor = new Tone.Compressor();
export default class Instrument {
  constructor() {
    this.gain = new Tone.Gain(0.2).connect(compressor);
    this.delay = new Tone.FeedbackDelay(0, 1).connect(this.gain);
    this.pulverizer = new Tone.BitCrusher(1).connect(this.delay);
    this.distortion = new Tone.Distortion(0).connect(this.pulverizer);
    this.pitchShifter = new Tone.PitchShift(0).connect(this.distortion);
    this.vibrato = new Tone.Vibrato(3, 1).connect(this.pitchShifter);
    this.setEffects(EffectsObject());
    if (!waves) {
      waves = new Tone.ToneAudioBuffers(waveUrls, () => {});
    }
  }

  connect() {
    loadedInstrumentNumber += 1;
    if (loadedInstrumentNumber === 4) {
      console.log('ALL CONNECTED');
      compressor.toDestination();
    }
  }

  getWave(which) {
    if (waves) {
      return waves.get(which);
    }
  }

  setEffects(effects) {
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
