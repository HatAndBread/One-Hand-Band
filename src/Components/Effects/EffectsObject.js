export default function EffectsObject() {
  return {
    vibrato: {
      wet: { level: 0.5, min: 0, max: 1, step: 0.05 },
      depth: { level: 0.2, min: 0, max: 1, step: 0.05 },
      freq: { level: 0.4, min: 0, max: 20, step: 0.05 },
      on: false
    },
    pulverizer: {
      level: { level: 1, min: 1, max: 16, step: 1 },
      on: false
    },
    distortion: {
      wet: { level: 0.5, min: 0, max: 1, step: 0.05 },
      level: { level: 1, min: 0.05, max: 3, step: 0.05 },
      on: false
    },
    delay: {
      wet: { level: 0.5, min: 0, max: 1, step: 0.05 },
      time: { level: 0.2, min: 0, max: 1, step: 0.05 },
      feedback: { level: 0.15, min: 0, max: 1, step: 0.05 },
      on: false
    },
    pitchShifter: {
      wet: { level: 0.5, min: 0, max: 1, step: 0.05 },
      shift: { level: 0, min: -36, max: 36, step: 1 },
      on: false
    }
  };
}
