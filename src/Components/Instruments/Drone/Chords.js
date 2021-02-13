import '../../../Styles/Components/Drone.css';
import { useEffect, useContext } from 'react';
import OctaveButton from './OctaveButton';
import ChordButton from './ChordButton';
import useTrigger from '../../../Hooks/useTrigger';
import { Context } from '../../../App';
import getChord from '../../../GlobalMethods/getChord';
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export default function Chords({ droneData, setDroneData, chordChange, setChordChange }) {
  const chord = useContext(Context).droneChord;
  const chordUpdated = useContext(Context).chordUpdated;
  const setChordUpdated = useContext(Context).setChordUpdated;
  const setChord = useContext(Context).setDroneChord;
  const octave = useContext(Context).droneOctave;
  const setOctave = useContext(Context).setDroneOctave;

  useTrigger(() => {
    const copy = JSON.parse(JSON.stringify(droneData));
    copy.one.pitch = `${copy.one.pitch.slice(0, copy.one.pitch.length - 1)}${octave}`;
    copy.two.pitch = `${copy.two.pitch.slice(0, copy.two.pitch.length - 1)}${octave}`;
    copy.three.pitch = `${copy.three.pitch.slice(0, copy.three.pitch.length - 1)}${octave}`;
    setDroneData(copy);
  }, [octave]);

  useEffect(() => {
    const business = () => {
      const copy = JSON.parse(JSON.stringify(droneData));
      const notes = getChord(chord, octave);
      copy.one.pitch = notes[0];
      copy.two.pitch = notes[1];
      copy.three.pitch = notes[2];
      setDroneData(copy);
      setChordChange(true);
      setChordUpdated(true);
    };
    if (chordChange) {
      business();
    }
  }, [chord, droneData, octave, setDroneData, chordChange, chordUpdated, setChordUpdated, setChordChange]);

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
            <ChordButton key={note} note={note} chord={chord} setChord={setChord} setChordChange={setChordChange} />
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
              setChordChange={setChordChange}
            />
          );
        })}
      </div>
    </div>
  );
}
