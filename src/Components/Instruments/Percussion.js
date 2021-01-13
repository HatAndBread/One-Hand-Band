import { useContext, useEffect } from 'react';
import { Context } from '../../App';
import IndividualPercussion from './Percussion/IndividualPercussion';

export const percussionTypes = ['snare', 'kick', 'hi-hat', 'tom', 'ride'];

export default function Percussion({ setFinalData }) {
  const percussionData = useContext(Context).percussionData;
  const setMyInstrument = useContext(Context).setMyInstrument;
  useEffect(() => {
    setMyInstrument('percussion');
    return () => {
      setMyInstrument(null);
    };
  }, [setMyInstrument]);
  return (
    <div className="percussion-container">
      <div className="percussion-row">
        <IndividualPercussion number="one" defaultDrum={percussionData.one.drum} setFinalData={setFinalData} />
        <IndividualPercussion number="two" defaultDrum={percussionData.two.drum} setFinalData={setFinalData} />
      </div>
      <div className="percussion-row">
        <IndividualPercussion number="three" defaultDrum={percussionData.three.drum} setFinalData={setFinalData} />
        <IndividualPercussion number="four" defaultDrum={percussionData.four.drum} setFinalData={setFinalData} />
      </div>
    </div>
  );
}
