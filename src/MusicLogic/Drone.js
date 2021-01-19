import * as Tone from 'tone';
import defaultEnvelopeSettings from '../Components/Settings/DefaultEnvelopeSettings';
import Instrument from './Instrument';

class Drone extends Instrument {
  constructor() {
    super();
    this.envelopeOne = new Tone.AmplitudeEnvelope(defaultEnvelopeSettings).connect(this.vibrato);
    this.envelopeTwo = new Tone.AmplitudeEnvelope(defaultEnvelopeSettings).connect(this.vibrato);
    this.envelopeThree = new Tone.AmplitudeEnvelope(defaultEnvelopeSettings).connect(this.vibrato);
    this.droneOne = new Tone.Oscillator().connect(this.envelopeOne).start();
    this.droneTwo = new Tone.Oscillator().connect(this.envelopeTwo).start();
    this.droneThree = new Tone.Oscillator().connect(this.envelopeThree).start();
    this.rampTo = 0;
  }

  play(number) {
    const drone = this[`drone${number}`];
    if (!drone.playing) {
      drone.playing = true;
      this[`envelope${number}`].triggerAttack(Tone.now());
    }
  }
  stop(number) {
    const drone = this[`drone${number}`];
    if (drone.playing) {
      drone.playing = false;
      console.log('turned it off', drone.playing);
      this[`envelope${number}`].triggerRelease(Tone.now());
    }
  }
}

export default Drone;
