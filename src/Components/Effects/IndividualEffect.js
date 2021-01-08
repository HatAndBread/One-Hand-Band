import { useContext, useState } from 'react';
import { EffectsContext } from './Effects';

const onStyle = { backgroundColor: 'green', color: 'snow' };
const offStyle = { backgroundColor: 'snow', color: 'black' };

export default function IndividualEffect({ type, params }) {
  const effectsContext = useContext(EffectsContext);
  const [buttStyle, setButtStyle] = useState(offStyle);
  const onOffButtClick = () => {
    const clone = effectsContext.getClone();
    if (buttStyle === offStyle) {
      clone[type].on = true;
      setButtStyle(onStyle);
    } else {
      clone[type].on = false;
      setButtStyle(offStyle);
    }
    effectsContext.setEffects(clone);
  };
  const handleChange = (e) => {
    const clone = effectsContext.getClone();
    clone[type][e.target.dataset.type].level = e.target.value;
    effectsContext.setEffects(clone);
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
              </label>
            );
          }
          return undefined;
        })}
      </ul>
    </div>
  );
}
