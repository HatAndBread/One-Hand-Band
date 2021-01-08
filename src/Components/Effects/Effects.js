import { useState, useEffect, createContext } from 'react';
import IndividualEffect from './IndividualEffect';
import EffectsObject from './EffectsObject';

export const EffectsContext = createContext();

export default function Effects({ handleEffectsChange }) {
  const [effects, setEffects] = useState(EffectsObject());
  const getClone = () => {
    return JSON.parse(JSON.stringify(effects));
  };
  useEffect(() => {
    handleEffectsChange(effects);
  }, [effects, handleEffectsChange]);
  return (
    <EffectsContext.Provider value={{ getClone, setEffects }}>
      <IndividualEffect type={'distortion'} params={effects.distortion} />
      <IndividualEffect type={'delay'} params={effects.delay} />
      <IndividualEffect type={'pulverizer'} params={effects.pulverizer} />
      <IndividualEffect type={'vibrato'} params={effects.vibrato} />
      <IndividualEffect type={'pitchShifter'} params={effects.pitchShifter} />
    </EffectsContext.Provider>
  );
}
