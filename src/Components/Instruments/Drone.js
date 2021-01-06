import { useContext, useEffect, useState } from 'react';
import { Context } from '../../App';
import DroneFader from './Drone/DroneFader';
import VolumeFader from './Drone/VolumeFader';
import StartButton from './Drone/StartButton';
import WaveChooser from './Drone/WaveChooser';
import '../../Styles/Components/Drone.css';

export default function Drone() {
  const setMyInstrument = useContext(Context).setMyInstrument;
  const [droneData, setDroneData] = useState({
    one: { wave: 'sine', volume: '0.5', pitch: 'C3', playing: false },
    two: { wave: 'sine', volume: '0.5', pitch: 'C3', playing: false },
    three: { wave: 'sine', volume: '0.5', pitch: 'C3', playing: false }
  });
  const preventer = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    setMyInstrument('drone');
    return () => {
      setMyInstrument(null);
    };
  }, [setMyInstrument]);
  useEffect(() => {
    console.log(droneData);
  }, [droneData]);

  return (
    <div onContextMenu={preventer}>
      <div className="single-drone-container">
        <DroneFader min="1" max="60" defaultValue="24" number="one" droneData={droneData} setDroneData={setDroneData} />
        <VolumeFader number="one" droneData={droneData} setDroneData={setDroneData} />
        <StartButton number="one" droneData={droneData} setDroneData={setDroneData} />
        <WaveChooser name="drone1" number="one" droneData={droneData} setDroneData={setDroneData} />
      </div>
      <div className="single-drone-container">
        <DroneFader min="1" max="60" defaultValue="24" number="two" droneData={droneData} setDroneData={setDroneData} />
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
        />
        <VolumeFader number="three" droneData={droneData} setDroneData={setDroneData} />
        <StartButton number="three" droneData={droneData} setDroneData={setDroneData} />
        <WaveChooser name="drone3" number="three" droneData={droneData} setDroneData={setDroneData} />
      </div>
    </div>
  );
}
