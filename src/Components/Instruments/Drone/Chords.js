import '../../../Styles/Components/Drone.css';
import { useState, useEffect } from 'react';
import OctaveButton from './OctaveButton';
import ChordButton from './ChordButton';

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const parseChord = (obj, note, third, octave) => {
  obj[1] = note;
  obj[2] = NOTES[NOTES.indexOf(note) + third];
  obj[3] = NOTES[NOTES.indexOf(note) + 7];
  if (!obj[2]) {
    obj[2] = NOTES[NOTES.indexOf(note) - 12 + third];
  }
  if (!obj[3]) {
    obj[3] = NOTES[NOTES.indexOf(note) - 12 + 7];
  }
  return Object.values(obj).map((value, index, arr) => {
    return (arr[index] = value + octave);
  });
};

const getNotes = (chord, octave) => {
  let note;
  let third;
  let obj = { 1: null, 2: null, 3: null };
  chord.includes('#') ? (note = chord.substring(0, 2)) : (note = chord[0]);
  chord.includes('m') ? (third = 3) : (third = 4);
  return parseChord(obj, note, third, octave);
};

let cheat;
export default function Chords({ droneData, setDroneData, chordChange, setChordChange }) {
  const [chord, setChord] = useState(null);
  const [previousChord, setPreviousChord] = useState(null);
  const [octave, setOctave] = useState(3);
  const [chordUpdated, setChordUpdated] = useState(false);
  cheat = droneData;

  useEffect(() => {
    const copy = JSON.parse(JSON.stringify(cheat));
    copy.one.pitch = `${copy.one.pitch.slice(0, copy.one.pitch.length - 1)}${octave}`;
    copy.two.pitch = `${copy.two.pitch.slice(0, copy.two.pitch.length - 1)}${octave}`;
    copy.three.pitch = `${copy.three.pitch.slice(0, copy.three.pitch.length - 1)}${octave}`;
    setDroneData(copy);
  }, [octave, setDroneData]);

  useEffect(() => {
    const business = () => {
      const copy = JSON.parse(JSON.stringify(droneData));
      const notes = getNotes(chord, octave);
      copy.one.pitch = notes[0];
      copy.two.pitch = notes[1];
      copy.three.pitch = notes[2];
      setDroneData(copy);
      setChordChange(true);
      setChordUpdated(true);
    };
    if (chord && !chordUpdated) {
      business();
    } else if (chordChange) {
      business();
    }
  }, [chord, droneData, octave, previousChord, setDroneData, chordChange, chordUpdated, setChordChange]);

  return (
    <div>
      <div className="octave-button-container">
        <OctaveButton value={1} octave={octave} setOctave={setOctave} setChordUpdated={setChordUpdated} />
        <OctaveButton value={2} octave={octave} setOctave={setOctave} setChordUpdated={setChordUpdated} />
        <OctaveButton value={3} octave={octave} setOctave={setOctave} setChordUpdated={setChordUpdated} />
        <OctaveButton value={4} octave={octave} setOctave={setOctave} setChordUpdated={setChordUpdated} />
        <OctaveButton value={5} octave={octave} setOctave={setOctave} setChordUpdated={setChordUpdated} />
      </div>

      <div className="chord-container">
        {NOTES.map((note) => {
          return (
            <ChordButton
              key={note}
              note={note}
              chord={chord}
              setChord={setChord}
              setPreviousChord={setPreviousChord}
              setChordChange={setChordChange}
            />
          );
        })}
      </div>
      <div className="chord-container">
        {NOTES.map((note) => {
          return (
            <ChordButton
              key={note}
              note={note + 'm'}
              chord={chord}
              setChord={setChord}
              setPreviousChord={setPreviousChord}
              setChordChange={setChordChange}
            />
          );
        })}
      </div>
    </div>
  );
}
