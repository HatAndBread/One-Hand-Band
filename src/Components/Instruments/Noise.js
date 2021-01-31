import { useEffect, useState } from 'react';
import '../../Styles/Components/Noise.css';
import NoiseArea from './Noise/NoiseArea';

export default function Noise({ setFinalData }) {
  const [width, setWidth] = useState(null);
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
      setFinalData({ which: e.target.dataset.name, x: e.offsetX, y: e.offsetY, stop: true });
      setColors();
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  });

  return (
    <div className="noise-container">
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
