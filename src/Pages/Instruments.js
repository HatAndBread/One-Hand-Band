import { Link, Route } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../App';
import InstrumentTemplate from '../Components/Instruments/InstrumentTemplate';
import '../Styles/Components/Instruments.css';

const onStyle = { boxShadow: '0 0 10px 5px #9d8df1', backgroundColor: '#9d8df1', borderRadius: '50%' };
export default function Instruments() {
  const myInstrument = useContext(Context).myInstrument;

  return (
    <div>
      <div>
        <div className="instrument-links">
          <Link to="/instrument/keyboard" style={myInstrument && myInstrument.instrument === 'keyboard' ? onStyle : {}}>
            🎹
          </Link>
          <Link
            to="/instrument/percussion"
            style={myInstrument && myInstrument.instrument === 'percussion' ? onStyle : {}}
          >
            🥁
          </Link>
          <Link to="/instrument/drone" style={myInstrument && myInstrument.instrument === 'drone' ? onStyle : {}}>
            🦥
          </Link>
          <Link to="/instrument/noise" style={myInstrument && myInstrument.instrument === 'noise' ? onStyle : {}}>
            🙉
          </Link>
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
