import { useContext, useState } from 'react';
import { Context } from '../../App';
import handleEffects from '../../MusicLogic/handleEffects';

const onStyle = { backgroundColor: 'green', color: 'snow' };
const offStyle = { backgroundColor: 'snow', color: 'black' };

export default function IndividualEffect({ type, params, instrument }) {
  const sessionPin = useContext(Context).sessionPin;
  const getGlobalEffects = useContext(Context).getGlobalEffects;
  const socketId = useContext(Context).socketId;
  const effects = useContext(Context).globalEffectsSettings[instrument];
  const setEffects = useContext(Context).setGlobalEffectsSettings;
  const [buttStyle, setButtStyle] = useState(effects[type].on ? onStyle : offStyle);
  const onOffButtClick = () => {
    const clone = getGlobalEffects();
    if (buttStyle === offStyle) {
      clone[instrument][type].on = true;
      setEffects(clone);
      handleEffects(clone, socketId, instrument, sessionPin);
      setButtStyle(onStyle);
    } else {
      clone[instrument][type].on = false;
      setEffects(clone);
      handleEffects(clone, socketId, instrument, sessionPin);
      setButtStyle(offStyle);
    }
    setEffects(clone);
  };
  const handleChange = (e) => {
    const clone = getGlobalEffects();
    clone[instrument][type][e.target.dataset.type].level = e.target.value;
    setEffects(clone);
    handleEffects(clone, socketId, instrument, sessionPin);
  };
  return (
    <div>
      <button onClick={onOffButtClick} style={buttStyle}>
        {type}
      </button>
      <ul>
        {Object.entries(params).map((entry) => {
          if (entry[0] !== 'on') {
            return (
              <label key={entry[0]}>
                {entry[0][0].toUpperCase() + entry[0].substring(1, entry[0].length) + ': '}
                <input
                  data-type={entry[0]}
                  type="range"
                  defaultValue={entry[1].level}
                  min={entry[1].min}
                  max={entry[1].max}
                  step={entry[1].step}
                  onChange={handleChange}
                />
                {entry[0] === 'shift' && entry[1].level}
              </label>
            );
          }
          return undefined;
        })}
      </ul>
    </div>
  );
}
