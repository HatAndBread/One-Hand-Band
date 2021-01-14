import Instrument from './Instrument';

import * as Tone from 'tone';
import { percussionTypes } from '../Components/Instruments/Percussion';
import snare from '../assets/snare.mp3';
import kick from '../assets/kick.mp3';
import ride from '../assets/ride.mp3';
import hat from '../assets/hat.mp3';
import tom from '../assets/tom.mp3';
import bowl from '../assets/bowl.mp3';
import bugara1 from '../assets/bugara1.mp3';
import bugara2 from '../assets/bugara2.mp3';
import ceng from '../assets/ceng.mp3';
import demung1 from '../assets/demung1.mp3';
import demung2 from '../assets/demung2.mp3';
import demung3 from '../assets/demung3.mp3';
import djembe1 from '../assets/djembe1.mp3';
import djembe2 from '../assets/djembe2.mp3';
import djembe3 from '../assets/djembe3.mp3';
import jegog from '../assets/jegog.mp3';
import kantilan from '../assets/kantilan.mp3';
import kempur from '../assets/kempur.mp3';
import rebana from '../assets/rebana.mp3';

class Percussion extends Instrument {
  constructor() {
    super();
    this.snare = new Tone.Player(snare).connect(this.vibrato);
    this.kick = new Tone.Player(kick).connect(this.vibrato);
    this.ride = new Tone.Player(ride).connect(this.vibrato);
    this.hat = new Tone.Player(hat).connect(this.vibrato);
    this.tom = new Tone.Player(tom).connect(this.vibrato);
    this.bowl = new Tone.Player(bowl).connect(this.vibrato);
    this.bugara1 = new Tone.Player(bugara1).connect(this.vibrato);
    this.bugara2 = new Tone.Player(bugara2).connect(this.vibrato);
    this.ceng = new Tone.Player(ceng).connect(this.vibrato);
    this.demung1 = new Tone.Player(demung1).connect(this.vibrato);
    this.demung2 = new Tone.Player(demung2).connect(this.vibrato);
    this.demung3 = new Tone.Player(demung3).connect(this.vibrato);
    this.djembe1 = new Tone.Player(djembe1).connect(this.vibrato);
    this.djembe2 = new Tone.Player(djembe2).connect(this.vibrato);
    this.djembe3 = new Tone.Player(djembe3).connect(this.vibrato);
    this.jegog = new Tone.Player(jegog).connect(this.vibrato);
    this.kantilan = new Tone.Player(kantilan).connect(this.vibrato);
    this.kempur = new Tone.Player(kempur).connect(this.vibrato);
    this.rebana = new Tone.Player(rebana).connect(this.vibrato);
  }
  play(drum, sampleRate) {
    this[drum].playbackRate = sampleRate;
    this[drum].start();
  }
}

export default Percussion;
