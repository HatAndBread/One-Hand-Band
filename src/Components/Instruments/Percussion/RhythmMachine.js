import { useState, useEffect, useContext } from 'react';
import { Context } from '../../../App';
import '../../../Styles/Components/DrumMachine.css';

export default function RhythmMachine({ percussionData }) {
  const bpm = useContext(Context).bpm;
  const setBpm = useContext(Context).setBpm;
  const timeSignature = useContext(Context).timeSignature;
  const setTimeSignature = useContext(Context).setTimeSignature;
  const [buttColumns, setButtColumns] = useState(null);
  const [loopData, setLoopData] = useState({
    one: { drum: percussionData.one, times: new Array(timeSignature * 4) },
    two: { drum: percussionData.one, times: new Array(timeSignature * 4) },
    three: { drum: percussionData.one, times: new Array(timeSignature * 4) },
    four: { drum: percussionData.one, times: new Array(timeSignature * 4) }
  });
  const timeSignatureChange = (e) => {
    setTimeSignature(e.target.value);
    console.log(timeSignature);
  };
  const bpmChange = (e) => {
    setBpm(e.target.value);
    console.log(bpm);
  };

  useEffect(() => {
    const handleClick = (e) => {
      const copy = JSON.parse(JSON.stringify(loopData));
      const data = e.target.dataset;
      copy[data.number].times[data.beat]
        ? (copy[data.number].times[data.beat] = 0)
        : (copy[data.number].times[data.beat] = 1);
      console.log(e.target.dataset.drumType, e.target.dataset.beat);
      setLoopData(copy);
    };
    const getOnOffButts = () => {
      const arr = [];
      const ts = parseInt(timeSignature);
      for (let i = 0; i < ts * 4; i++) {
        arr.push(
          <div key={i} className="butt-column">
            <div
              id="drum-one-machine"
              className="machine-butt"
              data-drum-type={percussionData.one.drum}
              data-beat={i}
              data-number={'one'}
              onClick={handleClick}
            ></div>
            <div
              id="drum-two-machine"
              className="machine-butt"
              data-drum-type={percussionData.two.drum}
              data-beat={i}
              data-number={'two'}
              onClick={handleClick}
            ></div>
            <div
              id="drum-three-machine"
              className="machine-butt"
              data-drum-type={percussionData.three.drum}
              data-beat={i}
              data-number={'three'}
              onClick={handleClick}
            ></div>
            <div
              id="drum-four-machine"
              className="machine-butt"
              data-drum-type={percussionData.four.drum}
              data-beat={i}
              data-number={'four'}
              onClick={handleClick}
            ></div>
          </div>
        );
        if ((i + 1) % 4 === 0) {
          arr.push(<div key={Math.random()} className="machine-divider"></div>);
        }
      }
      return arr;
    };
    setButtColumns(getOnOffButts);
  }, [timeSignature, percussionData, loopData]);
  useEffect(() => {
    console.log(loopData);
  }, [loopData]);
  return (
    <div>
      <label htmlFor="time-sig-select"></label>
      <select name="time-sig-select" onChange={timeSignatureChange} defaultValue={timeSignature}>
        <option value="3">3/4</option>
        <option value="4">4/4</option>
        <option value="5">5/4</option>
        <option value="7">7/4</option>
      </select>
      <label htmlFor="bpm-range">bpm</label>
      <input type="range" min="50" max="200" step="1" name="bpm-range" onChange={bpmChange} defaultValue={bpm} />
      <div className="drum-machine">{buttColumns}</div>
    </div>
  );
}
