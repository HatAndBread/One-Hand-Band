import { useState, useEffect, useRef } from 'react';
import '../../../Styles/Components/Drone.css';

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const getNumber = (pitch) => {
  let note;
  pitch.includes('#') ? (note = pitch.substring(0, 2)) : (note = pitch[0]);
  const octave = pitch[pitch.length - 1];
  return NOTES.indexOf(note) + 12 * octave;
};

export default function DroneFader({ number, droneData, setDroneData, chordChange, setChordChange }) {
  const [note, setNote] = useState('C3');
  const faderRef = useRef();
  const handleChange = (e) => {
    const newPitch = `${NOTES[e.target.value % 12]}${Math.floor(e.target.value / 12)}`;
    setNote(newPitch);
    const copy = JSON.parse(JSON.stringify(droneData));
    copy[number].pitch = newPitch;
    setDroneData(copy);
  };
  useEffect(() => {
    faderRef.current.value = getNumber(droneData[number].pitch);
    setNote(droneData[number].pitch);
    setChordChange(false);
  }, [chordChange, setChordChange, number, droneData]);

  return (
    <div className="pitch-fader">
      <label htmlFor="range-fader">Pitch: </label>
      <input
        ref={faderRef}
        type="range"
        name="range-fader"
        onChange={handleChange}
        min="12"
        max="72"
        defaultValue="36"
      />
      <label className="pitch-label" htmlFor="range-fader">
        {note}
      </label>
    </div>
  );
}
