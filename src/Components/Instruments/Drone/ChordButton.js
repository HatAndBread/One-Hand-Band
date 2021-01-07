import { useState, useEffect } from 'react';

const onStyle = { padding: '0', backgroundColor: 'green' };
const offStyle = { padding: '0', backgroundColor: 'white' };

export default function ChordButton({ note, chord, setChord, setPreviousChord, setChordChange }) {
  const [style, setStyle] = useState(offStyle);
  const handleClick = () => {
    if (chord !== note) {
      setPreviousChord(chord);
      setChord(note);
      setChordChange(true);
    } else {
      setPreviousChord(null);
      setChord(null);
    }
  };
  useEffect(() => {
    if (chord === note) {
      setStyle(onStyle);
    } else {
      setStyle(offStyle);
    }
  }, [chord, note]);
  return (
    <button style={style} onClick={handleClick}>
      {note}
    </button>
  );
}
