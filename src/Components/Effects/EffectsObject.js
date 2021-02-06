export default function EffectsObject() {
  return {
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
    }
  };
}
