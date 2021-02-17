import { Link } from 'react-router-dom';
import '../Styles/Pages/Home.css';
import { useContext } from 'react';
import { Context } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Card from '../Components/Home/Card';

export default function Home() {
  const loggedIn = useContext(Context).sessionPin;
  return (
    <div>
      <div className="home-container">
        <h1>ONE HAND BAND</h1>
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
        <h2>How It Works</h2>
        <div className="cards-container">
          <Card
            title={'Play Music Live Online'}
            info={`ONE HAND BAND lets you make music on your mobile device or computer. Choose from a sampler keyboard, drum machine, drone machine, or noise machine. Although One Hand Band works fine with an old fashioned desktop or laptop, a touch screen is highly recommended for the best experience. 👉📱✨`}
            emoji={'🪕'}
          />
          <Card
            title={'Play solo'}
            info={`Don't have any friends? Don't worry! Click "Play solo" to play by yourself.`}
            emoji={'🧚‍♀️'}
          />
          <Card
            title={'Play with friends'}
            info={`Have friends? Click "Host a room" and share the generated pin number with up to four of your friends. You should be able to hear the noise that your friends are making from anywhere in the world with only a slight delay.`}
            emoji={'👯‍♀️'}
          />
          <Card title={'Installation'} info={''} install={true} emoji={'📱'} />
        </div>
      </div>
      <footer>
        <div className="link-icons">
          <a className="fa" href="https://github.com/HatAndBread">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a className="fa" href="https://www.paypal.com/paypalme/hatandbread">
            <FontAwesomeIcon icon={faPaypal} />
          </a>
        </div>
        Enjoy Hootenanny? Buy me a <a href="https://www.paypal.com/paypalme/hatandbread">beer 🍺</a> or
        <a href="https://github.com/HatAndBread"> give me a job.</a>
      </footer>
    </div>
  );
}
