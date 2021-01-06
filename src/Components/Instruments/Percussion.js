import { useContext, useEffect } from 'react';
import { Context } from '../../App';

export default function Percussion() {
  const setMyInstrument = useContext(Context).setMyInstrument;
  useEffect(() => {
    setMyInstrument('percussion');
    return () => {
      setMyInstrument(null);
    };
  }, [setMyInstrument]);
  return (
    <div>
      <div>This is the percussion instrument!</div>
    </div>
  );
}
