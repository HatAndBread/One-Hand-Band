import { useContext } from 'react';
import { Context } from '../../App';
import IndividualEffect from './IndividualEffect';
import '../../Styles/Components/Effects.css';

export default function Effects({ instrument }) {
  const effects = useContext(Context).globalEffectsSettings[instrument];
  return (
    <div className="effects-container">
      <IndividualEffect type={'distortion'} params={effects.distortion} instrument={instrument} />
      <IndividualEffect type={'delay'} params={effects.delay} instrument={instrument} />
      <IndividualEffect type={'pulverizer'} params={effects.pulverizer} instrument={instrument} />
      <IndividualEffect type={'vibrato'} params={effects.vibrato} instrument={instrument} />
      <IndividualEffect type={'pitchShifter'} params={effects.pitchShifter} instrument={instrument} />
    </div>
  );
}
