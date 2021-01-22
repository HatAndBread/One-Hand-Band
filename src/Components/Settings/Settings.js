import { useContext, useEffect } from 'react';
import { Context } from '../../App';
import AttackSustainDecayRelease from './AttackSustainDecayRelease';
import handleSettings from '../../MusicLogic/handleSettings';
import SettingsWaves from './SettingsWaves';
import '../../Styles/Components/Settings.css';

export default function Settings({ instrument, setSettingsOpen }) {
  const setSettings = useContext(Context).setGlobalInstrumentSettings;
  const globalInstrumentSettings = useContext(Context).globalInstrumentSettings;
  const sessionPin = useContext(Context).sessionPin;
  const socketId = useContext(Context).socketId;

  const handleChange = (e) => {
    const copy = JSON.parse(JSON.stringify(globalInstrumentSettings));
    console.log(e.target.name);
    copy[instrument][e.target.name] = e.target.value;
    setSettings(copy);
    handleSettings(copy[instrument], socketId, instrument, sessionPin);
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
        return (
          <div>
            <AttackSustainDecayRelease instrument={instrument} />
            <div style={{ display: 'flex' }}>
              <input
                type="range"
                id="rampTo"
                name="rampTo"
                min="0"
                max="0.5"
                step="0.01"
                defaultValue={globalInstrumentSettings[instrument].rampTo}
                onChange={handleChange}
              />
              <label htmlFor="rampTo">Ramp</label>
            </div>
          </div>
        );
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
        <div style={{ display: 'flex' }}>
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
          <label htmlFor="volume">Volume</label>
        </div>
        {getKnobs()}
      </div>
      {instrument === 'keyboard' && <SettingsWaves instrument={instrument} />}
    </div>
  );
}
