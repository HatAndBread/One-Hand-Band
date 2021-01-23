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
  const [pointerDown, setPointerDown] = useState(false);
  const [currentNote, setCurrentNote] = useState({ note: null, octave: 1 });
  const [mainOctave, setMainOctave] = useState(2);
  console.log('KEYBOARD INFINITY', keyboardInfinity);
  useEffect(() => {
    const handleTouchMove = (e) => setTouches({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    const handlePointerUp = (e) => !keyboardInfinity && setPointerDown(false);
    const updateWindowSize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handlePointerMove = (e) => setTouches({ x: e.x, y: e.y });
    const handlePointerDown = (e) => {
      if (e.target.className === 'white-key' || e.target.className === 'black-key') {
        setPointerDown(true);
        e.touches && handleTouchMove(e);
      }
    };
    window.addEventListener('resize', updateWindowSize);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('touchstart', handlePointerDown);
    window.addEventListener('touchend', handlePointerUp);

    return () => {
      window.removeEventListener('resize', updateWindowSize);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [keyboardInfinity]);

  useEffect(() => {
    if (pointerDown) {
      setFinalData({ data: currentNote, type: 'play' });
    } else {
      setFinalData({ data: 'stop', type: 'stop' });
    }
  }, [setFinalData, currentNote, pointerDown]);

  return (
    <KeyboardContext.Provider value={{ pointerDown, setTouches, touches, setCurrentNote, currentNote, mainOctave }}>
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
