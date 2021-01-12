import { getSoundSet } from './instrumentBank';
import socket from '../clientSocketHandler';

export default function handleEffects(effects, socketId, instrument, sessionPin, fromAnotherUser) {
  const soundSet = getSoundSet(socketId);
  if (sessionPin === undefined) {
    throw new Error('missing sessionPin');
  } else {
    console.log(sessionPin);
  }

  if (sessionPin && !fromAnotherUser) {
    socket.emit('effectsChange', effects, socketId, instrument, sessionPin);
  }
  if (soundSet) {
    soundSet.setEffects(instrument, effects);
  }
}
