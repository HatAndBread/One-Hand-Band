import { useEffect, useState, useContext } from 'react';
import { Context } from '../../App';
import '../../Styles/Components/Noise.css';
import NoiseArea from './Noise/NoiseArea';

const onStyle = { backgroundColor: 'red' };

export default function Noise({ setFinalData }) {
  const [width, setWidth] = useState(null);
  const noiseInfinity = useContext(Context).noiseInfinity;
  const setNoiseInfinity = useContext(Context).setNoiseInfinity;
  const [feedbackColor, setFeedbackColor] = useState({ backgroundColor: 'gray' });
  const [skronkColor, setSkronkColor] = useState({ backgroundColor: 'gray' });
  const [oscillatorsColor, setOscillatorsColor] = useState({ backgroundColor: 'gray' });
  const [ambientNoiseColor, setAmbientNoiseColor] = useState({ backgroundColor: 'gray' });
  useEffect(() => {
    const randomColor = () => {
      return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
      )})`;
    };
    const setColors = (name) => {
      name === 'Feedback'
        ? setFeedbackColor({ backgroundColor: randomColor() })
        : setFeedbackColor({ backgroundColor: 'gray' });
      name === 'Skronk'
        ? setSkronkColor({ backgroundColor: randomColor() })
        : setSkronkColor({ backgroundColor: 'gray' });
      name === 'Oscillators'
        ? setOscillatorsColor({ backgroundColor: randomColor() })
        : setOscillatorsColor({ backgroundColor: 'gray' });
      name === 'Ambient Noise'
        ? setAmbientNoiseColor({ backgroundColor: randomColor() })
        : setAmbientNoiseColor({ backgroundColor: 'gray' });
    };
    const handlePointerDown = (e) => {
      if (e.target.dataset && e.target.dataset.name) {
        setFinalData({ which: e.target.dataset.name, x: e.offsetX, y: e.offsetY, start: true, width: width });
        setColors(e.target.dataset.name);
      }
    };
    const handlePointerMove = (e) => {
      setFinalData({ which: e.target.dataset.name, x: e.offsetX, y: e.offsetY, width: width });
      setColors(e.target.dataset.name);
    };
    const handlePointerUp = (e) => {
      if (!noiseInfinity[camelCase(e.target.dataset.name)]) {
        setFinalData({ which: e.target.dataset.name, x: e.offsetX, y: e.offsetY, stop: true });
        setColors();
      }
    };
    const handleTouchMove = (e) => {
      if (e.touches[1] && e.touches[1].target.dataset.name) {
        setFinalData({
          which: e.touches[1].target.dataset.name,
          x: e.touches[1].clientX,
          x2: e.touches[1].clientX,
          y: e.touches[1].clientY,
          width: width
        });
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('touchmove', handleTouchMove);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [noiseInfinity, setFinalData, width]);

  const handleInfinityClick = (e) => {
    const copy = { ...noiseInfinity };
    console.log(e.target.value, copy);
    if (copy[e.target.value]) {
      copy[e.target.value] = false;
    } else {
      copy[e.target.value] = true;
    }
    setNoiseInfinity(copy);
  };

  return (
    <div className="noise-container">
      <div className="infinity-buttons">
        <button value="feedback" onClick={handleInfinityClick}>
          {noiseInfinity.feedback ? '🚀' : '✋'}
          <br></br>Feedback
        </button>
        <button value="skronk" onClick={handleInfinityClick}>
          {noiseInfinity.skronk ? '🚀' : '✋'}
          <br></br>Skronk
        </button>
        <button value="oscillators" onClick={handleInfinityClick}>
          {noiseInfinity.oscillators ? '🚀' : '✋'}
          <br></br>Oscillators
        </button>
        <button value="ambientNoise" onClick={handleInfinityClick}>
          {noiseInfinity.ambientNoise ? '🚀' : '✋'}
          <br></br>Ambient Noise
        </button>
      </div>
      <div className="noise-row">
        <NoiseArea name={'Feedback'} setWidth={setWidth} color={feedbackColor} />
        <NoiseArea name={'Skronk'} color={skronkColor} />
      </div>
      <div className="noise-row">
        <NoiseArea name={'Oscillators'} color={oscillatorsColor} />
        <NoiseArea name={'Ambient Noise'} color={ambientNoiseColor} />
      </div>
    </div>
  );
}

function camelCase(string) {
  switch (string) {
    case 'Ambient Noise':
      return 'ambientNoise';
    case 'Skronk':
      return 'skronk';
    case 'Feedback':
      return 'feedback';
    case 'Oscillators':
      return 'oscillators';
    default:
      break;
  }
}
