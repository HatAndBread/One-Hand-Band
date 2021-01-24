import '../Styles/Pages/Join.css';
import { useState, useEffect, useContext } from 'react';
import Keypad from '../Components/Join/Keypad';
import { Context } from '../App';
import socket from '../clientSocketHandler';
import { Redirect } from 'react-router-dom';

export default function Join() {
  const context = useContext(Context);
  const [enteredPin, setEnteredPin] = useState('');

  useEffect(() => {
    socket.on('joinSuccess', (data) => {
      context.setAll({ userName: data.userName, socketId: data.socketId, sessionPin: data.pin });
    });
    socket.on('joinFailure', () => {
      alert("That session doesn't seem to exist. Please try again! 🌈");
    });
    return () => {
      socket.removeAllListeners('joinSuccess');
      socket.removeAllListeners('joinFailure');
    };
  }, [context]);

  const join = () => {
    socket.emit('joinSession', enteredPin);
  };
  const keyUp = (e) => {
    let value;
    e.key ? (value = e.key) : (value = e.target.innerText);
    if (!isNaN(parseInt(value)) && enteredPin.length < 5) {
      setEnteredPin(enteredPin + value);
    } else if (value === 'Backspace' || value === '←') {
      setEnteredPin(enteredPin.substring(0, enteredPin.length - 1));
    } else if (value === 'Enter' || value === 'OK') {
      if (enteredPin.length === 5) {
        join();
      } else {
        alert('Please enter a 5 digit pin');
      }
    }
  };
  useEffect(() => {
    document.addEventListener('keyup', keyUp);

    return () => {
      document.removeEventListener('keyup', keyUp);
    };
  });
  return (
    <div className="keypad-container">
      <Keypad enteredPin={enteredPin} keyUp={keyUp} />
      {context.sessionPin && <Redirect to="/instrument"></Redirect>}
    </div>
  );
}
