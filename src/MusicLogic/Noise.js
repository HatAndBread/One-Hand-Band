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
    this.nowPlaying = null;
    this.types = {
      ambientNoise: [
        'amRadioNoise',
        'analogueWhiteNoise',
        'digitalNoise',
        'heavyStatic',
        'radioBuzz',
        'recordPlayerGlitch'
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
      skronk: ['saxSqueek', 'trumpetHiss']
    };
    this.initialize();
  }
  getRandomSound(type) {}
  initialize() {
    Object.keys(this).forEach((key) => {
      if (this[key] instanceof Tone.Player) {
        this[key].loop = true;
      }
    });
  }

  start(data) {
    const which = camelCase(data.which);
    const ranNum = Math.floor(Math.random() * this.types[which].length);
    this.nowPlaying = this.types[which][ranNum];
    this[this.nowPlaying].start(0);
  }
  stop(data) {
    this[this.nowPlaying].stop(0);
    this.nowPlaying = null;
  }
  play(data) {
    console.log(data);
    if (data.x <= 0.001) {
      data.x = 0.00101;
    }
    this[this.nowPlaying].playbackRate = data.x * 0.005;
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
