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

class Noise extends Instrument {
  constructor() {
    super();
    this.amRadioNoise = new Tone.Player(amRadioNoise).connect(this.vibrato);
    this.analogueWhiteNoise = new Tone.Player(analogueWhiteNoise).connect(this.vibrato);
    this.digitalNoise = new Tone.Player(digitalNoise).connect(this.vibrato);
    this.feedback = new Tone.Player(feedback).connect(this.vibrato);
    this.guitarFeedback = new Tone.Player(guitarFeedback).connect(this.vibrato);
    this.guitarNoise1 = new Tone.Player(guitarNoise1).connect(this.vibrato);
    this.guitarNoise2 = new Tone.Player(guitarNoise2).connect(this.vibrato);
    this.guitarNoise3 = new Tone.Player(guitarNoise3).connect(this.vibrato);
    this.guitarNoise4 = new Tone.Player(guitarNoise4).connect(this.vibrato);
    this.heavyStatic = new Tone.Player(heavyStatic).connect(this.vibrato);
    this.micFeedback = new Tone.Player(micFeedback).connect(this.vibrato);
    this.radioBuzz = new Tone.Player(radioBuzz).connect(this.vibrato);
    this.recordPlayerGlitch = new Tone.Player(recordPlayerGlitch).connect(this.vibrato);
    this.saxSqueek = new Tone.Player(saxSqueek).connect(this.vibrato);
    this.trumpetHiss = new Tone.Player(trumpetHiss).connect(this.vibrato);
    this.saxSkronk = new Tone.Player(saxSkronk).connect(this.vibrato);
    this.saxSkronk2 = new Tone.Player(saxSkronk2).connect(this.vibrato);
    this.saxSkronk3 = new Tone.Player(saxSkronk3).connect(this.vibrato);
    this.saxSkronk4 = new Tone.Player(saxSkronk4).connect(this.vibrato);
    this.saxSkronk5 = new Tone.Player(saxSkronk5).connect(this.vibrato);
    this.saxSkronk6 = new Tone.Player(saxSkronk6).connect(this.vibrato);
    this.saxSkronk7 = new Tone.Player(saxSkronk7).connect(this.vibrato);
    this.saxSkronk8 = new Tone.Player(saxSkronk8).connect(this.vibrato);
    this.saxSkronk9 = new Tone.Player(saxSkronk9).connect(this.vibrato);
    this.saxSkronk10 = new Tone.Player(saxSkronk10).connect(this.vibrato);
    this.saxSkronk11 = new Tone.Player(saxSkronk11).connect(this.vibrato);
    this.saxSkronk12 = new Tone.Player(saxSkronk12).connect(this.vibrato);
    this.saxSkronk13 = new Tone.Player(saxSkronk13).connect(this.vibrato);
    this.saxSkronk14 = new Tone.Player(saxSkronk14).connect(this.vibrato);
    this.pink = new Tone.Noise('pink').connect(this.vibrato);
    this.white = new Tone.Noise('white').connect(this.vibrato);
    this.brown = new Tone.Noise('brown').connect(this.vibrato);
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
        'pink',
        'brown',
        'white',
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
  getRandomSound(type) {}
  initialize() {
    Object.keys(this).forEach((key) => {
      if (this[key] instanceof Tone.Player) {
        this[key].loop = true;
      }
      if (this[key] instanceof Tone.Oscillator) {
        this[key].volume.value = -6;
      }
    });
  }

  start(data) {
    const which = camelCase(data.which);
    const ranNum = Math.floor(Math.random() * this.types[which].length);
    this.nowPlaying = this.types[which][ranNum];
    if (this[this.nowPlaying].start) {
      this[this.nowPlaying].start(0, Math.floor(Math.random() * 10));
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
  stop(data) {
    this[this.nowPlaying].stop ? this[this.nowPlaying].stop(0) : this[this.nowPlaying].triggerRelease(Tone.now());
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
    if (this[this.nowPlaying] && this[this.nowPlaying].playbackRate) {
      this[this.nowPlaying].playbackRate = data.x * 0.005;
    } else {
      this.oscillator.frequency.value = data.x * 10;
      this.oscillator2.frequency.value = data.y * 5 + Math.random() * 10;
      this.oscillator3.frequency.value = ((data.y / 2) * data.x) / 2;
      this.oscillator4.frequency.value = Math.random() * data.x;
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
