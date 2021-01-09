import { useEffect, useState } from 'react';
import DroneFader from './Drone/DroneFader';
import VolumeFader from './Drone/VolumeFader';
import StartButton from './Drone/StartButton';
import WaveChooser from './Drone/WaveChooser';
import Chords from './Drone/Chords';
import '../../Styles/Components/Drone.css';

export default function Drone({ setFinalData }) {
  const [droneData, setDroneData] = useState({
    one: { wave: 'sine', volume: '0.5', pitch: 'C3', playing: false },
    two: { wave: 'sine', volume: '0.5', pitch: 'C3', playing: false },
    three: { wave: 'sine', volume: '0.5', pitch: 'C3', playing: false }
  });
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

  return (
    <div>
      <button onClick={chordsClick}>{chordButtText}</button>
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
