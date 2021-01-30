import { useEffect, useState } from 'react';
import '../../Styles/Components/Noise.css';
import NoiseArea from './Noise/NoiseArea';

export default function Noise({ setFinalData }) {
  const [width, setWidth] = useState(null);
  useEffect(() => {
    const handlePointerDown = (e) => {
      if (e.target.dataset && e.target.dataset.name) {
        setFinalData({ which: e.target.dataset.name, x: e.offsetX, y: e.offsetY, start: true, width: width });
      }
    };
    const handlePointerMove = (e) => {
      setFinalData({ which: e.target.dataset.name, x: e.offsetX, y: e.offsetY, width: width });
    };
    const handlePointerUp = (e) => {
      setFinalData({ which: e.target.dataset.name, x: e.offsetX, y: e.offsetY, stop: true });
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
        <NoiseArea name={'Feedback'} setWidth={setWidth} />
        <NoiseArea name={'Skronk'} />
      </div>
      <div className="noise-row">
        <NoiseArea name={'Oscillators'} />
        <NoiseArea name={'Ambient Noise'} />
      </div>
    </div>
  );
}
