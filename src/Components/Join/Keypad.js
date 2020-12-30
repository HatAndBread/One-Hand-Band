import { useEffect, useRef } from 'react';

export default function Keypad(props) {
  const tdClick = (e) => {
    props.keyUp(e);
  };
  return (
    <div>
      <table>
        <caption>{props.enteredPin}</caption>

        <tbody>
          <tr>
            <td onClick={tdClick}>1</td>
            <td onClick={tdClick}>2</td>
            <td onClick={tdClick}>3</td>
          </tr>
          <tr>
            <td onClick={tdClick}>4</td>
            <td onClick={tdClick}>5</td>
            <td onClick={tdClick}>6</td>
          </tr>
          <tr>
            <td onClick={tdClick}>7</td>
            <td onClick={tdClick}>8</td>
            <td onClick={tdClick}>9</td>
          </tr>
          <tr>
            <td onClick={tdClick}>←</td>
            <td onClick={tdClick}>0</td>
            <td onClick={tdClick}>OK</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
