import { useState } from 'react';
import '../../../Styles/Components/Keyboard.css';

export default function OctaveSetter({ octave, setOctave }) {
  const [colors, setColors] = useState([
    { backgroundColor: 'white' },
    { backgroundColor: 'white' },
    { backgroundColor: 'red' },
    { backgroundColor: 'white' },
    { backgroundColor: 'white' }
  ]);

  const handleClick = (e) => {
    setOctave(parseInt(e.target.value, 10));
    const newColors = [];
    for (let i = 0; i < colors.length; i++) {
      i === parseInt(e.target.value, 10)
        ? newColors.push({ backgroundColor: 'red' })
        : newColors.push({ backgroundColor: 'white' });
    }
    setColors(newColors);
  };
  const buttons = [];
  const text = ['Very low', 'Low', 'Medium', 'High', 'Very high'];
  for (let i = 0; i < 5; i++) {
    buttons.push(
      <button style={colors[i]} value={i} key={i} onClick={handleClick}>
        {text[i]}
      </button>
    );
  }
  return (
    <div className="octave-setter-container">
      {buttons.map((button) => {
        return button;
      })}
    </div>
  );
}
