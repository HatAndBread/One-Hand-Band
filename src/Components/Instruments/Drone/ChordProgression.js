import { useContext, useEffect } from 'react';
import { Context } from '../../../App';
import ChordDefiner from './ChordDefiner';
import '../../../Styles/Components/ChordProgression.css';

export default function ChordProgression() {
  const chordProgression = useContext(Context).chordProgression;
  const setChordProgression = useContext(Context).setChordProgression;
  const fullLengthChordProgression = useContext(Context).fullLengthChordProgression;
  const setFullLengthChordProgression = useContext(Context).setFullLengthChordProgression;
  const timeSignature = useContext(Context).timeSignature;

  const addNewChord = () => {
    const copy = [...chordProgression];
    copy.push({ chord: 'silence', length: 1 });
    setChordProgression(copy);
  };

  const updateChords = (num, data) => {
    const copy = [...chordProgression];
    copy[num] = data;
    setChordProgression(copy);
  };

  const removeChord = (num) => {
    const copy = [...chordProgression];
    copy.splice(num, 1);
    console.log(copy);
    setChordProgression(copy);
  };

  const deleteAll = () => {
    setChordProgression([]);
  };

  useEffect(() => {
    const arr = [];
    chordProgression.forEach((chord) => {
      for (let i = 0; i < chord.length * 4; i++) {
        arr.push(chord);
      }
    });
    let remainder = arr.length % (timeSignature * 4);
    if (remainder !== 0) {
      for (let i = 0; i < timeSignature * 4 - remainder; i++) {
        arr.push({ chord: 'silence', length: 1 });
      }
    }
    setFullLengthChordProgression(arr);
  }, [chordProgression, timeSignature, setFullLengthChordProgression]);

  return (
    <div className="chord-progression-container">
      <button onClick={addNewChord}>Add New Chord</button>
      {chordProgression.map((el, index) => {
        return (
          <ChordDefiner
            key={index}
            myNumber={index}
            updateChords={updateChords}
            myData={el}
            removeChord={removeChord}
          />
        );
      })}
      {chordProgression.length > 1 && (
        <div>
          <br></br>
          <br></br>
          <br></br>
          <button onClick={deleteAll}>⚠️Delete all⚠️</button>
        </div>
      )}
    </div>
  );
}
