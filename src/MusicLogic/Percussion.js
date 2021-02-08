import Instrument from './Instrument';
import { Player, ToneAudioBuffers, Transport, Context, Loop, Time } from 'tone';
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

let cb;

let mount = false;

export const getCurrentBeat = (arg, stupidSafari, mounted) => {
  if (typeof arg === 'number' || arg === 0) {
    if (cb) {
      if (stupidSafari) {
        Transport.schedule(() => {
          mount && cb(arg);
        }, Context.lookAhead);
      } else {
        mount && cb(arg);
      }
    }
  } else {
    mount = mounted;
    cb = arg;
  }
};

class Percussion extends Instrument {
  constructor() {
    super();
    this.loaded = false;
    this.one = new Player();
    this.two = new Player();
    this.three = new Player();
    this.four = new Player();
    this.five = new Player();
    this.six = new Player();
    this.oneSingle = new Player();
    this.twoSingle = new Player();
    this.threeSingle = new Player();
    this.fourSingle = new Player();
    this.fiveSingle = new Player();
    this.sixSingle = new Player();

    this.samples = new ToneAudioBuffers(sampleUrls, () => {
      setLoaded();
      this.loaded = true;
      this.one.connect(this.distortion);
      this.two.connect(this.distortion);
      this.three.connect(this.distortion);
      this.four.connect(this.distortion);
      this.five.connect(this.distortion);
      this.six.connect(this.distortion);
      this.oneSingle.connect(this.distortion);
      this.twoSingle.connect(this.distortion);
      this.threeSingle.connect(this.distortion);
      this.fourSingle.connect(this.distortion);
      this.fiveSingle.connect(this.distortion);
      this.sixSingle.connect(this.distortion);
      this.connect();
    });
    this.loop = new Loop((time) => {}, '16n');
    this.beat = 0;
    getCurrentBeat(this.beat);
    this.drumsNums = ['one', 'two', 'three', 'four', 'five', 'six'];
  }
  startMachine() {
    this.loop.start(Time('16n'));
  }
  stopMachine() {
    this.beat = 0;
    getCurrentBeat(this.beat);
    this.loop.stop(0);
  }
  updateMachine(data) {
    if (this.loaded) {
      this.updateBpmAndTimeSignature(data);
      if (this.playbackRateHasChanged(data)) {
        this.drumsNums.forEach((num) => {
          this[num].playbackRate = data.loop[num].drum.sampleRate;
        });
      }
    }
    const callback = (time) => {
      if (this.beat >= Transport.timeSignature * 4) {
        this.beat = 0;
        getCurrentBeat(this.beat);
      }
      this.drumsNums.forEach((num) => {
        if (data.loop[num].times[this.beat]) {
          this[num].playbackRate = data.loop[num].drum.sampleRate;
          this[num].buffer = this.samples.get(data.loop[num].drum.drum);
          this[num].start(time);
        }
      });
      this.beat += 1;
      getCurrentBeat(this.beat);
    };
    this.loop.callback = callback;
  }
  play(drum, sampleRate, number) {
    if (this.loaded) {
      this[`${number}Single`].buffer = this.samples.get(drum);
      this[`${number}Single`].playbackRate = sampleRate;
      this[`${number}Single`].start();
    }
  }
  playbackRateHasChanged(data) {
    for (let i = 0; i < this.drumsNums.length; i++) {
      if (this[this.drumsNums[i]].playbackRate !== data.loop[this.drumsNums[i]].drum.sampleRate) return true;
    }
    return false;
  }
  updateBpmAndTimeSignature(data) {
    if (Transport.bpm.value !== parseInt(data.bpm, 10)) {
      Transport.bpm.value = parseInt(data.bpm, 10);
    }
    if (Transport.timeSignature !== parseInt(data.timeSignature, 10)) {
      Transport.timeSignature = parseInt(data.timeSignature, 10);
    }
  }
}

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
