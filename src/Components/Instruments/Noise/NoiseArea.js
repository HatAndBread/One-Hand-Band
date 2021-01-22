import '../../../Styles/Components/Noise.css';

export default function NoiseArea({ name }) {
  return (
    <div className="noise-area-container" data-name={name}>
      <div className="noise-label">{name}</div>
    </div>
  );
}
