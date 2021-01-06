import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { createContext } from 'react';
import { useEffect, useState } from 'react';
import Home from './Pages/Home';
import About from './Pages/About';
import Host from './Pages/Host';
import Join from './Pages/Join';
import Instrument from './Pages/Instrument';
import socket from './clientSocketHandler';
import Nav from './Components/Nav/Nav';
import playMusic from './MusicLogic/playMusic';

export const Context = createContext();

function App() {
  const [sessionPin, setSessionPin] = useState(null);
  const [socketId, setSocketId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [musicData, setMusicData] = useState(null);
  const [myInstrument, setMyInstrument] = useState(undefined);
  const [users, setUsers] = useState([]);
  const [host, setHost] = useState(false);

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
  useEffect(() => {
    const handleNewMember = (session) => {
      setUsers(session);
    };
    const handleInstrumentChange = (session) => {
      setUsers(session);
    };
    socket.on('newMember', handleNewMember);
    socket.on('instrumentChange', handleInstrumentChange);
    console.info(users);
    return () => {
      socket.removeAllListeners('newMember', handleNewMember);
      socket.removeAllListeners('instrumentChange', handleInstrumentChange);
    };
  }, [users]);

  useEffect(() => {
    console.log('instrument changed to ' + myInstrument);
    if (sessionPin) {
      socket.emit('instrumentChange', myInstrument, sessionPin, userName);
    }
  }, [myInstrument, sessionPin, userName]);

  useEffect(() => {
    if (!sessionPin) {
      const handleResponse = (id) => {
        setSocketId(id);
        playMusic({ data: 'userUpdate', users: [{ socketId: id, instrument: myInstrument }] });
      };
      socket.emit('getSocketId');
      socket.on('getSocketId', handleResponse);
      return () => {
        socket.removeAllListeners('getSocketId', handleResponse);
      };
    }
  }, [myInstrument, sessionPin]);
  return (
    <Context.Provider
      value={{
        sessionPin,
        socketId,
        userName,
        setSessionPin,
        setSocketId,
        setUserName,
        setAll,
        musicData,
        setMusicData,
        myInstrument,
        setMyInstrument,
        users,
        setUsers,
        host,
        setHost
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
