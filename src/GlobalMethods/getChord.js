const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const parseChord = (obj, note, third, octave) => {
  obj[1] = note;
  obj[2] = NOTES[NOTES.indexOf(note) + third];
  obj[3] = NOTES[NOTES.indexOf(note) + 7];
  if (!obj[2]) {
    obj[2] = NOTES[NOTES.indexOf(note) - 12 + third];
  }
  if (!obj[3]) {
    obj[3] = NOTES[NOTES.indexOf(note) - 12 + 7];
  }
  return Object.values(obj).map((value, index, arr) => {
    return (arr[index] = value + octave);
  });
};

const getChord = (chord, octave) => {
  let note;
  let third;
  let obj = { 1: null, 2: null, 3: null };
  chord.includes('#') ? (note = chord.substring(0, 2)) : (note = chord[0]);
  chord.includes('m') ? (third = 3) : (third = 4);
  return parseChord(obj, note, third, octave);
};

export default getChord;
