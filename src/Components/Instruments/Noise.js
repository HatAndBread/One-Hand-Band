import { useContext, useEffect } from 'react';
import { Context } from '../../App';

export default function Noise() {
  const setMyInstrument = useContext(Context).setMyInstrument;
  useEffect(() => {
    setMyInstrument('noise');
    return () => {
      setMyInstrument(null);
    };
  }, [setMyInstrument]);
  return (
    <div>
      <div>This is the noise instrument!</div>
    </div>
  );
}
