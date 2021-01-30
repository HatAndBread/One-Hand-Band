import * as Tone from 'tone';
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
  saxSkronk14: saxSkronk14
};

class Noise extends Instrument {
  constructor() {
    super();
    this.loaded = false;
    this.player = new Tone.Player();
    this.samples = new Tone.ToneAudioBuffers(sampleUrls, () => {
      console.log('noise samples loaded!');
      this.loaded = true;
      this.player.connect(this.vibrato);
    });
    this.oscillatorGain = new Tone.Gain(0.3).connect(this.vibrato);
    this.oscillatorPulverizer = new Tone.BitCrusher(1).connect(this.oscillatorGain);
    this.sine = new Tone.AmplitudeEnvelope().connect(this.oscillatorPulverizer);
    this.oscillator = new Tone.Oscillator().connect(this.sine).start();
    this.oscillator2 = new Tone.Oscillator().connect(this.sine).start();
    this.oscillator3 = new Tone.Oscillator().connect(this.sine).start();
    this.oscillator4 = new Tone.Oscillator().connect(this.sine).start();
    this.nowPlaying = null;
    this.animationFrame = false;
    this.types = {
      ambientNoise: [
        'amRadioNoise',
        'analogueWhiteNoise',
        'digitalNoise',
        'heavyStatic',
        'radioBuzz',
        'recordPlayerGlitch',
        'trumpetHiss'
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
      oscillators: ['sine']
    };
    this.initialize();
  }
  getRandomSound() {}
  initialize() {
    Object.keys(this).forEach((key) => {
      if (this[key] instanceof Tone.Player) {
        this[key].loop = true;
        this[key].volume.value = -16;
      }
      if (this[key] instanceof Tone.Oscillator) {
        this[key].volume.value = -1;
      }
    });
  }

  start(data) {
    this.loaded && this.startLogic(data);
  }
  startLogic(data) {
    const which = camelCase(data.which);
    const ranNum = Math.floor(Math.random() * this.types[which].length);
    this.nowPlaying = this.types[which][ranNum];

    if (Object.keys(sampleUrls).includes(this.nowPlaying)) {
      this.player.buffer = this.samples.get(this.nowPlaying);
      console.log(data.x);
      data.x < data.width / 2
        ? (this.player.playbackRate = data.x * 0.01)
        : (this.player.playbackRate = data.x * 0.01 * (data.x * 0.01));
      this.player.start(0, Math.floor(Math.random() * 10));
    } else {
      this[this.nowPlaying].triggerAttack(Tone.now());
      const updateLoop = () => {
        let ranNum = Math.floor(Math.random() * 5);
        const minus = this.oscillator4.frequency.value - 100;
        const decider = Math.floor(Math.random() * 2);
        let increaseNum;
        if (decider && minus > 0) {
          increaseNum = Math.random() * -10;
        } else {
          increaseNum = Math.random() * 10;
        }
        if (!ranNum) {
          this.oscillator4.frequency.value += increaseNum;
        }
        this.animationFrame && window.requestAnimationFrame(updateLoop);
      };
      this.animationFrame = true;
      updateLoop();
    }
  }
  stop() {
    this[this.nowPlaying] ? this[this.nowPlaying].triggerRelease(Tone.now()) : this.player.stop(0);
    this.nowPlaying = null;
    this.animationFrame = false;
  }
  play(data) {
    if (data.x <= 0.001) {
      data.x = 0.00101;
    }
    if (data.y <= 0.001) {
      data.y = 0.00101;
    }
    if (Object.keys(sampleUrls).includes(this.nowPlaying)) {
      console.log(data.x);
      data.x < data.width / 2
        ? (this.player.playbackRate = data.x * 0.01)
        : (this.player.playbackRate = data.x * 0.01 * (data.x * 0.01));
    } else {
      if (data.x < data.width / 2) {
        this.oscillator.frequency.value = data.x * -10 * (data.x * -10);
        this.oscillator4.frequency.value = Math.random() * data.x;
      } else {
        this.oscillator.frequency.value = data.x * 10 * (data.x * 10);
        this.oscillator4.frequency.value = Math.random() * data.x;
      }
      this.oscillator2.frequency.value = data.y * 5 + Math.random() * 10;
      this.oscillator3.frequency.value = ((data.y / 2) * data.x) / 2;
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

// Tone.Offline(() => {
//   // only nodes created in this callback will be recorded
//   const oscillator = new Tone.Oscillator().toDestination().start(0);
// }, 0.1).then((buffer) => {
//   // do something with the output buffer
//   const p = new Tone.Player().toDestination();
//   p.loop = true;
//   p.buffer = buffer;
//   p.start(1);
//   console.log('Yo, this is the buffer', buffer);
// });
