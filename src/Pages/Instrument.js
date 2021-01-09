import { useEffect, useContext } from 'react';
import { Link, Route } from 'react-router-dom';
import { Context } from '../App';
import playMusic from '../MusicLogic/playMusic';
import socket from '../clientSocketHandler';
import InstrumentTemplate from '../Components/Instruments/InstrumentTemplate';

export default function Instrument() {
  const context = useContext(Context);
  const handleSocketMusic = (musicData, user) => {
    console.log(musicData);
    console.log(user);
    playMusic(musicData);
  };
  useEffect(() => {
    socket.on('musicData', handleSocketMusic);
    return () => {
      socket.removeAllListeners('musicData', handleSocketMusic);
    };
  }, []);

  useEffect(() => {
    if (context.sessionPin) {
      if (context.musicData) {
        socket.emit('musicData', context.musicData, context.sessionPin, context.userName);
        context.setMusicData(null);
      }
    } else {
      if (context.musicData) {
        playMusic(context.musicData);
        context.setMusicData(null);
      }
    }
  }, [context]);

  useEffect(() => {
    playMusic({ data: 'userUpdate', users: context.users.users });
  }, [context.users]);

  return (
    <div>
      <div>
        <div>Select your instrument</div>
        <Link to="/instrument/noise">Noise</Link>
        <Link to="/instrument/drone">Drone</Link>
        <Link to="/instrument/skronk">Skronk</Link>
        <Link to="/instrument/theremin">Theremin</Link>
        <Link to="/instrument/percussion">Percussion</Link>
        <Link to="/instrument/keyboard">Keyboard</Link>
        <Route path="/instrument/noise">
          <InstrumentTemplate instrument={'noise'} />
        </Route>
        <Route path="/instrument/drone">
          <InstrumentTemplate instrument={'drone'} />
        </Route>
        <Route path="/instrument/percussion">
          <InstrumentTemplate instrument={'percussion'} />
        </Route>
        <Route path="/instrument/keyboard">
          <InstrumentTemplate instrument={'keyboard'} />
        </Route>
        <Route path="/instrument/skronk">
          <InstrumentTemplate instrument={'skronk'} />
        </Route>
        <Route path="/instrument/theremin">
          <InstrumentTemplate instrument={'theremin'} />
        </Route>
      </div>
    </div>
  );
}
