export default function EffectsObject() {
  return {
    vibrato: {
      wet: { level: 0, min: 0, max: 1, step: 0.05 },
      depth: { level: 0, min: 0, max: 1, step: 0.05 },
      freq: { level: 0, min: 0, max: 1, step: 0.05 },
      on: false
    },
    pulverizer: {
      level: { level: 0, min: 0, max: 1, step: 0.05 },
      on: false
    },
    distortion: {
      wet: { level: 0, min: 0, max: 1, step: 0.05 },
      level: { level: 0, min: 0, max: 1, step: 0.05 },
      on: false
    },
    delay: {
      wet: { level: 0, min: 0, max: 1, step: 0.05 },
      time: { level: 0, min: 0, max: 1, step: 0.05 },
      feedback: { level: 0, min: 0, max: 1, step: 0.05 },
      on: false
    },
    pitchShifter: {
      wet: { level: 0, min: 0, max: 1, step: 0.05 },
      shift: { level: 0, min: -1, max: 1, step: 0.05 },
      on: false
    }
  };
}
