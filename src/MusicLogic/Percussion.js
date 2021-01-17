import Instrument from './Instrument';

import * as Tone from 'tone';
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
    this.loops = [];
    this.beat = 0;
  }
  play(drum, sampleRate) {
    this[drum].playbackRate = sampleRate;
    this[drum].start();
  }
  createLoops() {}
  removeOldLoops() {
    if (this.loops.length) {
      this.loops.forEach((loop) => {
        loop.stop(0);
        loop.cancel();
        loop.dispose();
      });
    }
    this.loops.splice(0, this.loops.length);
  }
  getNoteLength(number, timeSignature) {
    switch (timeSignature / number) {
      case Infinity:
        return 0;
      case 1:
        return '16n';
      case 2:
        return '8n';
      default:
        return timeSignature / number;
    }
  }
  containsNewPlaybackRate(loop) {
    console.log(this[loop.one.drum.drum].playbackRate, loop.one.drum.sampleRate);
    if (this[loop.one.drum.drum].playbackRate !== loop.one.drum.sampleRate) return true;
    if (this[loop.two.drum.drum].playbackRate !== loop.two.drum.sampleRate) return true;
    if (this[loop.three.drum.drum].playbackRate !== loop.three.drum.sampleRate) return true;
    if (this[loop.four.drum.drum].playbackRate !== loop.four.drum.sampleRate) return true;
    return false;
  }
  setLoop(data) {
    Tone.Transport.bpm.value = parseInt(data.bpm, 10);
    Tone.Transport.timeSignature = parseInt(data.timeSignature, 10);
    if (this.containsNewPlaybackRate(data.loop)) {
      this[data.loop.one.drum.drum].playbackRate = data.loop.one.drum.sampleRate;
      this[data.loop.two.drum.drum].playbackRate = data.loop.two.drum.sampleRate;
      this[data.loop.three.drum.drum].playbackRate = data.loop.three.drum.sampleRate;
      this[data.loop.four.drum.drum].playbackRate = data.loop.four.drum.sampleRate;
    } else if (isStopped(data.loop)) {
      Tone.Transport.stop();
      this.beat = 0;
    } else {
      this.removeOldLoops();
      console.log(data.loop);
      this.loops.push(
        new Tone.Loop((time) => {
          data.loop.one.times[this.beat] && this[data.loop.one.drum.drum].start(time);
          data.loop.two.times[this.beat] && this[data.loop.two.drum.drum].start(time);
          data.loop.three.times[this.beat] && this[data.loop.three.drum.drum].start(time);
          data.loop.four.times[this.beat] && this[data.loop.four.drum.drum].start(time);
          this.beat += 1;
          if (this.beat >= Tone.Transport.timeSignature * 4) {
            this.beat = 0;
          }
        }, '16n').start(0)
      );
      Tone.Transport.start();
    }
  }
}

const isStopped = (loop) => {
  for (let i = 0; i < Object.entries(loop).length; i++) {
    if (Object.entries(loop)[i][1].times.includes(1)) {
      return false;
    }
  }
  return true;
};

export default Percussion;
