import { Player, Gain, BitCrusher, ToneAudioBuffers, now } from 'tone';
import Instrument from './Instrument';
import amRadioNoise from '../assets/amradionoise.mp3';
import analogueWhiteNoise from '../assets/analoguewhitenoise.mp3';
import digitalNoise from '../assets/digitalnoise.mp3';
import feedback from '../assets/feedback.mp3';
import guitarFeedback from '../assets/guitarfeedback.mp3';
import guitarNoise1 from '../assets/guitarnoise1.mp3';
import guitarNoise2 from '../assets/guitarnoise2.mp3';
import guitarNoise3 from '../assets/guitarnoise3.mp3';
import guitarNoise4 from '../assets/guitarnoise4.mp3';
import heavyStatic from '../assets/heavystatic.mp3';
import micFeedback from '../assets/micfeedback.mp3';
import radioBuzz from '../assets/radioBuzz.mp3';
import recordPlayerGlitch from '../assets/recordPlayerGlitch.mp3';
import saxSqueek from '../assets/saxSqueek.mp3';
import trumpetHiss from '../assets/trumpethiss.mp3';
import saxSkronk from '../assets/saxSkronk.mp3';
import saxSkronk2 from '../assets/saxSkronk2.mp3';
import saxSkronk3 from '../assets/saxSkronk3.mp3';
import saxSkronk4 from '../assets/saxSkronk4.mp3';
import saxSkronk5 from '../assets/saxSkronk5.mp3';
import saxSkronk6 from '../assets/saxSkronk6.mp3';
import saxSkronk7 from '../assets/saxSkronk7.mp3';
import saxSkronk8 from '../assets/saxSkronk8.mp3';
import saxSkronk9 from '../assets/saxSkronk9.mp3';
import saxSkronk10 from '../assets/saxSkronk10.mp3';
import saxSkronk11 from '../assets/saxSkronk11.mp3';
import saxSkronk12 from '../assets/saxSkronk12.mp3';
import saxSkronk13 from '../assets/saxSkronk13.mp3';
import saxSkronk14 from '../assets/saxSkronk14.mp3';
import aluminium from '../assets/aluminium.mp3';
import spaceDrone from '../assets/spaceDrone.mp3';
import glitch from '../assets/glitch.mp3';
import { setLoaded } from '../App';

class Noise extends Instrument {
  constructor() {
    super();
    this.loaded = false;
    this.player = new Player();
    this.oscillatorGain = new Gain(0.7);
    this.oscillatorPulverizer = new BitCrusher(1);
    this.oscillator = new Player();
    this.oscillator2 = new Player();
    this.oscillator3 = new Player();
    this.oscillator4 = new Player();
    this.samples = new ToneAudioBuffers(sampleUrls, () => {
      console.log('noise samples loaded!');
      setLoaded();
      this.loaded = true;
      this.player.connect(this.vibrato);
      this.oscillatorPulverizer.chain(this.oscillatorGain, this.vibrato);
      this.oscillator.connect(this.oscillatorPulverizer);
      this.oscillator2.connect(this.oscillatorPulverizer);
      this.oscillator3.connect(this.oscillatorPulverizer);
      this.oscillator4.connect(this.oscillatorPulverizer);
      this.connect();
    });
    this.nowPlaying = null;
    this.types = {
      ambientNoise: [
        'aluminium',
        'amRadioNoise',
        'analogueWhiteNoise',
        'digitalNoise',
        'heavyStatic',
        'radioBuzz',
        'recordPlayerGlitch',
        'spaceDrone',
        'trumpetHiss',
        'glitch'
      ],
      feedback: [
        'feedback',
        'guitarFeedback',
        'guitarNoise1',
        'guitarNoise2',
        'guitarNoise3',
        'guitarNoise4',
        'micFeedback'
      ],
      skronk: [
        'saxSqueek',
        'saxSkronk',
        'saxSkronk2',
        'saxSkronk3',
        'saxSkronk4',
        'saxSkronk5',
        'saxSkronk6',
        'saxSkronk7'
      ],
      oscillators: ['oscillators']
    };
    this.initialize();
  }
  randomWaveType() {
    const waveTypes = ['sine', 'square', 'triangle', 'sawtooth'];
    return waveTypes[Math.floor(Math.random() * waveTypes.length)];
  }
  getRandomSound() {}
  initialize() {
    Object.keys(this).forEach((key) => {
      if (this[key] instanceof Player) {
        this[key].loop = true;
      }
    });
  }
  setPlaybackRate(data) {
    if (data.x < data.width / 2) {
      this.player.playbackRate = 1 / (data.width / (data.x * 2));
    } else {
      this.player.playbackRate = Math.pow(1 / (data.width / (data.x * 2)), 2.5);
    }
  }

  start(data) {
    this.loaded && this.startLogic(data);
  }
  startLogic(data) {
    this.oscillator.buffer = this.getWave(this.randomWaveType());
    this.oscillator2.buffer = this.getWave(this.randomWaveType());
    this.oscillator3.buffer = this.getWave(this.randomWaveType());
    this.oscillator4.buffer = this.getWave(this.randomWaveType());
    const which = camelCase(data.which);
    const ranNum = Math.floor(Math.random() * this.types[which].length);
    this.nowPlaying = this.types[which][ranNum];

    if (Object.keys(sampleUrls).includes(this.nowPlaying)) {
      this.player.buffer = this.samples.get(this.nowPlaying);
      this.setPlaybackRate(data);
      this.player.start(0, Math.floor(Math.random() * 10));
    } else {
      this.oscillator.start(now());
      this.oscillator2.start(now());
      this.oscillator3.start(now());
      this.oscillator4.start(now());
    }
  }
  stopOscillators() {
    this.oscillator.stop(now());
    this.oscillator2.stop(now());
    this.oscillator3.stop(now());
    this.oscillator4.stop(now());
  }
  stop() {
    this.nowPlaying !== 'oscillators' ? this.player.stop(now()) : this.stopOscillators();
    this.nowPlaying = null;
  }
  play(data) {
    if (data.x <= 0.001) {
      data.x = 0.00101;
    }
    if (data.y <= 0.001) {
      data.y = 0.00101;
    }
    if (Object.keys(sampleUrls).includes(this.nowPlaying)) {
      this.setPlaybackRate(data);
    } else {
      if (data.x < data.width / 2) {
        this.oscillator.playbackRate = data.x / 5000;
        this.oscillator4.playbackRate = data.y * 0.001;
      } else {
        this.oscillator.playbackRate = data.x + data.x * 3;
        this.oscillator4.playbackRate = Math.random() + data.x;
      }
      this.oscillator2.playbackRate = data.y + Math.random() * 0.1;
      this.oscillator3.playbackRate = data.y / 2 / (data.x / 2);
    }
  }
}

function camelCase(string) {
  switch (string) {
    case 'Ambient Noise':
      return 'ambientNoise';
    case 'Skronk':
      return 'skronk';
    case 'Feedback':
      return 'feedback';
    case 'Oscillators':
      return 'oscillators';
    default:
      console.log('huh?');
  }
}

export default Noise;

const sampleUrls = {
  amRadioNoise: amRadioNoise,
  analogueWhiteNoise: analogueWhiteNoise,
  digitalNoise: digitalNoise,
  feedback: feedback,
  guitarFeedback: guitarFeedback,
  guitarNoise1: guitarNoise1,
  guitarNoise2: guitarNoise2,
  guitarNoise3: guitarNoise3,
  guitarNoise4: guitarNoise4,
  heavyStatic: heavyStatic,
  micFeedback: micFeedback,
  radioBuzz: radioBuzz,
  recordPlayerGlitch: recordPlayerGlitch,
  saxSqueek: saxSqueek,
  trumpetHiss: trumpetHiss,
  saxSkronk: saxSkronk,
  saxSkronk2: saxSkronk2,
  saxSkronk3: saxSkronk3,
  saxSkronk4: saxSkronk4,
  saxSkronk5: saxSkronk5,
  saxSkronk6: saxSkronk6,
  saxSkronk7: saxSkronk7,
  saxSkronk8: saxSkronk8,
  saxSkronk9: saxSkronk9,
  saxSkronk10: saxSkronk10,
  saxSkronk11: saxSkronk11,
  saxSkronk12: saxSkronk12,
  saxSkronk13: saxSkronk13,
  saxSkronk14: saxSkronk14,
  aluminium: aluminium,
  spaceDrone: spaceDrone,
  glitch
};
