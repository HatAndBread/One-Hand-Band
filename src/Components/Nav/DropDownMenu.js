import '../../Styles/Components/Nav.css';
import { useRef, useContext, useEffect } from 'react';
import { Context } from '../../App';
export default function DropDownMenu({ sessionPin, sessionId, userName }) {
  const dropDownOut = useContext(Context).dropDownOut;
  const setDropDownOut = useContext(Context).setDropDownOut;
  const menu = useRef();
  useEffect(() => {
    if (dropDownOut) {
      menu.current.style.top = '0px';
    }
  }, [dropDownOut]);
  const closeMenu = () => {
    menu.current.style.top = '-100vh';
    setDropDownOut(false);
  };

  return (
    <div ref={menu} className="dropdown-menu" onClick={closeMenu}>
      <ul>
        <li>Session pin: {sessionPin ? sessionPin : 'Not joined'}</li>
        <li>Username: {userName ? userName : 'None'}</li>
      </ul>
    </div>
  );
}
