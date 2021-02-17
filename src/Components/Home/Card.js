import '../../Styles/Pages/Home.css';
import iosSource from '../../assets/ios_install.PNG';
import androidSource from '../../assets/android_install.png';

export default function Card({ title, info, emoji, install }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="emoji">{emoji}</div>
      <p>
        {info}
        {install && (
          <div
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}
          >
            <h5>In Safari on iOS</h5>
            <div>
              ① <img src={iosSource} alt="ios  button" style={{ borderRadius: '8px' }} width="40px" /> <br></br>{' '}
            </div>
            ② "Add to Home Screen"
            <h5>In Chrome on Android</h5>
            <div>
              ① <img src={androidSource} alt="ios  button" style={{ borderRadius: '8px' }} />
            </div>
            ② "Add to Home Screen"
          </div>
        )}
      </p>
    </div>
  );
}
