import { useContext, useEffect } from 'react';
import { Context } from '../../App';
import AttackSustainDecayRelease from './AttackSustainDecayRelease';
import handleSettings from '../../MusicLogic/handleSettings';
import '../../Styles/Components/Settings.css';

export default function Settings({ instrument, setSettingsOpen }) {
  const setSettings = useContext(Context).setGlobalInstrumentSettings;
  const globalInstrumentSettings = useContext(Context).globalInstrumentSettings;
  const sessionPin = useContext(Context).sessionPin;
  const socketId = useContext(Context).socketId;
  const soundSet = useContext(Context).soundSet;

  const handleChange = (e) => {
    const copy = JSON.parse(JSON.stringify(globalInstrumentSettings));
    console.log(e.target.name);
    copy[instrument][e.target.name] = e.target.value;
    setSettings(copy);
    handleSettings(copy[instrument], socketId, instrument, sessionPin, false, soundSet);
  };
  useEffect(() => {
    setSettingsOpen(true);
    return () => {
      setSettingsOpen(false);
    };
  }, [setSettingsOpen]);

  const getKnobs = () => {
    switch (instrument) {
      case 'drone':
        return <AttackSustainDecayRelease instrument={instrument} />;
      case 'keyboard':
        return <AttackSustainDecayRelease instrument={instrument} />;
      case 'noise':
        return;
      case 'theremin':
        return <AttackSustainDecayRelease instrument={instrument} />;
      case 'percussion':
        return;
      case 'skronk':
        return;
      default:
        return;
    }
  };

  return (
    <div className="settings-container">
      <div className="main-settings-container">
        <label htmlFor="volume">Volume</label>
        <input
          type="range"
          id="volume"
          name="volume"
          min="0"
          max="1"
          step="0.05"
          defaultValue={globalInstrumentSettings[instrument].volume}
          onChange={handleChange}
        />
        {getKnobs()}
      </div>
    </div>
  );
}
