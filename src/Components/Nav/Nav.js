import { Link } from 'react-router-dom';

export default function Nav(props) {
  return (
    <nav>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>Room: {props.sessionPin ? props.sessionPin : 'Not joined'}</li>
          {props.userName && <li>User name: {props.userName}</li>}
        </ul>
      </nav>
    </nav>
  );
}
