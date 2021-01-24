import { Link, Route } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Context } from '../App';
import InstrumentTemplate from '../Components/Instruments/InstrumentTemplate';
import '../Styles/Components/Instruments.css';

const onStyle = { boxShadow: '0 0 10px 5px #9d8df1', borderRadius: '50%', paddingLeft: '10px', paddingRight: '10px' };
export default function Instruments() {
  const [keyboardStyle, setKeyboardStyle] = useState(undefined);
  const [percStyle, setPercStyle] = useState(undefined);
  const [droneStyle, setDroneStyle] = useState(undefined);
  const [noiseStyle, setNoiseStyle] = useState(undefined);
  const myInstrument = useContext(Context).myInstrument;
  const highlight = (e) => {
    switch (e.target.innerText) {
      case '🎹':
        setKeyboardStyle(onStyle);
        setPercStyle(null);
        setDroneStyle(null);
        setNoiseStyle(null);
        break;
      case '🥁':
        setPercStyle(onStyle);
        setKeyboardStyle(null);
        setDroneStyle(null);
        setNoiseStyle(null);
        break;
      case '🦥':
        setDroneStyle(onStyle);
        setPercStyle(null);
        setKeyboardStyle(null);
        setNoiseStyle(null);
        break;
      case '🙉':
        setNoiseStyle(onStyle);
        setPercStyle(null);
        setDroneStyle(null);
        setKeyboardStyle(null);
        break;
      default:
        console.log('hi');
    }
  };
  return (
    <div>
      <div>
        <div className="instrument-links">
          <Link to="/instrument/keyboard" onClick={highlight} style={keyboardStyle}>
            🎹
          </Link>
          <Link to="/instrument/percussion" onClick={highlight} style={percStyle}>
            🥁
          </Link>
          <Link to="/instrument/drone" onClick={highlight} style={droneStyle}>
            🦥
          </Link>
          <Link to="/instrument/noise" onClick={highlight} style={noiseStyle}>
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
