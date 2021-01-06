export default function WaveChooser({ name, number, droneData, setDroneData }) {
  const handleChange = (e) => {
    const copy = JSON.parse(JSON.stringify(droneData));
    copy[number].wave = e.target.value;
    setDroneData(copy);
  };
  return (
    <div>
      <form onChange={handleChange} className="wave-selector">
        <div>
          <input type="radio" id="sine" name={name} value="sine" defaultChecked />
          <label htmlFor="sine">Sine</label>
        </div>
        <div>
          <input type="radio" id="triangle" name={name} value="triangle" />
          <label htmlFor="triangle">Triangle</label>
        </div>
        <div>
          <input type="radio" id="sawtooth" name={name} value="sawtooth" />
          <label htmlFor="sawtooth">Sawtooth</label>
        </div>
        <div>
          <input type="radio" id="square" name={name} value="square" />
          <label htmlFor="square">Square</label>
        </div>
      </form>
    </div>
  );
}
