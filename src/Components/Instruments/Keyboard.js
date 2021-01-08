import { useState, useEffect, createContext, useContext } from 'react';
import { Context } from '../../App';
import '../../Styles/Components/Keyboard.css';
import KeyboardKeys from './Keyboard/KeyboardKeys';
import OctaveSetter from './Keyboard/OctaveSetter';

export const KeyboardContext = createContext();

export default function Keyboard({ setMusicData, effects }) {
  const socketId = useContext(Context).socketId;
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [touches, setTouches] = useState({ x: null, y: null });
  const [pointerDown, setPointerDown] = useState(false);
  const [currentNote, setCurrentNote] = useState({ note: null, octave: 1 });
  const [mainOctave, setMainOctave] = useState(2);
  useEffect(() => {
    const handleTouchMove = (e) => setTouches({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    const handlePointerUp = (e) => setPointerDown(false);
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
  }, []);

  useEffect(() => {
    if (pointerDown) {
      setMusicData({ instrument: 'keyboard', data: currentNote, type: 'play', socketId: socketId });
    } else {
      setMusicData({ instrument: 'keyboard', data: 'stop', type: 'stop', socketId: socketId });
    }
  }, [setMusicData, currentNote, pointerDown, socketId]);
  useEffect(() => {
    console.log(effects);
  }, [effects]);

  return (
    <KeyboardContext.Provider value={{ pointerDown, setTouches, touches, setCurrentNote, currentNote, mainOctave }}>
      <OctaveSetter octave={mainOctave} setOctave={setMainOctave}></OctaveSetter>
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
