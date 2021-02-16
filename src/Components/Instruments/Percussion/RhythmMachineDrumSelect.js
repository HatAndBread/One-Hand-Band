import { useContext } from 'react';
import { percussionTypes } from '../Percussion';
import { Context } from '../../../App';

export default function RhythmMachineDrumSelect({ number }) {
  const loopData = useContext(Context).loopData;
  const setLoopData = useContext(Context).setLoopData;
  const handlePitchChange = (e) => {
    const copy = JSON.parse(JSON.stringify(loopData));
    copy[number].drum.sampleRate = e.target.value;
    setLoopData(copy);
    console.log(copy);
  };
  const handleChange = (e) => {
    const copy = JSON.parse(JSON.stringify(loopData));
    const num = e.target.dataset.number;
    copy[num].drum.drum = e.target.value;
    console.log(copy);
    setLoopData(copy);
  };
  return (
    <div className="drum-rate-input">
      <select value={loopData[number].drum.drum} onChange={handleChange} data-number={number}>
        {percussionTypes.map((type) => {
          return <option key={type}>{type}</option>;
        })}
      </select>
      <input
        type="range"
        onChange={handlePitchChange}
        min="0.1"
        max="3"
        step="0.01"
        value={loopData[number].drum.sampleRate}
      />
    </div>
  );
}
