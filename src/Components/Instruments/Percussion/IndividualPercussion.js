import { useState, useContext } from 'react';
import '../../../Styles/Components/Percussion.css';
import { percussionTypes } from '../Percussion';
import { Context } from '../../../App';
import playMusic from '../../../MusicLogic/playMusic';

export default function IndividualPercussion({ defaultDrum, number, setFinalData }) {
  const [drum, setDrum] = useState(defaultDrum);
  const percussionData = useContext(Context).percussionData;
  const setPercussionData = useContext(Context).setPercussionData;
  const handleDrumHit = () => {
    setFinalData({
      type: 'percussion',
      drum: drum,
      volume: percussionData[number].volume,
      detune: percussionData[number].detune
    });
  };
  const drumChange = (e) => {
    const copy = JSON.parse(JSON.stringify(percussionData));
    copy[number].drum = e.target.value;
    setPercussionData(copy);
    setDrum(e.target.value);
  };
  return (
    <div className="individual-percussion-container">
      <select onChange={drumChange} defaultValue={defaultDrum}>
        {percussionTypes.map((type) => {
          return <option key={type}>{type}</option>;
        })}
      </select>
      <input type="range"></input>
      <div className="hit-pad" onClick={handleDrumHit}></div>
    </div>
  );
}
