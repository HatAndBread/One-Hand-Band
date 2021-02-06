import '../../Styles/Pages/Home.css';

export default function Card({ title, info, emoji }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="emoji">{emoji}</div>
      <p>{info}</p>
    </div>
  );
}
