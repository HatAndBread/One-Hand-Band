import { Gain, Filter, AmplitudeEnvelope, Player, now, Offline, Distortion, BitCrusher } from 'tone';
import defaultEnvelopeSettings from '../Components/Settings/DefaultEnvelopeSettings';
import Instrument from './Instrument';
import { checkIfSoundsLoaded } from './Instrument';
import { setLoaded } from '../App';

class Keyboard extends Instrument {
  constructor() {
    super();
    this.keyboardGain = new Gain(1).connect(this.vibrato);
    this.filter = new Filter({
      type: 'lowpass',
      frequency: 700,
      rolloff: -12,
      Q: 1,
      gain: 0
    });
    this.envelope = new AmplitudeEnvelope(defaultEnvelopeSettings);
    this.keyboardPlayer = new Player();
    this.keyboardPlayer.loop = true;
    this.rampTo = 0;
    this.playing = false;
    this.pbr = 1;
    this.wave = 'sine';
    this.setFirstBuffer = setInterval(() => {
      if (checkIfSoundsLoaded()) {
        this.keyboardPlayer.chain(this.envelope, this.filter, this.keyboardGain);
        clearInterval(this.setFirstBuffer);
        this.connect();
        setLoaded();
        this.keyboardPlayer.buffer = this.getWave('sine');
        this.keyboardPlayer.start();
      }
    }, 100);
  }

  play(pbr, buff) {
    this.playing = true;
    this.keyboardPlayer.buffer = buff;
    this.keyboardPlayer.playbackRate = pbr;
    this.envelope.triggerAttack(now());
  }

  // play(pbr, buff) {
  //   this.playing = true;
  //   this.envelope.triggerRelease(now());
  //   Offline(() => {
  //     const p = new Player();
  //     const dist = new Distortion(this.distortionLevel).toDestination();
  //     dist.wet.value = this.distortionWet;
  //     p.connect(dist);
  //     p.buffer = buff;
  //     p.playbackRate = pbr;
  //     p.start(0);
  //   }, buff.duration / pbr).then((buffer) => {
  //     this.keyboardPlayer.dispose();
  //     this.keyboardPlayer = new Player().connect(this.envelope);
  //     this.keyboardPlayer.buffer = buffer;
  //     this.keyboardPlayer.start(now());
  //     this.envelope.triggerAttack(now());
  //   });
  // }
  stop() {
    this.playing = false;
    this.envelope.triggerRelease(now());
  }
}

export default Keyboard;
