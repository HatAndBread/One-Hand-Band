import { Link } from 'react-router-dom';
import Hamburger from './Hamburger';
import '../../Styles/Components/Nav.css';
import homeIcon from '../../assets/hero copy.jpg';

export default function Nav(props) {
  return (
    <nav>
      <ul>
        <li>
          <Link className="home-link" to="/">
            <img src={homeIcon} alt="" />
          </Link>
        </li>
        <li>
          <Hamburger />
        </li>
      </ul>
    </nav>
  );
}
