import { useState, useContext } from 'react';
import { Context } from '../../../App';
import '../../../Styles/Components/Keyboard.css';

export default function OctaveSetter({ octave, setOctave }) {
  const keyboardInfinity = useContext(Context).keyboardInfinity;
  const setKeyboardInfinity = useContext(Context).setKeyboardInfinity;
  const [infinityStyle, setInfinityStyle] = useState({ backgroundColor: 'gray', borderRadius: '0px' });
  const [colors, setColors] = useState([
    { backgroundColor: 'gray', borderRadius: '0px' },
    { backgroundColor: 'gray', borderRadius: '0px' },
    { backgroundColor: '#9d8df1', borderRadius: '0px' },
    { backgroundColor: 'gray', borderRadius: '0px' },
    { backgroundColor: 'gray', borderRadius: '0px' },
    { backgroundColor: 'gray', borderRadius: '0px' }
  ]);

  const handleClick = (e) => {
    setOctave(parseInt(e.target.value, 10));
    const newColors = [];
    for (let i = 0; i < colors.length; i++) {
      i === parseInt(e.target.value, 10)
        ? newColors.push({ backgroundColor: '#9d8df1', borderRadius: '0px' })
        : newColors.push({ backgroundColor: 'gray', borderRadius: '0px' });
    }
    setColors(newColors);
  };
  const handleInifinityClick = () => {
    if (keyboardInfinity) {
      setKeyboardInfinity(false);
      setInfinityStyle({ backgroundColor: 'gray', borderRadius: '0px' });
    } else {
      setKeyboardInfinity(true);
      setInfinityStyle({ backgroundColor: '#9d8df1', borderRadius: '0px' });
    }
  };
  const buttons = [];
  const text = ['Very low', 'Low', 'Medium', 'High', 'Very high', '🙉', '🚥'];
  for (let i = 0; i < 7; i++) {
    buttons.push(
      <button
        style={i < 6 ? colors[i] : infinityStyle}
        value={i}
        key={i}
        onClick={i < 6 ? handleClick : handleInifinityClick}
      >
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
