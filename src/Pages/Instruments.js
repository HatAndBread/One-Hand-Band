import { Link, Route } from 'react-router-dom';
import InstrumentTemplate from '../Components/Instruments/InstrumentTemplate';

export default function Instruments() {
  return (
    <div>
      <div>
        <div>Select your instrument</div>
        <Link to="/instrument/noise">Noise</Link>
        <Link to="/instrument/drone">Drone</Link>
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
      </div>
    </div>
  );
}
