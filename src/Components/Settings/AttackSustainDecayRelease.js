import { useContext } from 'react';
import { Context } from '../../App';
import handleSettings from '../../MusicLogic/handleSettings';
import '../../Styles/Components/Settings.css';

export default function AttackSustainDecayRelease({ instrument }) {
  const settings = useContext(Context).globalInstrumentSettings[instrument];
  const setSettings = useContext(Context).setGlobalInstrumentSettings;
  const sessionPin = useContext(Context).sessionPin;
  const soundSet = useContext(Context).soundSet;
  const globalInstrumentSettings = useContext(Context).globalInstrumentSettings;
  const socketId = useContext(Context).socketId;
  const handleChange = (e) => {
    const copy = JSON.parse(JSON.stringify(globalInstrumentSettings));
    copy[instrument].envelope[e.target.name] = e.target.value;
    setSettings(copy);
    handleSettings(copy[instrument], socketId, instrument, sessionPin, false, soundSet);
  };
  return (
    <div className="envelope">
      <label htmlFor={'attack'}>Attack</label>
      <input
        type="range"
        name="attack"
        onChange={handleChange}
        defaultValue={settings.envelope.attack}
        min="0"
        max="1"
        step="0.01"
      />
      <label htmlFor={'sustain'}>Sustain</label>
      <input
        type="range"
        name="sustain"
        onChange={handleChange}
        defaultValue={settings.envelope.sustain}
        min="0"
        max="1"
        step="0.01"
      />
      <label htmlFor={'decay'}>Decay</label>
      <input
        type="range"
        name="decay"
        onChange={handleChange}
        defaultValue={settings.envelope.decay}
        min="0"
        max="1"
        step="0.1"
      />

      <label htmlFor={'release'}>Release</label>
      <input
        type="range"
        name="release"
        onChange={handleChange}
        defaultValue={settings.envelope.release}
        min="0.01"
        max="3"
        step="0.01"
      />
    </div>
  );
}
