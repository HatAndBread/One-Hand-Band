import '../../../Styles/Components/Keyboard.css';
import { useRef, useEffect, useContext, useState } from 'react';
import { KeyboardContext } from '../Keyboard';

const blackOnStyle = { backgroundColor: '#9d8df1', borderColor: '#9d8df1' };
const blackOffStyle = { backgroundColor: 'black' };
const whiteOnStyle = { backgroundColor: '#9d8df1' };
const whiteOffStyle = { backgroundColor: 'ivory' };

export default function KeyboardKey(props) {
  const [whiteBeingPlayed, setWhiteBeingPlayed] = useState(false);
  const [blackBeingPlayed, setBlackBeingPlayed] = useState(false);
  const c = useContext(KeyboardContext);
  const white = useRef(null);
  const black = useRef();
  const preventer = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    if (!c.pointerDown) {
      setWhiteBeingPlayed(false);
      setBlackBeingPlayed(false);
    }
  }, [c.pointerDown]);
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
          setBlackBeingPlayed(true);
          setWhiteBeingPlayed(false);
          c.setCurrentNote({ note: props.blackKey.toUpperCase(), octave: props.octave + c.mainOctave });
        }
      } else if (
        checkOverlap(
          white.current.offsetHeight,
          white.current.offsetWidth,
          white.current.offsetTop,
          white.current.offsetLeft,
          c.touches.x,
          c.touches.y,
          props.precededByBlack
        )
      ) {
        if (props.octave + c.mainOctave !== c.currentNote.octave) {
          c.setCurrentNote({ note: props.note.toUpperCase(), octave: props.octave + c.mainOctave });
          setWhiteBeingPlayed(true);
          setBlackBeingPlayed(false);
        } else if (props.note !== c.currentNote.note) {
          c.setCurrentNote({ note: props.note.toUpperCase(), octave: props.octave + c.mainOctave });
          setWhiteBeingPlayed(true);
          setBlackBeingPlayed(false);
        }
      } else {
        setWhiteBeingPlayed(false);
        setBlackBeingPlayed(false);
      }
    }
  }, [c, props.note, props.octave, props.blackKey, props.precededByBlack]);
  return (
    <div
      className="white-key"
      data-note={props.note}
      ref={white}
      onDragStart={preventer}
      style={whiteBeingPlayed ? whiteOnStyle : whiteOffStyle}
    >
      {props.blackKey && (
        <div
          className="black-key"
          data-note={props.blackKey}
          ref={black}
          onDragStart={preventer}
          style={blackBeingPlayed ? blackOnStyle : blackOffStyle}
        ></div>
      )}
    </div>
  );
}

const checkOverlap = (height, width, top, left, x, y, preceded) => {
  if (x > left && x < left + width && y > top && y < top + height) {
    if (preceded) {
      if (x <= left + 1 + width / 4 && y < 2 + top + height * 0.6) {
        return false;
      }
    }
    return true;
  }
  return false;
};
