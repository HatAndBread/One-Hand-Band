import {
  Gain,
  FeedbackDelay,
  Compressor,
  BitCrusher,
  Distortion,
  PitchShift,
  Vibrato,
  ToneAudioBuffers,
  TransportTime,
  Transport,
  now
} from 'tone';
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

const waveUrls = {
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
let wavesReady;

const checkIfSoundsLoaded = () => (wavesReady ? true : false);

export { checkIfSoundsLoaded };
let loadedInstrumentNumber = 0;
const compressor = new Compressor();
export default class Instrument {
  constructor() {
    this.gain = new Gain(0.2).connect(compressor);
    this.delay = new FeedbackDelay(0, 1).connect(this.gain);
    this.vibrato = new Vibrato(3, 1).connect(this.delay);
    this.distortionLevel = 0;
    this.distortionWet = 0;
    this.pulverizerLevel = 1;
    this.pulverizerWet = 0;
    this.setEffects(EffectsObject());
    if (!waves) {
      waves = new ToneAudioBuffers(waveUrls, () => {
        wavesReady = true;
      });
    }
  }
  transportTime() {
    return `+${TransportTime('16n').toSeconds()}`;
  }

  connect() {
    loadedInstrumentNumber += 1;
    if (loadedInstrumentNumber === 4) {
      console.log('ALL CONNECTED');
      Transport.start(now());
      Transport.bpm.value = 80;
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
      switch (effect) {
        case 'pulverizer':
          this.pulverizerLevel = effects.pulverizer.level.level;
          if (effects.pulverizer.on) {
            this.pulverizerWet = 1;
          } else {
            this.pulverizerWet = 0;
          }
          break;
        case 'delay':
          this.delay.feedback.value = effects.delay.feedback.level;
          this.delay.delayTime.value = effects.delay.time.level;
          effects.delay.on ? (this.delay.wet.value = effects.delay.wet.level) : (this.delay.wet.value = 0);
          break;
        case 'distortion':
          this.distortionLevel = effects.distortion.level.level;
          if (effects.distortion.on) {
            this.distortionWet = effects.distortion.wet.level;
          } else {
            this.distortionWet = 0;
          }
          break;
        case 'vibrato':
          this.vibrato.depth.value = effects.vibrato.depth.level;
          this.vibrato.frequency.value = effects.vibrato.freq.level;
          if (effect.on) {
            this.vibrato.wet.value = effect.wet.value.level;
          } else {
            this.vibrato.wet.value = 0;
          }
          break;
        default:
          return;
      }
    });
  }
}
