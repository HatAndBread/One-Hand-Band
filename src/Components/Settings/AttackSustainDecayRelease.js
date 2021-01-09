export default function AttackSustainDecayRelease({ envelope, setEnvelope }) {
  const handleChange = (e) => {
    const copy = JSON.parse(JSON.stringify(envelope));
    copy[e.target.name] = e.target.value;
    setEnvelope(copy);
  };
  return (
    <div>
      <label htmlFor={'attack'}>
        Attack:
        <input type="range" name="attack" onChange={handleChange} defaultValue="0.1" min="0" max="1" step="0.1" />
      </label>
      <label htmlFor={'sustain'}>
        Sustain:
        <input type="range" name="sustain" onChange={handleChange} defaultValue="0.1" min="0" max="1" step="0.1" />
      </label>
      <label htmlFor={'decay'}>
        Decay:
        <input type="range" name="decay" onChange={handleChange} defaultValue="0.1" min="0" max="1" step="0.1" />
      </label>
      <label htmlFor={'release'}>
        Release:
        <input type="range" name="release" onChange={handleChange} defaultValue="0.1" min="0" max="1" step="0.1" />
      </label>
    </div>
  );
}
