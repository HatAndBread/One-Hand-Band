import { Gain, Filter, AmplitudeEnvelope, Player, now } from 'tone';
import defaultEnvelopeSettings from '../Components/Settings/DefaultEnvelopeSettings';
import Instrument from './Instrument';
import { checkIfSoundsLoaded } from './Instrument';
import { setLoaded } from '../App';

class Keyboard extends Instrument {
  constructor() {
    super();
    this.keyboardGain = new Gain(1).connect(this.distortion);
    this.filter = new Filter({
      type: 'lowpass',
      frequency: 700,
      rolloff: -12,
      Q: 1,
      gain: 0
    });
    this.envelope = new AmplitudeEnvelope(defaultEnvelopeSettings);
    this.envelope2 = new AmplitudeEnvelope(defaultEnvelopeSettings);
    this.keyboardPlayer = new Player();
    this.keyboardPlayer2 = new Player();
    this.keyboardPlayer.loop = true;
    this.rampTo = 0;
    this.playing = false;
    this.playing2 = false;
    this.pbr = 1;
    this.wave = 'sine';
    this.setFirstBuffer = setInterval(() => {
      if (checkIfSoundsLoaded()) {
        this.keyboardPlayer.chain(this.envelope, this.filter, this.keyboardGain);
        this.keyboardPlayer2.chain(this.envelope2, this.filter, this.keyboardGain);
        clearInterval(this.setFirstBuffer);
        this.connect();
        setLoaded();
        this.keyboardPlayer.buffer = this.getWave('sine');
        this.keyboardPlayer2.buffer = this.getWave('sine');
        this.keyboardPlayer.start();
        this.keyboardPlayer2.start();
      }
    }, 100);
  }
  play(pbr, buff, second) {
    if (!second) {
      this.playing = true;
      this.keyboardPlayer.buffer = buff;
      restartList.includes(this.wave) && this.keyboardPlayer.restart();
      this.keyboardPlayer.playbackRate = pbr;
      this.envelope.triggerAttack(now());
    } else {
      this.playing2 = true;
      this.keyboardPlayer2.buffer = buff;
      restartList.includes(this.wave) && this.keyboardPlayer2.restart();
      this.keyboardPlayer2.playbackRate = pbr;
      this.envelope2.triggerAttack(now());
    }
  }
  stop(second) {
    if (!second) {
      this.playing = false;
      this.envelope.triggerRelease(now());
    } else {
      this.playing2 = false;
      this.envelope2.triggerRelease(now());
    }
  }
}

const restartList = [
  'piano',
  'gamelan',
  'gamelan2',
  'gamelan3',
  'kalimba',
  'oud',
  'trumpet',
  'ruler',
  'spring',
  'swell'
];

export default Keyboard;
