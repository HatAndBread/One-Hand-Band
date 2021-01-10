import Keyboard from './Keyboard';

class SoundSet {
  constructor(socketId, effects, settings) {
    this.socketId = socketId;
    this.effects = effects;
    this.settings = settings;
    this.keyboard = new Keyboard();
  }

  setEffects(instrument, effects) {
    const s = this[instrument];
    console.log(effects);
    if (s) {
      Object.keys(effects).forEach((key) => {
        this[key] && this[key].setEffects(effects[key]);
      });
    }
  }
  setSettings(instrument, settings) {
    const s = this[instrument];
    if (s) {
      if (s.envelope && settings.envelope) {
        s.envelope.attack = settings.envelope.attack;
        s.envelope.decay = settings.envelope.decay;
        s.envelope.sustain = settings.envelope.sustain;
        s.envelope.release = settings.envelope.release;
      }
      console.log(settings.volume);
      this[instrument].gain.gain.value = settings.volume;
    }
  }
}

export default SoundSet;
