import { createContext, useContext } from 'react';
import { Context } from '../../App';
import IndividualEffect from './IndividualEffect';

export const EffectsContext = createContext();

export default function Effects({ instrument }) {
  const socketId = useContext(Context).socketId;
  const globalEffects = useContext(Context).globalEffectsSettings;
  const effects = globalEffects[instrument];
  const setEffects = useContext(Context).setGlobalEffectsSettings;
  const getClone = () => {
    return JSON.parse(JSON.stringify(globalEffects));
  };

  return (
    <EffectsContext.Provider value={{ getClone, setEffects, effects, socketId }}>
      <IndividualEffect type={'distortion'} params={effects.distortion} instrument={instrument} />
      <IndividualEffect type={'delay'} params={effects.delay} instrument={instrument} />
      <IndividualEffect type={'pulverizer'} params={effects.pulverizer} instrument={instrument} />
      <IndividualEffect type={'vibrato'} params={effects.vibrato} instrument={instrument} />
      <IndividualEffect type={'pitchShifter'} params={effects.pitchShifter} instrument={instrument} />
    </EffectsContext.Provider>
  );
}
