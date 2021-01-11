import { useState } from 'react';

const onStyle = { backgroundColor: 'red', color: 'white' };
const offStyle = { backgroundColor: 'green', color: 'white' };

export default function StartButton({ number, droneData, setDroneData }) {
  const [text, setText] = useState(droneData[number].playing ? 'Stop' : 'Start');
  //console.log('from butt', droneData, number);
  const [buttStyle, setButtStyle] = useState(droneData[number].playing ? onStyle : offStyle);
  const handleClick = () => {
    const copy = JSON.parse(JSON.stringify(droneData));
    const setStopped = () => {
      setText('Start');
      setButtStyle(offStyle);
      copy[number].playing = false;
    };
    const setPlaying = () => {
      setText('Stop');
      setButtStyle(onStyle);
      copy[number].playing = true;
    };
    text === 'Start' ? setPlaying() : setStopped();
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
