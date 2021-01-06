const instrumentBank = [];
export default instrumentBank;

export function getMyInstrument(socketId) {
  for (let i = 0; i < instrumentBank.length; i++) {
    if (instrumentBank[i].user === socketId) {
      return instrumentBank[i].instrument;
    }
  }
}
