import { useEffect, useContext } from 'react';
import { Link, Route } from 'react-router-dom';
import { Context } from '../App';
import Noise from '../Components/Instruments/Noise';
import Keyboard from '../Components/Instruments/Keyboard';
import Skronk from '../Components/Instruments/Skronk';
import Theremin from '../Components/Instruments/Theremin';
import Percussion from '../Components/Instruments/Percussion';
import playMusic from '../MusicLogic/playMusic';
import Drone from '../Components/Instruments/Drone';
import socket from '../clientSocketHandler';

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
        <Route path="/instrument/noise" component={Noise}></Route>
        <Route path="/instrument/drone" component={Drone}></Route>
        <Route path="/instrument/percussion" component={Percussion}></Route>
        <Route path="/instrument/keyboard" component={Keyboard}></Route>
        <Route path="/instrument/skronk" component={Skronk}></Route>
        <Route path="/instrument/theremin" component={Theremin}></Route>
      </div>
    </div>
  );
}
