import { getSoundSet } from './instrumentBank';
import socket from '../clientSocketHandler';

export default function handleSettings(settings, socketId, instrument, sessionPin, fromAnotherUser) {
  const soundSet = getSoundSet(socketId);

  if (sessionPin === undefined) {
    throw new Error('missing sessionPin');
  } else {
    console.log(sessionPin);
  }
  if (sessionPin && !fromAnotherUser) {
    socket.emit('settingsChange', settings, socketId, instrument, sessionPin);
  }
  if (soundSet) {
    soundSet.setSettings(instrument, settings);
  }
  console.log(soundSet);
}
