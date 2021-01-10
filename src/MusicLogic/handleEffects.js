import { getSoundSet } from './instrumentBank';

export default function handleEffects(effects, socketId, instrument) {
  const soundSet = getSoundSet(socketId);
  if (soundSet) {
    soundSet.setEffects(instrument, effects);
  }
}
