import { Link } from 'react-router-dom';
import '../Styles/Pages/Home.css';
import { useContext } from 'react';
import { Context } from '../App';

export default function Home() {
  const loggedIn = useContext(Context).sessionPin;
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
          {loggedIn ? 'Instrument' : 'Play solo'}
        </Link>
      </div>
    </div>
  );
}
