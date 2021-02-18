import '../../Styles/Pages/Home.css';
import iosSource from '../../assets/ios_install.PNG';
import androidSource from '../../assets/android_install.png';

export default function Card({ title, info, emoji, install }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="emoji">{emoji}</div>

      <p>{info}</p>
      {install && (
        <div
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}
        >
          It is possible to install One Hand Band on the home screen of your mobile device without using an app store.
          It's free! <br></br>
          <div
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}
          >
            <br></br>
            <div>
              ①
              <img src={iosSource} alt="ios  button" style={{ borderRadius: '8px' }} width="40px" /> on iOS or
              <img src={androidSource} alt="ios  button" style={{ borderRadius: '8px' }} />
              on Android.
            </div>
            <div>
              <br></br>② "Add to Home Screen"
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
