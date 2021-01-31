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
import { setLoaded } from '../App';

class Percussion extends Instrument {
  constructor() {
    super();
    this.loaded = false;
    this.one = new Tone.Player();
    this.two = new Tone.Player();
    this.three = new Tone.Player();
    this.four = new Tone.Player();
    this.five = new Tone.Player();
    this.six = new Tone.Player();
    this.samples = new Tone.ToneAudioBuffers(sampleUrls, () => {
      console.log('percussion samples loaded!');
      setLoaded();
      this.loaded = true;
      this.one.connect(this.vibrato);
      this.two.connect(this.vibrato);
      this.three.connect(this.vibrato);
      this.four.connect(this.vibrato);
      this.five.connect(this.vibrato);
      this.six.connect(this.vibrato);
    });
    this.loop = new Tone.Loop((time) => {}, '16n').start(0);
    this.beat = 0;
    this.drumsNums = ['one', 'two', 'three', 'four', 'five', 'six'];
  }
  play(drum, sampleRate, number) {
    if (this.loaded) {
      this[number].buffer = this.samples.get(drum);
      this[number].playbackRate = sampleRate;
      this[number].start();
    }
  }
  playbackRateHasChanged(data) {
    for (let i = 0; i < this.drumsNums.length; i++) {
      if (this[this.drumsNums[i]].playbackRate !== data.loop[this.drumsNums[i]].drum.sampleRate) return true;
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
    console.log(data);
    if (this.loaded) {
      this.updateBpmAndTimeSignature(data);
      if (this.playbackRateHasChanged(data)) {
        this.drumsNums.forEach((num) => {
          this[num].playbackRate = data.loop[num].drum.sampleRate;
        });
      }
      if (isStopped(data.loop)) {
        Tone.Transport.stop();
        this.beat = 0;
      } else {
        const callback = (time) => {
          this.drumsNums.forEach((num) => {
            if (data.loop[num].times[this.beat]) {
              this[num].playbackRate = data.loop[num].drum.sampleRate;
              this[num].buffer = this.samples.get(data.loop[num].drum.drum);
              this[num].start(time);
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
}

const isStopped = (loop) => {
  for (let i = 0; i < Object.entries(loop).length; i++) {
    if (Object.entries(loop)[i][1].times.includes(1)) {
      return false;
    }
  }
  return true;
};

const sampleUrls = {
  snare,
  kick,
  ride,
  hat,
  tom,
  bowl,
  bugara1,
  bugara2,
  ceng,
  demung1,
  demung2,
  demung3,
  djembe1,
  djembe2,
  djembe3,
  jegog,
  kantilan,
  kempur,
  rebana,
  ruler,
  spring
};

export default Percussion;
