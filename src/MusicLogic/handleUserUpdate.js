import * as Tone from 'tone';
import instrumentBank from './instrumentBank';

export default function handleUserUpdate(users) {
  instrumentBank.forEach((instrument) => instrument.instrument.disconnect());
  instrumentBank.forEach((instrument) => instrument.instrument.dispose());
  instrumentBank.splice(0, instrumentBank.length);
  users.forEach((user) => {
    console.log(user);
    instrumentBank.push({ user: user.socketId, instrument: new Tone.Synth().toDestination() });
  });
  console.log('INSTRUMENT BANK');
  console.log(instrumentBank);
}
