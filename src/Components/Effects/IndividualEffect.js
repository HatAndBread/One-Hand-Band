import { useContext, useState } from 'react';
import { Context } from '../../App';
import handleEffects from '../../MusicLogic/handleEffects';
import '../../Styles/Components/Effects.css';

const onStyle = {
  backgroundColor: '#6249e9',
  color: 'snow'
};
const offStyle = {
  backgroundColor: 'gray',
  color: 'snow'
};

export default function IndividualEffect({ type, params, instrument }) {
  const sessionPin = useContext(Context).sessionPin;
  const getGlobalEffects = useContext(Context).getGlobalEffects;
  const socketId = useContext(Context).socketId;
  const effects = useContext(Context).globalEffectsSettings[instrument];
  const soundSet = useContext(Context).soundSet;
  const setEffects = useContext(Context).setGlobalEffectsSettings;
  const [buttStyle, setButtStyle] = useState(effects[type].on ? onStyle : offStyle);
  const onOffButtClick = () => {
    const clone = getGlobalEffects();
    if (buttStyle === offStyle) {
      clone[instrument][type].on = true;
      setEffects(clone);
      handleEffects(clone, socketId, instrument, sessionPin, false, soundSet);
      setButtStyle(onStyle);
    } else {
      clone[instrument][type].on = false;
      setEffects(clone);
      handleEffects(clone, socketId, instrument, sessionPin, false, soundSet);
      setButtStyle(offStyle);
    }
    setEffects(clone);
  };
  const handleChange = (e) => {
    const clone = getGlobalEffects();
    clone[instrument][type][e.target.dataset.type].level = e.target.value;
    setEffects(clone);
    handleEffects(clone, socketId, instrument, sessionPin, false, soundSet);
  };
  return (
    <div className="individual-effect">
      <button onClick={onOffButtClick} style={buttStyle}>
        {type}
      </button>
      {Object.entries(params).map((entry) => {
        if (entry[0] !== 'on') {
          return (
            <div key={entry[0]} style={{ width: '100%' }}>
              <label>{entry[0][0].toUpperCase() + entry[0].substring(1, entry[0].length) + ''}</label>
              <br></br>
              <input
                data-type={entry[0]}
                type="range"
                defaultValue={entry[1].level}
                min={entry[1].min}
                max={entry[1].max}
                step={entry[1].step}
                onChange={handleChange}
              />
            </div>
          );
        }
        return undefined;
      })}
    </div>
  );
}
