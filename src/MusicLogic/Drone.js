import * as Tone from 'tone';
import defaultEnvelopeSettings from '../Components/Settings/DefaultEnvelopeSettings';
import Instrument from './Instrument';

class Drone extends Instrument {
  constructor() {
    super();
    this.envelopeOne = new Tone.AmplitudeEnvelope(defaultEnvelopeSettings).connect(this.vibrato);
    this.envelopeTwo = new Tone.AmplitudeEnvelope(defaultEnvelopeSettings).connect(this.vibrato);
    this.envelopeThree = new Tone.AmplitudeEnvelope(defaultEnvelopeSettings).connect(this.vibrato);
    this.droneOne = new Tone.Oscillator().connect(this.envelopeOne);
    this.droneTwo = new Tone.Oscillator().connect(this.envelopeTwo);
    this.droneThree = new Tone.Oscillator().connect(this.envelopeThree);
    this.rampTo = 0;
  }

  play(number) {
    const drone = this[`drone${number}`];
    if (!drone.playing) {
      drone.start(Tone.now());
      drone.playing = true;
      this[`envelope${number}`].triggerAttack(Tone.now());
    }
  }
  stop(number) {
    const drone = this[`drone${number}`];
    const envelo = this[`envelope${number}`];
    if (drone.playing) {
      drone.playing = false;
      drone.stop(`+${envelo.release}`);
      envelo.triggerRelease(Tone.now());
    }
  }
}

export default Drone;
