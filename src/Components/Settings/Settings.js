import Effects from '../Effects/Effects';

export default function Settings({ instrument, setEffects }) {
  const handleEffectsChange = (effects) => {
    effects.instrument = instrument;
    setEffects(effects);
  };

  return (
    <div>
      <Effects handleEffectsChange={handleEffectsChange} />
    </div>
  );
}
