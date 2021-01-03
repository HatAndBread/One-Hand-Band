import '../../../Styles/Components/Keyboard.css';
import { useRef, useEffect, useContext } from 'react';
import { KeyboardContext } from '../Keyboard';

export default function KeyboardKey(props) {
  const c = useContext(KeyboardContext);
  const white = useRef(null);
  const black = useRef(null);
  const preventer = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    if (c.pointerDown) {
      if (
        black.current &&
        checkOverlap(
          black.current.offsetHeight,
          black.current.offsetWidth,
          black.current.offsetTop,
          black.current.offsetLeft,
          c.touches.x,
          c.touches.y
        )
      ) {
        if (props.blackKey !== c.currentNote.note) {
          c.setCurrentNote({ note: props.blackKey, octave: props.octave });
        }
      } else if (
        checkOverlap(
          white.current.offsetHeight,
          white.current.offsetWidth,
          white.current.offsetTop,
          white.current.offsetLeft,
          c.touches.x,
          c.touches.y
        )
      ) {
        if (props.note !== c.currentNote.note) {
          c.setCurrentNote({ note: props.note, octave: props.octave });
        }
      }
    }
  }, [c, props.note, props.octave, props.blackKey]);
  return (
    <div className="white-key" data-note={props.note} ref={white} onDragStart={preventer}>
      {props.blackKey && (
        <div className="black-key" data-note={props.blackKey} ref={black} onDragStart={preventer}></div>
      )}
    </div>
  );
}

const checkOverlap = (height, width, top, left, x, y) => {
  if (x > left && x < left + width && y > top && y < top + height) {
    return true;
  }
  return false;
};
