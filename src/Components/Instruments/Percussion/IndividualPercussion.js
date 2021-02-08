import { useState, useContext, useRef } from 'react';
import '../../../Styles/Components/Percussion.css';
import { percussionTypes } from '../Percussion';
import { Context } from '../../../App';

export default function IndividualPercussion({ defaultDrum, number, setFinalData, sampleRate }) {
  const [drum, setDrum] = useState(defaultDrum);
  const percussionData = useContext(Context).percussionData;
  const setPercussionData = useContext(Context).setPercussionData;
  const socketId = useContext(Context).socketId;
  const hitPad = useRef();
  const handleDrumHit = () => {
    setFinalData({
      type: 'percussion',
      drum: drum,
      volume: percussionData[number].volume,
      sampleRate: percussionData[number].sampleRate,
      number: number,
      socketId: socketId
    });
  };
  const getCopy = () => JSON.parse(JSON.stringify(percussionData));
  const drumChange = (e) => {
    const copy = getCopy();
    copy[number].drum = e.target.value;
    setPercussionData(copy);
    setDrum(e.target.value);
  };
  const sampleRateChange = (e) => {
    const copy = getCopy();
    copy[number].sampleRate = e.target.value;
    setPercussionData(copy);
  };
  const changeColor = () => {
    hitPad.current.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
      Math.random() * 255
    )},${Math.floor(Math.random() * 255)})`;
  };

  const changeColorBack = () => {
    hitPad.current.style.backgroundColor = '#9d8df1';
  };
  return (
    <div className="individual-percussion-container">
      <select onChange={drumChange} defaultValue={defaultDrum}>
        {percussionTypes.map((type) => {
          return <option key={type}>{type}</option>;
        })}
      </select>
      <input type="range" onChange={sampleRateChange} min="0.1" max="3" step="0.01" defaultValue={sampleRate}></input>
      <div
        className="hit-pad"
        onClick={handleDrumHit}
        ref={hitPad}
        onTouchStart={changeColor}
        onTouchEnd={changeColorBack}
        onMouseDown={changeColor}
        onMouseUp={changeColorBack}
      ></div>
    </div>
  );
}
