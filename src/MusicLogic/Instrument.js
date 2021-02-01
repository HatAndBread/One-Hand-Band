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
import shepherd from '../assets/shepherd.mp3';
import voice from '../assets/voice.mp3';
import { setLoaded } from '../App';

const theLoop = () => {
  Tone.Destination.volume.value = -5;
  requestAnimationFrame(theLoop);
};

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
  shepherd,
  voice
};

let waves;

export default class Instrument {
  constructor() {
    this.gain = new Tone.Gain(0.2).toDestination();
    this.comp = new Tone.Compressor().connect(this.gain);
    this.delay = new Tone.FeedbackDelay(0, 1).connect(this.comp);
    this.pulverizer = new Tone.BitCrusher(1).connect(this.delay);
    this.distortion = new Tone.Distortion(0).connect(this.pulverizer);
    this.pitchShifter = new Tone.PitchShift(0).connect(this.distortion);
    this.vibrato = new Tone.Vibrato(3, 1).connect(this.pitchShifter);
    this.loaded = false;
    this.setEffects(EffectsObject());
    if (!waves) {
      waves = new Tone.ToneAudioBuffers(waveUrls, () => {
        console.log('noise samples loaded!');
        this.loaded = true;
        setLoaded();
        this.player.connect(this.vibrato);
      });
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
