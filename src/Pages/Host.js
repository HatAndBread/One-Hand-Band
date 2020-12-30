import { useState, useEffect, useContext } from 'react';
import socket from '../clientSocketHandler';

export default function Host() {
  const [pinText, setPinText] = useState('');
  useEffect(() => {
    socket.on('getPin', (data) => {
      console.log(data);
      setPinText(data);
    });
  }, []);

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
