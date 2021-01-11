import { getSoundSet } from './instrumentBank';

export default function handleSettings(settings, socketId, instrument) {
  const soundSet = getSoundSet(socketId);
  console.log('hey there');
  if (soundSet) {
    soundSet.setSettings(instrument, settings);
  }
  console.log(soundSet);
}
