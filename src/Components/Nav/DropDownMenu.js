import '../../Styles/Components/Nav.css';
import { useRef, useContext, useEffect } from 'react';
import { Context } from '../../App';
export default function DropDownMenu({ sessionPin, userName }) {
  const dropDownOut = useContext(Context).dropDownOut;
  const setDropDownOut = useContext(Context).setDropDownOut;
  const users = useContext(Context).users;
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
    <div>
      <div ref={menu} className="dropdown-menu" onClick={closeMenu}>
        <div className="dropdown-closer">X</div>
        <h3>Session pin: {sessionPin ? sessionPin : 'Not joined'}</h3>
        <h3>Your username: {userName ? userName : 'None'}</h3>
        <h3>Current band members: </h3>
        <ol>
          {users &&
            users.users &&
            users.users.map((user) => {
              return (
                <li key={user.userName}>
                  {user.userName}: {user.instrument}
                </li>
              );
            })}
        </ol>
      </div>
    </div>
  );
}
