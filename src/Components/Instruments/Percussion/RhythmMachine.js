import { useState, useEffect, useContext } from 'react';
import { Context } from '../../../App';
import RhythmMachineDrumSelect from './RhythmMachineDrumSelect';
import '../../../Styles/Components/DrumMachine.css';

export default function RhythmMachine({ percussionData, setFinalData }) {
  const bpm = useContext(Context).bpm;
  const setBpm = useContext(Context).setBpm;
  const socketId = useContext(Context).socketId;
  const timeSignature = useContext(Context).timeSignature;
  const setTimeSignature = useContext(Context).setTimeSignature;
  const loopData = useContext(Context).loopData;
  const loopObject = useContext(Context).loopObject;
  const setLoopData = useContext(Context).setLoopData;
  const [buttColumns, setButtColumns] = useState(null);
  const [tsChanged, setTsChanged] = useState(false);

  const timeSignatureChange = (e) => {
    setTimeSignature(e.target.value);
    console.log(timeSignature);
    setTsChanged(true);
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

    const getDrumSelectors = (i) => {
      return (
        <div key={i} className="butt-column">
          <RhythmMachineDrumSelect number={'one'} />
          <RhythmMachineDrumSelect number={'two'} />
          <RhythmMachineDrumSelect number={'three'} />
          <RhythmMachineDrumSelect number={'four'} />
          <RhythmMachineDrumSelect number={'five'} />
          <RhythmMachineDrumSelect number={'six'} />
        </div>
      );
    };
    const getOnOffButts = () => {
      const arr = [];
      const ts = parseInt(timeSignature);
      for (let i = 0; i < ts * 4 + 1; i++) {
        if (!i) {
          arr.push(getDrumSelectors(i));
        } else {
          arr.push(
            <div key={i} className="butt-column">
              <div
                id="drum-one-machine"
                className="machine-butt"
                data-drum-type={loopData.one.drum}
                data-beat={i - 1}
                data-number={'one'}
                onClick={handleClick}
                style={loopData.one.times[i - 1] ? { backgroundColor: '#9d8df1' } : { backgroundColor: 'gray' }}
              ></div>
              <div
                id="drum-two-machine"
                className="machine-butt"
                data-drum-type={loopData.two.drum}
                data-beat={i - 1}
                data-number={'two'}
                onClick={handleClick}
                style={loopData.two.times[i - 1] ? { backgroundColor: '#9d8df1' } : { backgroundColor: 'gray' }}
              ></div>
              <div
                id="drum-three-machine"
                className="machine-butt"
                data-drum-type={loopData.three.drum}
                data-beat={i - 1}
                data-number={'three'}
                onClick={handleClick}
                style={loopData.three.times[i - 1] ? { backgroundColor: '#9d8df1' } : { backgroundColor: 'gray' }}
              ></div>
              <div
                id="drum-four-machine"
                className="machine-butt"
                data-drum-type={loopData.four.drum}
                data-beat={i - 1}
                data-number={'four'}
                onClick={handleClick}
                style={loopData.four.times[i - 1] ? { backgroundColor: '#9d8df1' } : { backgroundColor: 'gray' }}
              ></div>
              <div
                id="drum-five-machine"
                className="machine-butt"
                data-drum-type={loopData.five.drum}
                data-beat={i - 1}
                data-number={'five'}
                onClick={handleClick}
                style={loopData.five.times[i - 1] ? { backgroundColor: '#9d8df1' } : { backgroundColor: 'gray' }}
              ></div>
              <div
                id="drum-six-machine"
                className="machine-butt"
                data-drum-type={loopData.six.drum}
                data-beat={i - 1}
                data-number={'six'}
                onClick={handleClick}
                style={loopData.six.times[i - 1] ? { backgroundColor: '#9d8df1' } : { backgroundColor: 'gray' }}
              ></div>
            </div>
          );
        }
        if (i % 4 === 0) {
          arr.push(<div key={Math.random()} className="machine-divider"></div>);
        }
      }
      return arr;
    };
    setButtColumns(getOnOffButts);
  }, [timeSignature, percussionData, loopData, setLoopData]);
  useEffect(() => {
    setFinalData({
      type: 'percussion',
      drum: 'rhythmMachine',
      loop: loopData,
      socketId: socketId,
      timeSignature: timeSignature,
      bpm: bpm
    });
  }, [loopData, setFinalData, socketId, timeSignature, bpm]);
  const clear = () => {
    setLoopData(loopObject);
  };
  useEffect(() => {
    if (tsChanged) {
      setLoopData(loopObject);
      setTsChanged(false);
    }
  }, [timeSignature, tsChanged, loopObject, setLoopData]);

  return (
    <div>
      <div className="drum-machine">{buttColumns}</div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <button onClick={clear}>Clear</button>
        <select name="time-sig-select" onChange={timeSignatureChange} defaultValue={timeSignature}>
          <option value="3">3/4</option>
          <option value="4">4/4</option>
          <option value="5">5/4</option>
          <option value="7">7/4</option>
        </select>
        <label style={{ display: 'flex' }}>
          BPM:
          <input
            className="ts-fader"
            type="range"
            min="50"
            max="200"
            step="1"
            name="bpm-range"
            onChange={bpmChange}
            defaultValue={bpm}
          />
        </label>
      </div>
    </div>
  );
}
