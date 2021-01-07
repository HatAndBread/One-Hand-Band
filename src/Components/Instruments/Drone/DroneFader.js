import { useState, useEffect } from 'react';
import '../../../Styles/Components/Drone.css';

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export default function DroneFader({ number, droneData, setDroneData, chordChange, setChordChange }) {
  const [note, setNote] = useState('C3');
  const handleChange = (e) => {
    const newPitch = `${NOTES[e.target.value % 12]}${Math.floor(e.target.value / 12)}`;
    setNote(newPitch);
    const copy = JSON.parse(JSON.stringify(droneData));
    copy[number].pitch = newPitch;
    setDroneData(copy);
  };
  useEffect(() => {
    if (chordChange) {
      console.log('CHORD CHANGE!!!');
      setChordChange(false);
    }
  }, [chordChange, setChordChange]);
  return (
    <div className="pitch-fader">
      <label htmlFor="range-fader">Pitch: </label>
      <input type="range" name="range-fader" onChange={handleChange} min="12" max="72" defaultValue="36" />
      <label htmlFor="range-fader">{note}</label>
    </div>
  );
}
