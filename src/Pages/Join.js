import '../Styles/Pages/Join.css';
import { useState, useEffect, useContext } from 'react';
import Keypad from '../Components/Join/Keypad';
import { Context } from '../App';
import socket from '../clientSocketHandler';

export default function Join() {
  const context = useContext(Context);
  const [enteredPin, setEnteredPin] = useState('');
  useEffect(() => {
    socket.on('joinSuccess', (data) => {
      console.log(data);
      context.setUserName(data.userName);
      context.setSocketId(data.socketId);
      context.setSessionPin(data.pin);
    });
    socket.on('joinFailure', () => {
      alert("That session doesn't seem to exist. Please try again! 🌈");
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
  useEffect(() => {
    console.log(enteredPin);
  }, [enteredPin]);
  return (
    <div>
      <div>This is the join page</div>
      <Keypad enteredPin={enteredPin} keyUp={keyUp} />
    </div>
  );
}
