import { Link } from 'react-router-dom';
import '../Styles/Pages/Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-button-container">
        <Link to="/host" className="home-btn">
          Host a room
        </Link>
        <Link to="/join" className="home-btn">
          Join a room
        </Link>
        <Link to="/instrument" className="home-btn">
          Play solo
        </Link>
      </div>
    </div>
  );
}
