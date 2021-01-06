import { useContext, useEffect } from 'react';
import { Context } from '../../App';

export default function Skronk() {
  const setMyInstrument = useContext(Context).setMyInstrument;
  useEffect(() => {
    setMyInstrument('skronk');
    return () => {
      setMyInstrument(null);
    };
  }, [setMyInstrument]);
  return (
    <div>
      <div>This is the skronk</div>
    </div>
  );
}
