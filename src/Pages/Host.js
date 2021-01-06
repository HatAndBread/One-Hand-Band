import { useState, useEffect, useContext } from 'react';
import { Context } from '../App';
import socket from '../clientSocketHandler';

export default function Host() {
  const context = useContext(Context);
  const [pinText, setPinText] = useState('');
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

  const generatePin = () => {
    socket.emit('getPin');
  };
  return (
    <div>
      <div className="pin-display">{pinText}</div>
      <button onClick={generatePin}>Generate Pin</button>
    </div>
  );
}
