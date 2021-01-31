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
  const [mainOctave, setMainOctave] = useState(2);
  const [touchScreen, setTouchScreen] = useState(false);

  useEffect(() => {
    let exit = false;
    const theLoop = () => {
      !exit && window.requestAnimationFrame(theLoop);
    };
    theLoop();

    return () => {
      exit = true;
    };
  });
  useEffect(() => {
    const eventHandler = (e) => (e.pointerType === 'touch' ? setTouchScreen(true) : setTouchScreen(false));
    window.addEventListener('pointerdown', eventHandler);
    return () => {
      window.removeEventListener('pointerdown', eventHandler);
    };
  }, []);

  useEffect(() => {
    const handlePointerUp = () => {
      !keyboardInfinity && setPointerDown(false);
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
        setPointerDown(true);
        setTouches({ x: e.x, y: e.y });
      }
    };
    const handleClick = (e) => {
      if (e.target.className === 'white-key' || e.target.className === 'black-key') {
        e.preventDefault();
      }
    };
    window.addEventListener('resize', updateWindowSize);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', updateWindowSize);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('click', handleClick);
    };
  }, [keyboardInfinity, touchScreen]);

  useEffect(() => {
    if (pointerDown) {
      setFinalData({ data: currentNote, type: 'play' });
    } else {
      !keyboardInfinity && setFinalData({ data: 'stop', type: 'stop' });
    }
  }, [setFinalData, currentNote, pointerDown, keyboardInfinity]);

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
