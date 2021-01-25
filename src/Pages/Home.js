import { Link } from 'react-router-dom';
import '../Styles/Pages/Home.css';
import { useContext } from 'react';
import { Context } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  const loggedIn = useContext(Context).sessionPin;
  return (
    <div>
      <div className="home-container">
        <h1>HOOTENANNY</h1>
        <div className="home-button-container">
          <Link to="/host" className="home-btn">
            Host a room
          </Link>
          <Link to="/join" className="home-btn">
            Join a room
          </Link>
          <Link to="/instrument/keyboard" className="home-btn">
            {loggedIn ? 'Instrument' : 'Play solo'}
          </Link>
        </div>
      </div>
      <div className="home-content">
        <p>Hootenanny lets you improvise music with your friends live online. Here's how it works:</p>
        <ul>
          <li>⭐️Step 1: Click on "Host a room" to generate a pin number 🎰</li>
          <li>⭐️Step 2: Send the pin number to your friends 💃🕺</li>
          <li>⭐️Step 3:Choose an instrument and start playing ✨</li>
        </ul>
      </div>
      <footer>
        <div className="link-icons">
          <a href="https://www.facebook.com/">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://github.com/HatAndBread">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
        Enjoy Hootenanny? Buy me a <a href="https://github.com/HatAndBread">beer 🍺</a> or
        <a href="https://github.com/HatAndBread"> give me a job.</a>
      </footer>
    </div>
  );
}
