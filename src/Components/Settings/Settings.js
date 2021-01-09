import { useState, useEffect } from 'react';
import Effects from '../Effects/Effects';
import AttackSustainDecayRelease from './AttackSustainDecayRelease';

const settingsObj = {
  envelope: { attack: 0, sustain: 0, decay: 0, release: 0 },
  volume: 0
};
export default function Settings({ instrument, setEffects, setSettings }) {
  const [envelope, setEnvelope] = useState(settingsObj.envelope);
  const [basicSettings, setBasicSettings] = useState(settingsObj);

  const handleEffectsChange = (effects) => {
    effects.instrument = instrument;
    setEffects(effects);
  };
  useEffect(() => {
    const copy = JSON.parse(JSON.stringify(settingsObj));
    copy.envelope = envelope;
    setBasicSettings(copy);
  }, [envelope]);
  useEffect(() => {
    setSettings(basicSettings);
  }, [basicSettings, setSettings]);
  const handleSettingsChange = (e) => {
    const copy = JSON.parse(JSON.stringify(settingsObj));
    copy[e.target.name] = e.target.value;
    setSettings(copy);
  };
  const getKnobs = () => {
    switch (instrument) {
      case 'drone':
        return <AttackSustainDecayRelease setEnvelope={setEnvelope} envelope={envelope} />;
      case 'keyboard':
        return <AttackSustainDecayRelease setEnvelope={setEnvelope} envelope={envelope} />;
      case 'noise':
        return;
      case 'theremin':
        return <AttackSustainDecayRelease setEnvelope={setEnvelope} envelope={envelope} />;
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
          defaultValue="0.5"
          onChange={handleSettingsChange}
        />
      </label>
      <Effects handleEffectsChange={handleEffectsChange} />
    </div>
  );
}
