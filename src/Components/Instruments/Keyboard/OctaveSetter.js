import { useState, useContext, useEffect } from 'react';
import { Context } from '../../../App';
import '../../../Styles/Components/Keyboard.css';
import SettingsWaves from '../../Settings/SettingsWaves';

const onStyle = { backgroundColor: '#6249e9', borderRadius: '0px' };
const offStyle = { backgroundColor: 'gray', borderRadius: '0px' };

export default function OctaveSetter({ setPointerDown, setOctave }) {
  const keyboardInfinity = useContext(Context).keyboardInfinity;
  const setKeyboardInfinity = useContext(Context).setKeyboardInfinity;
  const mainOctave = useContext(Context).mainOctave;
  const [infinityStyle, setInfinityStyle] = useState(keyboardInfinity ? onStyle : offStyle);
  const [colors, setColors] = useState([offStyle, offStyle, onStyle, offStyle, offStyle, offStyle]);
  useEffect(() => {
    const arr = new Array(6);
    for (let i = 0; i < arr.length; i++) {
      if (i === mainOctave) {
        arr[i] = onStyle;
      } else {
        arr[i] = offStyle;
      }
    }
    setColors(arr);
  }, [mainOctave, keyboardInfinity]);

  const handleClick = (e) => {
    setOctave(parseInt(e.target.value, 10));
    const newColors = [];
    for (let i = 0; i < colors.length; i++) {
      i === parseInt(e.target.value, 10) ? newColors.push(onStyle) : newColors.push(offStyle);
    }
    setColors(newColors);
  };
  const handleInfinityClick = () => {
    if (keyboardInfinity) {
      setKeyboardInfinity(false);
      setPointerDown(false);
      setInfinityStyle(offStyle);
    } else {
      setKeyboardInfinity(true);
      setInfinityStyle(onStyle);
    }
  };
  const buttons = [];
  const text = ['0', '1', '2', '3', '4', '5', '♾'];
  for (let i = 0; i < 8; i++) {
    if (i < 7) {
      buttons.push(
        <button
          style={i < 6 ? colors[i] : infinityStyle}
          value={i}
          key={i}
          onClick={i < 6 ? handleClick : handleInfinityClick}
        >
          {text[i]}
        </button>
      );
    }
    if (i === 7) {
      buttons.push(<SettingsWaves instrument={'keyboard'} key={i} />);
    }
  }
  return (
    <div className="octave-setter-container">
      {buttons.map((button) => {
        return button;
      })}
    </div>
  );
}
