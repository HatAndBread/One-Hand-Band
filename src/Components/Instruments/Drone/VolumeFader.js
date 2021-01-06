export default function VolumeFader({ number, droneData, setDroneData }) {
  const handleChange = (e) => {
    const copy = JSON.parse(JSON.stringify(droneData));
    copy[number].volume = e.target.value;
    setDroneData(copy);
  };
  return (
    <div>
      <label htmlFor="volume-fader" min="0" max="100">
        Volume
      </label>
      <input type="range" name="volume-fader" min="0" max="1" step="0.05" defaultValue="0.5" onChange={handleChange} />
    </div>
  );
}
