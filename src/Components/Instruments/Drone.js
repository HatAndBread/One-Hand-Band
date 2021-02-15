import { useEffect, useContext } from 'react';
import { Context } from '../../App';
import { Link } from 'react-router-dom';
import DroneFader from './Drone/DroneFader';
import VolumeFader from './Drone/VolumeFader';
import StartButton from './Drone/StartButton';
import WaveChooser from './Drone/WaveChooser';
import Chords from './Drone/Chords';
import '../../Styles/Components/Drone.css';

export default function Drone({ setFinalData }) {
  const droneData = useContext(Context).droneData;
  const chordProgressionPlaying = useContext(Context).chordProgressionPlaying;
  const setChordProgressionPlaying = useContext(Context).setChordProgressionPlaying;
  const setDroneData = useContext(Context).setDroneData;
  const chordChange = useContext(Context).chordChange;
  const setChordChange = useContext(Context).setChordChange;
  useEffect(() => {
    setFinalData(droneData);
  }, [droneData, setFinalData]);

  const all = (e) => {
    const copy = JSON.parse(JSON.stringify(droneData));
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

  const playProgressionClick = () => {
    chordProgressionPlaying ? setChordProgressionPlaying(false) : setChordProgressionPlaying(true);
  };

  return (
    <div>
      <div className="drone-top-btns">
        <Link to="/instrument/chord-progression">Make Chord Progression</Link>
        <button onClick={playProgressionClick}>{chordProgressionPlaying ? 'Stop' : 'Play'} Chord Progression</button>
        <button onClick={all} value="start">
          Start All ▶️
        </button>
        <button onClick={all} value="stop">
          Stop All ⏹
        </button>
      </div>
      <Chords
        droneData={droneData}
        setDroneData={setDroneData}
        chordChange={chordChange}
        setChordChange={setChordChange}
      />
      <div className="drones-container">
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
    </div>
  );
}
