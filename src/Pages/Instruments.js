import { Link, Route } from 'react-router-dom';
import InstrumentTemplate from '../Components/Instruments/InstrumentTemplate';
import '../Styles/Components/Instruments.css';

export default function Instruments() {
  return (
    <div>
      <div>
        <div className="instrument-links">
          <Link to="/instrument/keyboard">🎹</Link>
          <Link to="/instrument/percussion">🥁</Link>
          <Link to="/instrument/drone">🦥</Link>
          <Link to="/instrument/noise">🙉</Link>
        </div>
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
