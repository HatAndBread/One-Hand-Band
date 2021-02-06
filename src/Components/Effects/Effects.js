import { useContext, useEffect } from 'react';
import { Context } from '../../App';
import IndividualEffect from './IndividualEffect';
import '../../Styles/Components/Effects.css';

export default function Effects({ instrument, setSettingsOpen }) {
  const effects = useContext(Context).globalEffectsSettings[instrument];
  useEffect(() => {
    setSettingsOpen(true);
    return () => {
      setSettingsOpen(false);
    };
  }, [setSettingsOpen]);
  return (
    <div className="effects-container">
      <IndividualEffect type={'distortion'} params={effects.distortion} instrument={instrument} />
      <IndividualEffect type={'delay'} params={effects.delay} instrument={instrument} />
    </div>
  );
}
