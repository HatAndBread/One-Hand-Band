import { useState, useEffect, useContext } from 'react';
import { Context } from '../App';
import Instruments from './Instruments';
import socket from '../clientSocketHandler';
import '../Styles/Pages/Host.css';

export default function Host() {
  const context = useContext(Context);
  const [pinText, setPinText] = useState('');
  const [pinSet, setPinSet] = useState(false);
  useEffect(() => {
    if (!pinSet) {
      socket.emit('getPin');
      setPinSet(true);
    }
  }, [pinSet]);
  useEffect(() => {
    socket.on('getPin', (data, session) => {
      console.log(data);
      setPinText(data.pin);
      context.setAll({ userName: data.userName, socketId: data.socketId, sessionPin: data.pin });
      context.setHost(true);
      context.setUsers(session);
    });

    return () => {
      socket.removeAllListeners('getPin');
    };
  }, [context]);

  return (
    <div>
      {pinSet && <Instruments />}
      {!pinSet && <div>'Fetching pin... Please wait✨'</div>}
      <div className="pin-display">
        <div>{pinText}</div>
      </div>
    </div>
  );
}
