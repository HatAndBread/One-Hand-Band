import { Link } from 'react-router-dom';
import Hamburger from './Hamburger';
import '../../Styles/Components/Nav.css';
export default function Nav(props) {
  return (
    <nav>
      <ul>
        <li>
          <Link className="home-link" to="/">
            🎼
          </Link>
        </li>
        <li>
          <Hamburger />
        </li>
      </ul>
    </nav>
  );
}
