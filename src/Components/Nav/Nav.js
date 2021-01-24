import { Link } from 'react-router-dom';
import '../../Styles/Components/Nav.css';

export default function Nav(props) {
  return (
    <nav>
      <nav>
        <ul>
          <li>
            <Link to="/" style={{ fontSize: '22px' }}>
              🎼
            </Link>
          </li>
          <li>Room: {props.sessionPin ? props.sessionPin : 'Not joined'}</li>
          {props.userName && <li>User name: {props.userName}</li>}
        </ul>
      </nav>
    </nav>
  );
}
