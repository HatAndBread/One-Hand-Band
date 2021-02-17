import { useState, useEffect } from 'react';

const onStyle = { padding: '0', backgroundColor: '#6249e9', borderRadius: '0px' };
const offStyle = { padding: '0', backgroundColor: '#41463d', borderRadius: '0px' };

export default function ChordButton({ note, chord, setChord, setChordChange }) {
  const [style, setStyle] = useState(offStyle);
  const handleClick = () => {
    if (chord !== note) {
      setChord(note);
      setChordChange(true);
    } else {
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
