import { useContext, useEffect } from 'react';
import { Context } from '../../App';

export default function Theremin() {
  const setMyInstrument = useContext(Context).setMyInstrument;
  useEffect(() => {
    setMyInstrument('theremin');
    return () => {
      setMyInstrument(null);
    };
  }, [setMyInstrument]);
  return (
    <div>
      <div>This is the theremin</div>
    </div>
  );
}
