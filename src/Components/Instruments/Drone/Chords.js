import '../../../Styles/Components/Drone.css';
import { useState, useEffect } from 'react';
import ChordButton from './ChordButton';

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export default function Chords({ droneData, setDroneData }) {
  const [chord, setChord] = useState(null);
  const [previousChord, setPreviousChord] = useState(null);
  const getNotes = (chord) => {
    console.log(chord);
  };
  useEffect(() => {
    const copy = JSON.parse(JSON.stringify(droneData));
    console.log(copy);
    if (chord) {
      getNotes(chord);
    }
  }, [chord, droneData]);
  return (
    <div>
      <div className="chord-container">
        {NOTES.map((note) => {
          return <ChordButton key={note} note={note} chord={chord} setChord={setChord} />;
        })}
      </div>
      <div className="chord-container">
        {NOTES.map((note) => {
          return <ChordButton key={note} note={note + 'm'} chord={chord} setChord={setChord} />;
        })}
      </div>
    </div>
  );
}
