import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { useEffect, useState, createContext, useRef } from 'react';
import DropDownMenu from './Components/Nav/DropDownMenu';
import Home from './Pages/Home';
import About from './Pages/About';
import Host from './Pages/Host';
import Join from './Pages/Join';
import Instrument from './Pages/Instruments';
import socket from './clientSocketHandler';
import Nav from './Components/Nav/Nav';
import playMusic from './MusicLogic/playMusic';
import defaultEnvelopeSettings from './Components/Settings/DefaultEnvelopeSettings';
import effectsObject from './Components/Effects/EffectsObject';
import percussionObj from './Components/Instruments/Percussion/percussionObj';
import handleSettings from './MusicLogic/handleSettings';
import handleEffects from './MusicLogic/handleEffects';
import SoundSet from './MusicLogic/SoundSet';
import { getCurrentBeat } from './MusicLogic/Percussion';
import { start, context } from 'tone';
import getChord from './GlobalMethods/getChord';
import handlePercussion from './MusicLogic/handlePercussion';

export const Context = createContext();

let loaded = 0;
export const setLoaded = () => (loaded += 1);

function App() {
  const [instrumentsLoaded, setInstrumentsLoaded] = useState(false);
  useEffect(() => {
    instrumentsLoaded && console.log('all instruments loaded');
  }, [instrumentsLoaded]);
  const [soundSet, SetSoundSet] = useState(null);
  const [sessionPin, setSessionPin] = useState(null);
  const [socketId, setSocketId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [musicData, setMusicData] = useState(null);
  const [myInstrument, setMyInstrument] = useState(undefined);
  const [users, setUsers] = useState({});
  const [host, setHost] = useState(false);
  const [audioContextStarted, setAudioContextStarted] = useState(false);
  const [dropDownOut, setDropDownOut] = useState(false);
  const [drumMachinePlaying, setDrumMachinePlaying] = useState(false);
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
  const [globalBeat, setGlobalBeat] = useState(null);
  const [droneData, setDroneData] = useState({
    one: { wave: 'sine', volume: '-4', pitch: 'C3', playing: false },
    two: { wave: 'sine', volume: '-4', pitch: 'C3', playing: false },
    three: { wave: 'sine', volume: '-4', pitch: 'C3', playing: false }
  });
  const [droneOctave, setDroneOctave] = useState(4);
  const [droneChord, setDroneChord] = useState(null);
  const [stopChord, setStopChord] = useState(false);
  const [chordUpdated, setChordUpdated] = useState(false);
  const [chordProgression, setChordProgression] = useState([]);
  const [chordProgressionPlaying, setChordProgressionPlaying] = useState(false);
  const [fullLengthChordProgression, setFullLengthChordProgression] = useState([]);
  const timesThroughChordLoop = useRef(0);
  const [chordChange, setChordChange] = useState(false);
  const [percussionData, setPercussionData] = useState(percussionObj);
  const [bpm, setBpm] = useState('90');
  const [timeSignature, setTimeSignature] = useState('4');
  const loopObject = {
    one: { drum: percussionData.one, times: new Array(timeSignature * 4) },
    two: { drum: percussionData.two, times: new Array(timeSignature * 4) },
    three: { drum: percussionData.three, times: new Array(timeSignature * 4) },
    four: { drum: percussionData.four, times: new Array(timeSignature * 4) },
    five: { drum: percussionData.five, times: new Array(timeSignature * 4) },
    six: { drum: percussionData.six, times: new Array(timeSignature * 4) }
  };
  const [loopData, setLoopData] = useState(loopObject);
  const [keyboardInfinity, setKeyboardInfinity] = useState(false);
  const [mainOctave, setMainOctave] = useState(2);

  const getGlobalSettings = () => {
    return JSON.parse(JSON.stringify(globalInstrumentSettings));
  };
  const getGlobalEffects = () => {
    return JSON.parse(JSON.stringify(globalEffectsSettings));
  };

  useEffect(() => {
    setChordProgression([]);
  }, [timeSignature]);

  useEffect(() => {
    if (audioContextStarted) {
      handlePercussion(
        {
          type: 'percussion',
          drum: 'rhythmMachine',
          loop: loopData,
          socketId: socketId,
          timeSignature: timeSignature,
          bpm: bpm,
          status: 'update'
        },
        soundSet
      );
    }
  }, [bpm, timeSignature, socketId, loopData, audioContextStarted, soundSet]);

  useEffect(() => {
    const startContext = () => {
      const init = () => {
        start();
        SetSoundSet(new SoundSet());
        setAudioContextStarted(true);
        getCurrentBeat((beat) => {
          setGlobalBeat(beat);
        });
      };
      if (context.state !== 'suspended') {
        init();
      } else {
        // for stupid safari
        context.resume();
        context.on('statechange', () => {
          context.destination.volume.value = -3;
          context.lookAhead = 0.2;
          init();
        });
      }
      const interval = setInterval(() => {
        if (loaded === 4) {
          setInstrumentsLoaded(true);
          clearInterval(interval);
        }
      }, 10);
      document.removeEventListener('click', startContext, false);
    };
    document.addEventListener('click', startContext);
  }, []);

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
    return () => {
      socket.removeAllListeners('instrumentChange', handleInstrumentChange);
      socket.removeAllListeners('newMember', handleInstrumentChange);
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

  useEffect(() => {
    playMusic({ data: 'userUpdate', users: users.users });
  }, [users]);

  useEffect(() => {
    const handleSocketMusic = (musicData) => {
      playMusic(musicData, soundSet);
    };
    socket.on('musicData', handleSocketMusic);
    return () => {
      socket.removeAllListeners('musicData', handleSocketMusic);
    };
  });

  useEffect(() => {
    const handleSettingsChange = (settings, socketId, instrument, sessionPin) => {
      handleSettings(settings, socketId, instrument, sessionPin, true, soundSet);
      const copy = JSON.parse(JSON.stringify(globalInstrumentSettings));
      copy[instrument] = settings;
      setGlobalInstrumentSettings(copy);
    };
    socket.on('settingsChange', handleSettingsChange);
    return () => socket.removeAllListeners('settingsChange', handleSettingsChange);
  });

  useEffect(() => {
    const handleEffectsChange = (effects, socketId, instrument, sessionPin) => {
      handleEffects(effects, socketId, instrument, sessionPin, true, soundSet);
      setGlobalEffectsSettings(effects);
    };
    socket.on('effectsChange', handleEffectsChange);
    return () => socket.removeAllListeners('settingsChange', handleEffectsChange);
  });

  useEffect(() => {
    if (sessionPin) {
      if (musicData) {
        socket.emit('musicData', musicData, sessionPin, userName);
        setMusicData(null);
      }
    } else {
      if (musicData) {
        playMusic(musicData, soundSet);
        setMusicData(null);
      }
    }
  }, [musicData, sessionPin, userName, soundSet]);

  useEffect(() => {
    if (chordProgressionPlaying && fullLengthChordProgression[0]) {
      if (globalBeat === 0) {
        const timesGreater = fullLengthChordProgression.length / (timeSignature * 4);
        if (timesGreater > 1) {
          if (timesThroughChordLoop.current + 1 < timesGreater) {
            timesThroughChordLoop.current += 1;
          } else {
            timesThroughChordLoop.current = 0;
          }
        }
      }
      const theBeat = timesThroughChordLoop.current * (timeSignature * 4) + globalBeat;
      if (fullLengthChordProgression[theBeat]) {
        if (theBeat === fullLengthChordProgression.length) {
          if (fullLengthChordProgression[0].chord !== 'silence') {
            setDroneChord(fullLengthChordProgression[0].chord);
            setChordUpdated(false);
            setStopChord(false);
          } else {
            setStopChord(true);
          }
        } else if (fullLengthChordProgression[theBeat].chord === 'silence') {
          setStopChord(true);
        } else if (globalBeat !== fullLengthChordProgression.length) {
          setDroneChord(fullLengthChordProgression[theBeat].chord);
          setChordUpdated(false);
          setStopChord(false);
        }
      }
    }
  }, [globalBeat, fullLengthChordProgression, chordProgressionPlaying, timeSignature]);

  useEffect(() => {
    // update chord progression globally
    if (droneChord && !chordUpdated) {
      const copy = JSON.parse(JSON.stringify(droneData));
      const notes = getChord(droneChord, droneOctave);
      copy.one.pitch = notes[0];
      copy.two.pitch = notes[1];
      copy.three.pitch = notes[2];
      setDroneData(copy);
      setChordUpdated(true);
      copy.socketId = socketId;
      copy.instrument = 'drone';
      setMusicData(copy);
    }
  }, [droneChord, droneData, droneOctave, setDroneData, chordUpdated, setChordUpdated, setChordChange, socketId]);

  useEffect(() => {
    if (chordProgressionPlaying) {
      if (stopChord) {
        const copy = JSON.parse(JSON.stringify(droneData));
        copy.one.playing = false;
        copy.two.playing = false;
        copy.three.playing = false;
        copy.socketId = socketId;
        copy.instrument = 'drone';
        setMusicData(copy);
      }
    }
  }, [stopChord, chordProgressionPlaying, droneData, droneChord, droneOctave, socketId]);

  return (
    <Context.Provider
      value={{
        instrumentsLoaded,
        soundSet,
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
        globalBeat,
        droneData,
        setDroneData,
        droneOctave,
        setDroneOctave,
        chordChange,
        setChordChange,
        droneChord,
        setDroneChord,
        chordUpdated,
        setChordUpdated,
        chordProgression,
        setChordProgression,
        chordProgressionPlaying,
        setChordProgressionPlaying,
        fullLengthChordProgression,
        setFullLengthChordProgression,
        getGlobalEffects,
        getGlobalSettings,
        percussionData,
        setPercussionData,
        drumMachinePlaying,
        setDrumMachinePlaying,
        bpm,
        setBpm,
        timeSignature,
        setTimeSignature,
        loopData,
        setLoopData,
        loopObject,
        keyboardInfinity,
        setKeyboardInfinity,
        mainOctave,
        setMainOctave,
        dropDownOut,
        setDropDownOut,
        audioContextStarted
      }}
    >
      <Router>
        <div className="App">
          <DropDownMenu sessionPin={sessionPin} sessionId={socketId} userName={userName} />
          <Nav></Nav>
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
