import { useRef, useEffect } from 'react';
import '../../../Styles/Components/Noise.css';

export default function NoiseArea({ name, setWidth, color }) {
  const myRef = useRef();
  useEffect(() => {
    setWidth && setWidth(myRef.current.offsetWidth);
  });
  useEffect(() => {
    if (setWidth) {
      const handleResize = () => {
        setWidth(myRef.current.offsetWidth);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  });
  return (
    <div className="noise-area-container" data-name={name} ref={myRef} style={color}>
      <div className="noise-label" style={{ pointerEvents: 'none' }}>
        {name}
      </div>
    </div>
  );
}
