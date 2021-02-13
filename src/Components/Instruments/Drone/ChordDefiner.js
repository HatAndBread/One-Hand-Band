import '../../../Styles/Components/ChordProgression.css';

export default function ChordDefiner({ myNumber, updateChords, myData, removeChord }) {
  const chordChange = (e) => {
    const copy = { ...myData };
    copy.chord = e.target.value;
    updateChords(myNumber, copy);
  };
  const lengthChange = (e) => {
    const copy = { ...myData };
    copy.length = parseInt(e.target.value, 10);
    updateChords(myNumber, copy);
  };
  return (
    <div>
      <div className="divider"></div>
      <div className="chord-definer">
        <div>
          <label htmlFor="chord">
            Chord
            <br></br>
            <select name="chord" onChange={chordChange} value={myData.chord}>
              <option value="silence">Silence</option>
              <option value="C">C</option>
              <option value="Cm">Cm</option>
              <option value="C#">C#</option>
              <option value="C#m">C#m</option>
              <option value="D">D</option>
              <option value="Dm">Dm</option>
              <option value="D#">D#</option>
              <option value="D#m">D#m</option>
              <option value="E">E</option>
              <option value="Em">Em</option>
              <option value="F">F</option>
              <option value="Fm">Fm</option>
              <option value="F#">F#</option>
              <option value="F#m">F#m</option>
              <option value="G">G</option>
              <option value="Gm">Gm</option>
              <option value="G#">G#</option>
              <option value="G#m">G#m</option>
              <option value="A">A</option>
              <option value="Am">Am</option>
              <option value="A#">A#</option>
              <option value="A#m">A#m</option>
              <option value="B">B</option>
              <option value="Bm">Bm</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="chord-length">
            Length <br></br>
            <select name="chord-length" onChange={lengthChange} value={myData.length}>
              <option value={1}>Quarter note</option>
              <option value={4}>1 measure</option>
            </select>
          </label>
        </div>
        <div
          className="closer"
          onClick={() => {
            removeChord(myNumber);
          }}
        >
          Ｘ
        </div>
      </div>
    </div>
  );
}
