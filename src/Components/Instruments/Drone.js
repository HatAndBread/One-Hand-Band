import { useEffect, useState, useContext } from 'react';
import { Context } from '../../App';
import DroneFader from './Drone/DroneFader';
import VolumeFader from './Drone/VolumeFader';
import StartButton from './Drone/StartButton';
import WaveChooser from './Drone/WaveChooser';
import Chords from './Drone/Chords';
import '../../Styles/Components/Drone.css';

export default function Drone({ setFinalData }) {
  const droneData = useContext(Context).droneData;
  const setDroneData = useContext(Context).setDroneData;

  const [showChords, setShowChords] = useState(false);
  const [chordChange, setChordChange] = useState(false);
  const [chordButtText, setChordButtText] = useState('Chords');
  useEffect(() => {
    setFinalData(droneData);
  }, [droneData, setFinalData]);
  const chordsClick = () => {
    if (showChords) {
      setShowChords(false);
      setChordButtText('Chords');
    } else {
      setShowChords(true);
      setChordButtText('Hide Chords');
    }
  };

  const all = (e) => {
    const copy = JSON.parse(JSON.stringify(droneData));
    console.log(copy);
    if (e.target.value === 'start') {
      copy.one.playing = true;
      copy.two.playing = true;
      copy.three.playing = true;
    } else {
      copy.one.playing = false;
      copy.two.playing = false;
      copy.three.playing = false;
    }
    setDroneData(copy);
  };

  return (
    <div>
      <button onClick={chordsClick}>{chordButtText}</button>
      <button onClick={all} value="start">
        Start All
      </button>
      <button onClick={all} value="stop">
        Stop All
      </button>
      {showChords && (
        <Chords
          droneData={droneData}
          setDroneData={setDroneData}
          chordChange={chordChange}
          setChordChange={setChordChange}
        />
      )}

      <div className="single-drone-container">
        <DroneFader
          min="1"
          max="60"
          defaultValue="24"
          number="one"
          droneData={droneData}
          setDroneData={setDroneData}
          chordChange={chordChange}
          setChordChange={setChordChange}
        />
        <VolumeFader number="one" droneData={droneData} setDroneData={setDroneData} />
        <StartButton number="one" droneData={droneData} setDroneData={setDroneData} />
        <WaveChooser name="drone1" number="one" droneData={droneData} setDroneData={setDroneData} />
      </div>
      <div className="single-drone-container">
        <DroneFader
          min="1"
          max="60"
          defaultValue="24"
          number="two"
          droneData={droneData}
          setDroneData={setDroneData}
          chordChange={chordChange}
          setChordChange={setChordChange}
        />
        <VolumeFader number="two" droneData={droneData} setDroneData={setDroneData} />
        <StartButton number="two" droneData={droneData} setDroneData={setDroneData} />
        <WaveChooser name="drone2" number="two" droneData={droneData} setDroneData={setDroneData} />
      </div>
      <div className="single-drone-container">
        <DroneFader
          min="1"
          max="60"
          defaultValue="24"
          number="three"
          droneData={droneData}
          setDroneData={setDroneData}
          chordChange={chordChange}
          setChordChange={setChordChange}
        />
        <VolumeFader number="three" droneData={droneData} setDroneData={setDroneData} />
        <StartButton number="three" droneData={droneData} setDroneData={setDroneData} />
        <WaveChooser name="drone3" number="three" droneData={droneData} setDroneData={setDroneData} />
      </div>
    </div>
  );
}
