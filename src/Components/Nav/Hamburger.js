import { useContext } from 'react';
import { Context } from '../../App';
import '../../Styles/Components/Nav.css';
export default function Hamburger() {
  const dropDownOut = useContext(Context).dropDownOut;
  const setDropDownOut = useContext(Context).setDropDownOut;
  const hamburgerClick = () => {
    if (dropDownOut) {
      setDropDownOut(false);
    } else {
      setDropDownOut(true);
    }
  };
  return (
    <div>
      <div className="hamburger" onClick={hamburgerClick}>
        <div className="slice"></div>
        <div className="slice"></div>
        <div className="slice"></div>
      </div>
    </div>
  );
}
