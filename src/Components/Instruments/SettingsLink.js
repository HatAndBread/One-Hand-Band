import { Link, useLocation } from 'react-router-dom';
import '.././../Styles/Components/Settings.css';

export default function SettingsLink({ forInstrument }) {
  const path = useLocation().pathname;
  console.log(path);
  const capitalized = `${forInstrument[0].toUpperCase()}${forInstrument.substring(1, forInstrument.length)}`;

  return (
    <div>
      {path === `/instrument/${forInstrument}` && (
        <div className="settings-link-container">
          <div className="link-container">
            <div>
              <Link to={`/instrument/${forInstrument}/settings`} className="settings-link">
                🎚
                <label style={{ fontSize: '11px' }}>{capitalized} Settings</label>
              </Link>
            </div>
            <div>
              <Link to={`/instrument/${forInstrument}/effects`} className="settings-link">
                🎛
                <label style={{ fontSize: '11px' }}>{capitalized} Effects</label>
              </Link>
            </div>
          </div>
        </div>
      )}
      {path === `/instrument/${forInstrument}/settings` && (
        <div className="link-container">
          <div>
            <Link to={`/instrument/${forInstrument}`} className="settings-link">
              🎚
              <label style={{ fontSize: '11px' }}>{capitalized} Settings</label>
            </Link>
          </div>
          <div>
            <Link to={`/instrument/${forInstrument}/effects`} className="settings-link">
              🎛
              <label style={{ fontSize: '11px' }}>{capitalized} Effects</label>
            </Link>
          </div>
        </div>
      )}
      {path === `/instrument/${forInstrument}/effects` && (
        <div className="link-container">
          <div>
            <Link to={`/instrument/${forInstrument}/settings`} className="settings-link">
              🎚
              <label style={{ fontSize: '11px' }}>{capitalized} Settings</label>
            </Link>
          </div>
          <div>
            <Link to={`/instrument/${forInstrument}`} className="settings-link">
              🎛
              <label style={{ fontSize: '11px' }}>{capitalized} Effects</label>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
