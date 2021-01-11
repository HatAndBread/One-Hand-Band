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
import defaultEnvelopeSettings from './Components/Settings/DefaultEnvelopeSettings';
import effectsObject from './Components/Effects/EffectsObject';

export const Context = createContext();

function App() {
  const [sessionPin, setSessionPin] = useState(null);
  const [socketId, setSocketId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [musicData, setMusicData] = useState(null);
  const [myInstrument, setMyInstrument] = useState(undefined);
  const [users, setUsers] = useState([]);
  const [host, setHost] = useState(false);
  const [globalInstrumentSettings, setGlobalInstrumentSettings] = useState({
    keyboard: { envelope: defaultEnvelopeSettings, volume: 0.5, rampTo: 0, wave: 'sine' },
    drone: { envelope: defaultEnvelopeSettings, volume: 0.5 },
    theremin: { envelope: defaultEnvelopeSettings, volume: 0.5 },
    noise: { volume: 0.5 },
    skronk: { volume: 0.5 },
    percussion: { volume: 0.5 }
  });
  const [globalEffectsSettings, setGlobalEffectsSettings] = useState({
    keyboard: effectsObject(),
    drone: effectsObject(),
    theremin: effectsObject(),
    noise: effectsObject(),
    skronk: effectsObject(),
    percussion: effectsObject()
  });
  const [droneData, setDroneData] = useState({
    one: { wave: 'sine', volume: '-4', pitch: 'C3', playing: false },
    two: { wave: 'sine', volume: '-4', pitch: 'C3', playing: false },
    three: { wave: 'sine', volume: '-4', pitch: 'C3', playing: false }
  });

  const getGlobalSettings = () => {
    return JSON.parse(JSON.stringify(globalInstrumentSettings));
  };
  const getGlobalEffects = () => {
    return JSON.parse(JSON.stringify(globalEffectsSettings));
  };

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
    const handleInstrumentChange = (session) => {
      setUsers(session);
    };
    socket.on('newMember', handleInstrumentChange);
    socket.on('instrumentChange', handleInstrumentChange);
    console.info(users);
    return () => {
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
        setHost,
        globalInstrumentSettings,
        setGlobalInstrumentSettings,
        globalEffectsSettings,
        setGlobalEffectsSettings,
        droneData,
        setDroneData,
        getGlobalEffects,
        getGlobalSettings
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
