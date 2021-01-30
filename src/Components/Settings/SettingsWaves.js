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
    <form onChange={handleChange} className="wave-selector">
      <div>
        {settings[instrument].wave === 'sine' ? (
          <input type="radio" id="sine" name={instrument} value="sine" defaultChecked />
        ) : (
          <input type="radio" id="sine" name={instrument} value="sine" />
        )}
        <label htmlFor="sine">Sine</label>
      </div>
      <div>
        {settings[instrument].wave === 'triangle' ? (
          <input type="radio" id="triangle" name={instrument} value="triangle" defaultChecked />
        ) : (
          <input type="radio" id="triangle" name={instrument} value="triangle" />
        )}
        <label htmlFor="triangle">Triangle</label>
      </div>
      <div>
        {settings[instrument].wave === 'sawtooth' ? (
          <input type="radio" id="sawtooth" name={instrument} value="sawtooth" defaultChecked />
        ) : (
          <input type="radio" id="sawtooth" name={instrument} value="sawtooth" />
        )}
        <label htmlFor="sawtooth">Sawtooth</label>
      </div>
      <div>
        {settings[instrument].wave === 'square' ? (
          <input type="radio" id="square" name={instrument} value="square" defaultChecked />
        ) : (
          <input type="radio" id="square" name={instrument} value="square" />
        )}
        <label htmlFor="square">Square</label>
      </div>
    </form>
  );
}
