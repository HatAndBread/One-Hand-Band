import { useEffect, useContext } from 'react';
import { Link, Route } from 'react-router-dom';
import { Context } from '../App';
import Noise from '../Components/Instruments/Noise';
import Keyboard from '../Components/Instruments/Keyboard';
import Skronk from '../Components/Instruments/Skronk';
import Theremin from '../Components/Instruments/Theremin';
import Percussion from '../Components/Instruments/Percussion';
import playMusic from '../MusicLogic/playMusic';
import socket from '../clientSocketHandler';

export default function Instrument() {
  const context = useContext(Context);
  useEffect(() => {
    socket.on('update', playMusic);
  }, []);

  useEffect(() => {
    console.log('music data changed');
    playMusic(context.musicData);
  }, [context.musicData]);

  return (
    <div>
      <div>
        <div>Select your instrument</div>
        <Link to="/instrument/noise">Noise</Link>
        <Link to="/instrument/skronk">Skronk</Link>
        <Link to="/instrument/theremin">Theremin</Link>
        <Link to="/instrument/percussion">Percussion</Link>
        <Link to="/instrument/keyboard">Keyboard</Link>
        <Route path="/instrument/noise" component={Noise}></Route>
        <Route path="/instrument/percussion" component={Percussion}></Route>
        <Route path="/instrument/keyboard" component={Keyboard}></Route>
        <Route path="/instrument/skronk" component={Skronk}></Route>
        <Route path="/instrument/theremin" component={Theremin}></Route>
      </div>
    </div>
  );
}
