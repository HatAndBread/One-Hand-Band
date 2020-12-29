import './App.css';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import { SocketContext } from './index';
import { useContext, useEffect } from 'react';
import Home from './Pages/Home';
import About from './Pages/About';
import Host from './Pages/Host';
import Join from './Pages/Join';
import Instrument from './Pages/Instrument';

function App() {
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('hello', (data) => {
      console.log(`The socket says ${data}`);
    });
  }, [socket]);
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Route path="/" exact component={Home}></Route>
      <Route path="/about" component={About}></Route>
      <Route path="/host" component={Host}></Route>
      <Route path="/join" component={Join}></Route>
      <Route path="/instrument" component={Instrument}></Route>
    </Router>
  );
}

export default App;
