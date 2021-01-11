import { useContext } from 'react';
import { Context } from '../../App';
import Effects from '../Effects/Effects';
import AttackSustainDecayRelease from './AttackSustainDecayRelease';
import handleSettings from '../../MusicLogic/handleSettings';

export default function Settings({ instrument }) {
  const setSettings = useContext(Context).setGlobalInstrumentSettings;
  const globalInstrumentSettings = useContext(Context).globalInstrumentSettings;
  const socketId = useContext(Context).socketId;

  const handleChange = (e) => {
    const copy = JSON.parse(JSON.stringify(globalInstrumentSettings));
    console.log(e.target.name);
    copy[instrument][e.target.name] = e.target.value;
    setSettings(copy);
    handleSettings(copy[instrument], socketId, instrument);
  };

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
    <div>
      {getKnobs()}
      <label htmlFor="volume">
        Volume:
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
      </label>
      {instrument === 'keyboard' && (
        <label htmlFor="rampTo">
          Ramp to note:
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
        </label>
      )}
      <Effects instrument={instrument} />
    </div>
  );
}
