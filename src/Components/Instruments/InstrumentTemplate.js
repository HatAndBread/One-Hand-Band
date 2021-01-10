import { useContext, useEffect, useState, useCallback } from 'react';
import { Context } from '../../App';
import { Route } from 'react-router-dom';
import SettingsLink from './SettingsLink';
import Settings from '../Settings/Settings';
import Theremin from './Theremin';
import Keyboard from './Keyboard';
import Drone from './Drone';
import Noise from './Noise';
import Percussion from './Percussion';
import Skronk from './Skronk';

export default function InstrumentTemplate({ instrument }) {
  const setMusicData = useContext(Context).setMusicData;
  const [finalData, setFinalData] = useState(null);
  const setMyInstrument = useContext(Context).setMyInstrument;
  const socketId = useContext(Context).socketId;
  const clone = useCallback(
    (obj) => {
      const copy = JSON.parse(JSON.stringify(obj));
      copy.socketId = socketId;
      copy.instrument = instrument;
      return copy;
    },
    [socketId, instrument]
  );

  const preventer = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    setMyInstrument({ instrument });
    return () => {
      setMyInstrument(null);
    };
  }, [setMyInstrument, instrument]);

  useEffect(() => {
    if (finalData) {
      const copy = clone(finalData);
      setMusicData(copy);
      setFinalData(null);
    }
  }, [finalData, setMusicData, clone]);
  return (
    <div onContextMenu={preventer}>
      <SettingsLink forInstrument={instrument} />
      <Route path={`/instrument/${instrument}/settings`}>
        <Settings instrument={instrument} />
      </Route>
      {instrument === 'drone' && <Drone setFinalData={setFinalData} />}
      {instrument === 'theremin' && <Theremin setFinalData={setFinalData} />}
      {instrument === 'keyboard' && <Keyboard setFinalData={setFinalData} />}
      {instrument === 'noise' && <Noise setFinalData={setFinalData} />}
      {instrument === 'percussion' && <Percussion setFinalData={setFinalData} />}
      {instrument === 'skronk' && <Skronk setFinalData={setFinalData} />}
    </div>
  );
}
