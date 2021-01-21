import { useContext, useEffect } from 'react';
import { Context } from '../../App';
import handleSettings from '../../MusicLogic/handleSettings';
import '../../Styles/Components/Settings.css';

export default function AttackSustainDecayRelease({ instrument }) {
  const settings = useContext(Context).globalInstrumentSettings[instrument];
  const setSettings = useContext(Context).setGlobalInstrumentSettings;
  const sessionPin = useContext(Context).sessionPin;
  const globalInstrumentSettings = useContext(Context).globalInstrumentSettings;
  const socketId = useContext(Context).socketId;
  const handleChange = (e) => {
    const copy = JSON.parse(JSON.stringify(globalInstrumentSettings));
    copy[instrument].envelope[e.target.name] = e.target.value;
    setSettings(copy);
    handleSettings(copy[instrument], socketId, instrument, sessionPin);
  };
  useEffect(() => {
    console.log(settings);
  }, [settings]);
  return (
    <div>
      <label htmlFor={'attack'}>
        Attack:
        <input
          type="range"
          name="attack"
          onChange={handleChange}
          defaultValue={settings.envelope.attack}
          min="0"
          max="1"
          step="0.01"
        />
      </label>
      <label htmlFor={'sustain'}>
        Sustain:
        <input
          type="range"
          name="sustain"
          onChange={handleChange}
          defaultValue={settings.envelope.sustain}
          min="0"
          max="1"
          step="0.01"
        />
      </label>
      <label htmlFor={'decay'}>
        Decay:
        <input
          type="range"
          name="decay"
          onChange={handleChange}
          defaultValue={settings.envelope.decay}
          min="0"
          max="1"
          step="0.1"
        />
      </label>
      <label htmlFor={'release'}>
        Release:
        <input
          type="range"
          name="release"
          onChange={handleChange}
          defaultValue={settings.envelope.release}
          min="0"
          max="1"
          step="0.1"
        />
      </label>
    </div>
  );
}
