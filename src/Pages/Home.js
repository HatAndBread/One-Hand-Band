import { Link } from 'react-router-dom';

export default function Home() {
  const handleClick = async () => {
    const res = await fetch('/hi');
    const data = await res.json();
    console.log(data);
  };
  return (
    <div>
      <div>
        <button onClick={handleClick}>Dummy</button>
        <Link to="/host">Host a room</Link>
        <Link to="/join">Join a room</Link>
        <Link to="/instrument">Play solo</Link>
      </div>
    </div>
  );
}
