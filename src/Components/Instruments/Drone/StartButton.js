import { useState } from 'react';

const onStyle = { backgroundColor: 'red', color: 'white' };
const offStyle = { backgroundColor: 'green', color: 'white' };

export default function StartButton({ number, droneData, setDroneData }) {
  const [text, setText] = useState('START');
  const [buttStyle, setButtStyle] = useState(offStyle);
  const handleClick = () => {
    const copy = JSON.parse(JSON.stringify(droneData));
    const setStopped = () => {
      setText('START');
      setButtStyle(offStyle);
      copy[number].playing = false;
    };
    const setPlaying = () => {
      setText('STOP');
      setButtStyle(onStyle);
      copy[number].playing = true;
    };
    text === 'START' ? setPlaying() : setStopped();
    setDroneData(copy);
  };
  return (
    <div>
      <button onClick={handleClick} style={buttStyle}>
        {text}
      </button>
    </div>
  );
}
