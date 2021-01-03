import './App.css';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import { createContext } from 'react';
import { useEffect, useState } from 'react';
import Home from './Pages/Home';
import About from './Pages/About';
import Host from './Pages/Host';
import Join from './Pages/Join';
import Instrument from './Pages/Instrument';
import socket from './clientSocketHandler';
import Nav from './Components/Nav/Nav';
import MusicData from './MusicLogic/MusicData';

export const Context = createContext();

socket.on('hello', (data) => {
  console.log(`The socket says ${data}`);
});

function App() {
  const [sessionPin, setSessionPin] = useState(null);
  const [socketId, setSocketId] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    console.log('Username has been set to ' + userName);
    console.log('Socket Id was set to: ' + socketId);
    console.log('Session pin was set to ' + sessionPin);
  }, [userName, socketId, sessionPin]);
  const setAll = (params) => {
    setSessionPin(params.sessionPin);
    setSocketId(params.socketId);
    setUserName(params.userName);
  };
  return (
    <Context.Provider
      value={{
        sessionPin,
        socketId,
        userName,
        setSessionPin,
        setSocketId,
        setUserName,
        setAll
      }}
    >
      <Router>
        <div className="App">
          <Nav sessionPin={sessionPin} sessionId={socketId} userName={userName}></Nav>
          <Route path="/" exact component={Home}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/host" component={Host}></Route>
          <Route path="/join" component={Join}></Route>
          <Route path="/instrument" component={Instrument}></Route>
        </div>
      </Router>
    </Context.Provider>
  );
}

export default App;
