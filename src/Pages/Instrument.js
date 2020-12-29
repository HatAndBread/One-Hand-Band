import { Link, Route } from 'react-router-dom';
import Noise from '../Components/Instruments/Noise';
import Keyboard from '../Components/Instruments/Keyboard';
import Skronk from '../Components/Instruments/Skronk';
import Theremin from '../Components/Instruments/Theremin';
import Percussion from '../Components/Instruments/Percussion';

export default function Instrument() {
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
