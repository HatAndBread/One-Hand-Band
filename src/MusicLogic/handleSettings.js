import { getSoundSet } from './instrumentBank';

export default function handleSettings(settings, socketId, instrument) {
  const soundSet = getSoundSet(socketId);
  if (soundSet) {
    soundSet.setSettings(instrument, settings);
  }
  console.log(soundSet);
}
