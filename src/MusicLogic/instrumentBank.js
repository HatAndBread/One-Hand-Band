const instrumentBank = [];
export default instrumentBank;

export function getMyInstrument(socketId, instrument) {
  for (let i = 0; i < instrumentBank.length; i++) {
    if (instrumentBank[i].socketId === socketId) {
      return instrumentBank[i][instrument];
    }
  }
}

export function getSoundSet(socketId) {
  for (let i = 0; i < instrumentBank.length; i++) {
    if (instrumentBank[i].socketId === socketId) {
      return instrumentBank[i];
    }
  }
}
