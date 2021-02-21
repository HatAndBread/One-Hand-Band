export default function IndividualPercussionPresets(which) {
  switch (which) {
    case 'gamelan':
      return {
        one: { drum: 'jegog', volume: 0, sampleRate: 1 },
        two: { drum: 'kempur', volume: 0, sampleRate: 1 },
        three: { drum: 'kantilan', volume: 0, sampleRate: 1 },
        four: { drum: 'demung1', volume: 0, sampleRate: 1 },
        five: { drum: 'demung2', volume: 0, sampleRate: 1 },
        six: { drum: 'demung3', volume: 0, sampleRate: 1 }
      };
    case 'junk':
      return {
        one: { drum: 'ruler', volume: 0, sampleRate: 1 },
        two: { drum: 'spring', volume: 0, sampleRate: 1 },
        three: { drum: 'bowl', volume: 0, sampleRate: 1 },
        four: { drum: 'ruler', volume: 0, sampleRate: 0.8 },
        five: { drum: 'spring', volume: 0, sampleRate: 1.6 },
        six: { drum: 'ceng', volume: 0, sampleRate: 1 }
      };
    case 'rock':
      return {
        one: { drum: 'kick', volume: 0, sampleRate: 1 },
        two: { drum: 'snare', volume: 0, sampleRate: 1 },
        three: { drum: 'hat', volume: 0, sampleRate: 1 },
        four: { drum: 'tom', volume: 0, sampleRate: 1 },
        five: { drum: 'ride', volume: 0, sampleRate: 1 },
        six: { drum: 'bowl', volume: 0, sampleRate: 1 }
      };
    case 'drum circle':
      return {
        one: { drum: 'bugara2', volume: 0, sampleRate: 1 },
        two: { drum: 'bugara1', volume: 0, sampleRate: 1 },
        three: { drum: 'djembe1', volume: 0, sampleRate: 1 },
        four: { drum: 'djembe2', volume: 0, sampleRate: 1 },
        five: { drum: 'djembe3', volume: 0, sampleRate: 1 },
        six: { drum: 'rebana', volume: 0, sampleRate: 1 }
      };
    default:
      break;
  }
}
