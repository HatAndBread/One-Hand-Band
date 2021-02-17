import { useEffect, useState } from 'react';

const onStyle = { backgroundColor: '#6249e9', borderRadius: '0px' };
const offStyle = { backgroundColor: '#41463d', borderRadius: '0px' };

export default function OctaveButton({ value, octave, setOctave, setChordUpdated }) {
  const [style, setStyle] = useState(offStyle);
  const handleClick = () => {
    setOctave(value);
    setChordUpdated(false);
  };

  useEffect(() => {
    if (octave === value) {
      setStyle(onStyle);
    } else {
      setStyle(offStyle);
    }
  }, [octave, value]);
  return (
    <button value={value} onClick={handleClick} style={style}>
      Octave {value}
    </button>
  );
}
