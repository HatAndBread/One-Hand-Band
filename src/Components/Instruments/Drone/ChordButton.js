import { useState, useEffect } from 'react';

const onStyle = { padding: '0', backgroundColor: 'green' };
const offStyle = { padding: '0', backgroundColor: 'white' };

export default function ChordButton({ note, chord, setChord }) {
  const [style, setStyle] = useState(offStyle);
  const handleClick = () => {
    if (chord !== note) {
      setChord(note);
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
  }, [chord]);
  return (
    <button style={style} onClick={handleClick}>
      {note}
    </button>
  );
}
