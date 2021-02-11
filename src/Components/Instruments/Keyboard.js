import { useState, useEffect, useContext, createContext } from 'react';
import { Context } from '../../App';
import '../../Styles/Components/Keyboard.css';
import KeyboardKeys from './Keyboard/KeyboardKeys';
import OctaveSetter from './Keyboard/OctaveSetter';

export const KeyboardContext = createContext();

export default function Keyboard({ setFinalData }) {
  const keyboardInfinity = useContext(Context).keyboardInfinity;
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [touches, setTouches] = useState({ x: null, y: null });
  const [pointerDown, setPointerDown] = useState(keyboardInfinity ? true : false);
  const [currentNote, setCurrentNote] = useState({ note: null, octave: 1 });
  const [secondTouch, setSecondTouch] = useState({ x: null, y: null });
  const [secondNote, setSecondNote] = useState({ note: null, octave: 1 });
  const [mainOctave, setMainOctave] = useState(2);
  const [touchScreen, setTouchScreen] = useState(false);

  useEffect(() => {
    const eventHandler = (e) => (e.pointerType === 'touch' ? setTouchScreen(true) : setTouchScreen(false));
    window.addEventListener('pointerdown', eventHandler);
    return () => {
      window.removeEventListener('pointerdown', eventHandler);
    };
  }, []);

  useEffect(() => {
    const handlePointerUp = () => {
      if (!keyboardInfinity) {
        setPointerDown(false);
        setCurrentNote({ note: null, octave: 1 });
      }
    };
    const updateWindowSize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handlePointerMove = (e) => {
      if (e.target.className === 'white-key' || e.target.className === 'black-key') {
        setTouches({ x: e.x, y: e.y });
      }
    };
    const handlePointerDown = (e) => {
      if (e.target.className === 'white-key' || e.target.className === 'black-key') {
        !touchScreen && setCurrentNote({ note: null, octave: 1 });
        setTouches({ x: e.x, y: e.y });
        setPointerDown(true);
      }
    };
    const handleClick = (e) => {
      if (e.target.className === 'white-key' || e.target.className === 'black-key') {
        e.preventDefault();
      }
    };
    const handleTouches = (e) => {
      if (e.touches[0].target.className === 'white-key' || e.touches[0].target.className === 'black-key') {
        setTouches({ x: Math.floor(e.touches[0].clientX), y: Math.floor(e.touches[0].clientY) });
        setPointerDown(true);
      }
      if (e.touches[1]) {
        if (e.touches[1].target.className === 'white-key' || e.touches[1].target.className === 'black-key') {
          setSecondTouch({ x: Math.floor(e.touches[1].clientX), y: Math.floor(e.touches[1].clientY) });
        }
      }
    };

    const handleTouchEnd = (e) => {
      if (e.touches.length && !keyboardInfinity) {
        setSecondTouch({ x: null, y: null });
        setSecondNote({ note: null, octave: 1 });
      } else {
        if (!keyboardInfinity) {
          setPointerDown(false);
          setCurrentNote({ note: null, octave: 1 });
        }
      }
    };

    if (!touchScreen) {
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('pointerdown', handlePointerDown);
      window.addEventListener('pointermove', handlePointerMove);
    } else {
      window.addEventListener('touchstart', handleTouches);
      window.addEventListener('touchend', handleTouchEnd);
      window.addEventListener('touchmove', handleTouches);
    }

    window.addEventListener('resize', updateWindowSize);
    window.addEventListener('click', handleClick);
    window.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('resize', updateWindowSize);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mousedown', handleClick);
      if (!touchScreen) {
        window.removeEventListener('pointerup', handlePointerUp);
        window.removeEventListener('pointerdown', handlePointerDown);
        window.removeEventListener('pointermove', handlePointerMove);
      } else {
        window.removeEventListener('touchstart', handleTouches);
        window.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('touchmove', handleTouches);
      }
    };
  }, [keyboardInfinity, touchScreen]);
  useEffect(() => {
    if (currentNote.note) {
      setFinalData({ data: currentNote, type: 'play' });
    } else {
      setFinalData({ data: 'stop', type: 'stop' });
    }
  }, [currentNote, setFinalData]);

  useEffect(() => {
    if (secondNote.note) {
      setFinalData({ data: secondNote, type: 'play', second: true });
    } else {
      setFinalData({ data: 'stop', type: 'stop', second: true });
    }
  }, [secondNote, setFinalData]);

  return (
    <KeyboardContext.Provider
      value={{
        pointerDown,
        setTouches,
        touches,
        secondTouch,
        setSecondTouch,
        secondNote,
        setSecondNote,
        setCurrentNote,
        currentNote,
        mainOctave
      }}
    >
      <OctaveSetter setPointerDown={setPointerDown} setOctave={setMainOctave}></OctaveSetter>
      <div style={{ display: 'flex' }}>
        <KeyboardKeys
          windowWidth={windowSize.width}
          windowHeight={windowSize.height}
          lastOctave={windowSize.width > windowSize.height ? false : true}
          octave={1}
        ></KeyboardKeys>
        {windowSize.width > windowSize.height && (
          <KeyboardKeys
            windowWidth={windowSize.width}
            windowHeight={windowSize.height}
            lastOctave={true}
            octave={2}
          ></KeyboardKeys>
        )}
      </div>
    </KeyboardContext.Provider>
  );
}
