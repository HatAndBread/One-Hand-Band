import { Link, Route } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../App';
import InstrumentTemplate from '../Components/Instruments/InstrumentTemplate';
import '../Styles/Components/Instruments.css';

const takenInstrumentsPrototype = {
  keyboard: null,
  percussion: null,
  drone: null,
  noise: null
};
const onStyle = { boxShadow: '0 0 10px 5px #9d8df1', backgroundColor: '#9d8df1', borderRadius: '50%' };
export default function Instruments() {
  const myInstrument = useContext(Context).myInstrument;
  const sessionPin = useContext(Context).sessionPin;
  const users = useContext(Context).users;
  const [takenInstruments, setTakenInstruments] = useState(takenInstrumentsPrototype);
  useEffect(() => {
    if (sessionPin && users.users) {
      const copy = JSON.parse(JSON.stringify(takenInstrumentsPrototype));
      users.users.forEach((user) => {
        if (user.instrument) {
          copy[user.instrument] = user.userName;
          setTakenInstruments(copy);
        }
      });
    }
  }, [users, sessionPin]);

  return (
    <div>
      {sessionPin ? (
        <div>
          <div className="instrument-links">
            {takenInstruments.keyboard ? (
              <div>
                <span className="icon">
                  🎹
                  <span className={'username'} style={myInstrument === 'keyboard' ? { color: 'red' } : undefined}>
                    {takenInstruments.keyboard}
                  </span>
                </span>
              </div>
            ) : (
              <Link
                to="/instrument/keyboard"
                style={myInstrument && myInstrument.instrument === 'keyboard' ? onStyle : {}}
              >
                <div>
                  <span className="icon">🎹</span>
                </div>
              </Link>
            )}

            {takenInstruments.percussion ? (
              <div>
                <span className="icon">
                  🥁
                  <span className="username" style={myInstrument === 'percussion' ? { color: 'red' } : undefined}>
                    {takenInstruments.percussion}
                  </span>
                </span>
              </div>
            ) : (
              <Link
                to="/instrument/percussion"
                style={myInstrument && myInstrument.instrument === 'percussion' ? onStyle : {}}
              >
                <div>
                  <span className="icon">🥁</span>
                </div>
              </Link>
            )}
            {takenInstruments.drone ? (
              <div>
                <span className="icon">
                  🦥
                  <span className="username" style={myInstrument === 'drone' ? { color: 'red' } : undefined}>
                    {takenInstruments.drone}
                  </span>
                </span>
              </div>
            ) : (
              <Link to="/instrument/drone" style={myInstrument && myInstrument.instrument === 'drone' ? onStyle : {}}>
                <div>
                  <span className="icon"> 🦥</span>
                </div>
              </Link>
            )}
            {takenInstruments.noise ? (
              <div>
                <span className="icon" style={myInstrument === 'noise' ? { color: 'red' } : undefined}>
                  🙉
                  <span className="username">{takenInstruments.noise}</span>
                </span>
              </div>
            ) : (
              <Link to="/instrument/noise" style={myInstrument && myInstrument.instrument === 'noise' ? onStyle : {}}>
                <div>
                  <span className="icon"> 🙉</span>
                </div>
              </Link>
            )}
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
      ) : (
        <div>
          <div className="instrument-links">
            <Link
              to="/instrument/keyboard"
              style={myInstrument && myInstrument.instrument === 'keyboard' ? onStyle : {}}
            >
              <span className="icon">🎹</span>
            </Link>
            <Link
              to="/instrument/percussion"
              style={myInstrument && myInstrument.instrument === 'percussion' ? onStyle : {}}
            >
              <span className="icon">🥁</span>
            </Link>
            <Link to="/instrument/drone" style={myInstrument && myInstrument.instrument === 'drone' ? onStyle : {}}>
              <span className="icon">🦥</span>
            </Link>
            <Link to="/instrument/noise" style={myInstrument && myInstrument.instrument === 'noise' ? onStyle : {}}>
              <span className="icon"> 🙉</span>
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
      )}
    </div>
  );
}
