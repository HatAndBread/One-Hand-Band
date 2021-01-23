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
import ruler from '../assets/ruler.mp3';
import spring from '../assets/spring.mp3';

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
    this.spring = new Tone.Player(spring).connect(this.vibrato);
    this.ruler = new Tone.Player(ruler).connect(this.vibrato);
    this.loop = new Tone.Loop((time) => {}, '16n').start(0);
    this.beat = 0;
    this.drumsNums = ['one', 'two', 'three', 'four', 'five', 'six'];
  }
  play(drum, sampleRate) {
    this[drum].playbackRate = sampleRate;
    this[drum].start();
  }
  playbackRateHasChanged(data) {
    for (let i = 0; i < this.drumsNums.length; i++) {
      if (this[data.loop[this.drumsNums[i]].drum.drum].playbackRate !== data.loop[this.drumsNums[i]].drum.sampleRate)
        return true;
    }
    return false;
  }
  updateBpmAndTimeSignature(data) {
    if (Tone.Transport.bpm.value !== parseInt(data.bpm, 10)) {
      Tone.Transport.bpm.value = parseInt(data.bpm, 10);
    }
    if (Tone.Transport.timeSignature !== parseInt(data.timeSignature, 10)) {
      Tone.Transport.timeSignature = parseInt(data.timeSignature, 10);
    }
  }
  setLoop(data) {
    this.updateBpmAndTimeSignature(data);
    if (this.playbackRateHasChanged(data)) {
      this.drumsNums.forEach((num) => {
        this[data.loop[num].drum.drum].playbackRate = data.loop[num].drum.sampleRate;
      });
    }
    if (isStopped(data.loop)) {
      Tone.Transport.stop();
      this.beat = 0;
    } else {
      const callback = (time) => {
        this.drumsNums.forEach((num) => {
          if (data.loop[num].times[this.beat]) {
            this[data.loop[num].drum.drum].playbackRate = data.loop[num].drum.sampleRate;
            this[data.loop[num].drum.drum].start(time);
          }
        });
        this.beat += 1;
        if (this.beat >= Tone.Transport.timeSignature * 4) {
          this.beat = 0;
        }
      };
      this.loop.callback = callback;
      Tone.Transport.state === 'stopped' && Tone.Transport.start();
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
