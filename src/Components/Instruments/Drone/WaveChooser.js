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
          {droneData[number].wave === 'sine' ? (
            <input type="radio" id="sine" name={name} value="sine" defaultChecked />
          ) : (
            <input type="radio" id="sine" name={name} value="sine" />
          )}
          <label htmlFor="sine">Sine</label>
        </div>
        <div>
          {droneData[number].wave === 'triangle' ? (
            <input type="radio" id="triangle" name={name} value="triangle" defaultChecked />
          ) : (
            <input type="radio" id="triangle" name={name} value="triangle" />
          )}
          <label htmlFor="triangle">Triangle</label>
        </div>
        <div>
          {droneData[number].wave === 'sawtooth' ? (
            <input type="radio" id="sawtooth" name={name} value="sawtooth" defaultChecked />
          ) : (
            <input type="radio" id="sawtooth" name={name} value="sawtooth" />
          )}
          <label htmlFor="sawtooth">Sawtooth</label>
        </div>
        <div>
          {droneData[number].wave === 'square' ? (
            <input type="radio" id="square" name={name} value="square" defaultChecked />
          ) : (
            <input type="radio" id="square" name={name} value="square" />
          )}
          <label htmlFor="square">Square</label>
        </div>
      </form>
    </div>
  );
}
