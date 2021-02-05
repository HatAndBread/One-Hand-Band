import '../../../Styles/Components/Keyboard.css';
import KeyboardKey from './KeyboardKey';

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
      <KeyboardKey note={'C'} blackKey={'C#'} octave={octave} />
      <KeyboardKey note={'D'} blackKey={'D#'} octave={octave} precededByBlack={1} />
      <KeyboardKey note={'E'} octave={octave} precededByBlack={1} />
      <KeyboardKey note={'F'} blackKey={'F#'} octave={octave} />
      <KeyboardKey note={'G'} blackKey={'G#'} octave={octave} precededByBlack={1} />
      <KeyboardKey note={'A'} blackKey={'A#'} octave={octave} precededByBlack={1} />
      <KeyboardKey note={'B'} octave={octave} precededByBlack={1} />

      {lastOctave && <KeyboardKey note={'C'} octave={octave === 1 ? 2 : 3} />}
    </div>
  );
}
