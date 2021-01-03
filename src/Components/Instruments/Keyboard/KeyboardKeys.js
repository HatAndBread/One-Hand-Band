import '../../../Styles/Components/Keyboard.css';
import KeyboardKey from './KeyboardKey';
import { useEffect } from 'react';

export default function KeyboardKeys({ windowWidth, windowHeight, lastOctave, octave }) {
  const preventer = (e) => {
    e.preventDefault();
  };
  return (
    <div
      className="keyboard-keys"
      style={windowWidth > windowHeight ? { width: `${windowWidth / 2}px` } : { width: '100%' }}
      onContextMenu={preventer}
    >
      <KeyboardKey note={'c'} blackKey={'c#'} octave={octave}></KeyboardKey>
      <KeyboardKey note={'d'} blackKey={'d#'} octave={octave}></KeyboardKey>
      <KeyboardKey note={'e'} octave={octave}></KeyboardKey>
      <KeyboardKey note={'f'} blackKey={'f#'} octave={octave}></KeyboardKey>
      <KeyboardKey note={'g'} blackKey={'g#'} octave={octave}></KeyboardKey>
      <KeyboardKey note={'a'} blackKey={'a#'} octave={octave}></KeyboardKey>
      <KeyboardKey note={'b'} octave={octave}></KeyboardKey>

      {lastOctave && <KeyboardKey note={'c'} octave={octave}></KeyboardKey>}
    </div>
  );
}
