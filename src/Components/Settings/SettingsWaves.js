import { useContext } from 'react';
import { Context } from '../../App';
import handleSettings from '../../MusicLogic/handleSettings';
import '../../Styles/Components/Settings.css';

export default function SettingsWaves({ instrument }) {
  const settings = useContext(Context).globalInstrumentSettings;
  const setSettings = useContext(Context).setGlobalInstrumentSettings;
  const sessionPin = useContext(Context).sessionPin;
  const socketId = useContext(Context).socketId;
  const soundSet = useContext(Context).soundSet;
  const handleChange = (e) => {
    const copy = JSON.parse(JSON.stringify(settings));
    copy[instrument].wave = e.target.value;
    setSettings(copy);
    console.log(copy);
    handleSettings(copy[instrument], socketId, instrument, sessionPin, false, soundSet);
  };
  return (
    <select onChange={handleChange} defaultValue={settings[instrument].wave}>
      <option value="sine">sine</option>
      <option value="triangle">triangle</option>
      <option value="sawtooth">sawtooth</option>
      <option value="square">square</option>
      <option value="piano">piano</option>
      <option value="oud">oud</option>
      <option value="trumpet">trumpet</option>
      <option value="organ">organ</option>
      <option value="oboe">oboe</option>
      <option value="kazoo">kazoo</option>
      <option value="voice">voice</option>
      <option value="harmonium">harmonium</option>
      <option value="swell">swell</option>
    </select>
  );
}
