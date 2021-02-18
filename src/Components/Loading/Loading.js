import { useContext, useState } from 'react';
import { Context } from '../../App';
import '../../Styles/Components/Loading.css';
import loader from '../../assets/loader.gif';

export default function Loading() {
  const openedFromLanding = useContext(Context).openedFromLanding;
  const [buttonClicked, setButtonClicked] = useState(false);
  return (
    <div className="loading">
      {openedFromLanding ? (
        <div>
          <div>Loading audio files...</div>
          <div>Please wait ✨</div>
          <img src={loader} alt={' '} />
        </div>
      ) : (
        <div>
          {!buttonClicked ? (
            <button
              onClick={() => {
                setButtonClicked(true);
              }}
            >
              Load audio ✨
            </button>
          ) : (
            <div>
              <div>Loading audio files...</div>
              <div>Please wait ✨</div>
              <img src={loader} alt={' '} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
