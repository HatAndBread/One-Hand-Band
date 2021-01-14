import { useContext, useEffect } from 'react';
import { Context } from '../../App';
import IndividualPercussion from './Percussion/IndividualPercussion';

export const percussionTypes = [
  'snare',
  'kick',
  'hat',
  'tom',
  'ride',
  'bowl',
  'bugara1',
  'bugara2',
  'ceng',
  'demung1',
  'demung2',
  'demung3',
  'djembe1',
  'djembe2',
  'djembe3',
  'jegog',
  'kantilan',
  'kempur',
  'rebana'
];
Object.freeze(percussionTypes);

export default function Percussion({ setFinalData }) {
  const percussionData = useContext(Context).percussionData;
  const setMyInstrument = useContext(Context).setMyInstrument;
  useEffect(() => {
    setMyInstrument('percussion');
    return () => {
      setMyInstrument(null);
    };
  }, [setMyInstrument]);
  useEffect(() => {
    console.log(percussionData);
  }, [percussionData]);
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
