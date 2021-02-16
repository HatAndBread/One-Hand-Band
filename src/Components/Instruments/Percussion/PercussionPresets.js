export default function PercussionPresets(which, timeSignature) {
  switch (which) {
    case 'drum circle':
      return {
        one: {
          drum: { drum: 'bugara2', sampleRate: 0.8, volume: 1 },
          times: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1]
        },
        two: {
          drum: { drum: 'bugara1', sampleRate: 1, volume: 1 },
          times: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
          sampleRate: 1,
          volume: 1
        },
        three: {
          drum: { drum: 'djembe1', sampleRate: 1, volume: 1 },
          times: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
          sampleRate: 1,
          volume: 1
        },
        four: {
          drum: { drum: 'djembe2', sampleRate: 1, volume: 1 },
          times: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
          sampleRate: 1,
          volume: 1
        },
        five: {
          drum: { drum: 'djembe3', sampleRate: 1, volume: 1 },
          times: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
          sampleRate: 1,
          volume: 1
        },
        six: {
          drum: { drum: 'rebana', sampleRate: 1, volume: 0.7 },
          times: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
          sampleRate: 1,
          volume: 1
        }
      };
    case 'rock':
      return {
        one: {
          drum: { drum: 'kick', sampleRate: 1, volume: 1 },
          times: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]
        },
        two: {
          drum: { drum: 'snare', sampleRate: 1, volume: 1 },
          times: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
          sampleRate: 1,
          volume: 1
        },
        three: {
          drum: { drum: 'hat', sampleRate: 1, volume: 1 },
          times: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
          sampleRate: 1,
          volume: 1
        },
        four: {
          drum: { drum: 'tom', sampleRate: 1, volume: 1 },
          times: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
          sampleRate: 1,
          volume: 1
        },
        five: {
          drum: { drum: 'ride', sampleRate: 1, volume: 1 },
          times: [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
          sampleRate: 1,
          volume: 1
        },
        six: {
          drum: { drum: 'tom', sampleRate: 0.7, volume: 0.7 },
          times: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
          sampleRate: 1,
          volume: 1
        }
      };
    case 'gamelan':
      return {
        one: {
          drum: { drum: 'jegog', sampleRate: 1, volume: 1 },
          times: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
        },
        two: {
          drum: { drum: 'demung1', sampleRate: 1, volume: 1 },
          times: [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
          sampleRate: 1,
          volume: 1
        },
        three: {
          drum: { drum: 'demung2', sampleRate: 1, volume: 1 },
          times: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
          sampleRate: 1,
          volume: 1
        },
        four: {
          drum: { drum: 'demung3', sampleRate: 1, volume: 1 },
          times: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          sampleRate: 1,
          volume: 1
        },
        five: {
          drum: { drum: 'kantilan', sampleRate: 1, volume: 1 },
          times: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          sampleRate: 1,
          volume: 1
        },
        six: {
          drum: { drum: 'kempur', sampleRate: 1, volume: 0.8 },
          times: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
          sampleRate: 1,
          volume: 1
        }
      };
    case 'junk':
      return {
        one: {
          drum: { drum: 'ruler', sampleRate: 1.8, volume: 1 },
          times: [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
        },
        two: {
          drum: { drum: 'ruler', sampleRate: 2.5, volume: 1 },
          times: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
          sampleRate: 1,
          volume: 1
        },
        three: {
          drum: { drum: 'spring', sampleRate: 1.8, volume: 1 },
          times: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
          sampleRate: 1,
          volume: 1
        },
        four: {
          drum: { drum: 'spring', sampleRate: 2.3, volume: 1 },
          times: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
          sampleRate: 1,
          volume: 1
        },
        five: {
          drum: { drum: 'ceng', sampleRate: 0.8, volume: 1 },
          times: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1],
          sampleRate: 1,
          volume: 1
        },
        six: {
          drum: { drum: 'bowl', sampleRate: 0.6, volume: 0.7 },
          times: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          sampleRate: 1,
          volume: 1
        }
      };
    default:
      return;
  }
}
