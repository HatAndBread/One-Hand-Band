import { useContext, useEffect, useState } from 'react';
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
  const setMyInstrument = useContext(Context).setMyInstrument;
  const [effects, setEffects] = useState({});
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
    console.log(effects);
  }, [effects]);
  return (
    <div onContextMenu={preventer}>
      <SettingsLink forInstrument={instrument} />
      <Route path={`/instrument/${instrument}/settings`}>
        <Settings instrument={instrument} setEffects={setEffects} />
      </Route>
      {instrument === 'drone' && <Drone setMusicData={setMusicData} effects={effects} />}
      {instrument === 'theremin' && <Theremin setMusicData={setMusicData} effects={effects} />}
      {instrument === 'keyboard' && <Keyboard setMusicData={setMusicData} effects={effects} />}
      {instrument === 'noise' && <Noise setMusicData={setMusicData} effects={effects} />}
      {instrument === 'percussion' && <Percussion setMusicData={setMusicData} effects={effects} />}
      {instrument === 'skronk' && <Skronk setMusicData={setMusicData} effects={effects} />}
    </div>
  );
}
