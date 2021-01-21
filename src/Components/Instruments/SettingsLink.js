import { Link, useLocation } from 'react-router-dom';
import '.././../Styles/Components/Settings.css';

export default function SettingsLink({ forInstrument }) {
  const path = useLocation().pathname;
  const capitalized = `${forInstrument[0].toUpperCase()}${forInstrument.substring(1, forInstrument.length)}`;

  return (
    <div className="settings-link-container">
      {path === `/instrument/${forInstrument}` ? (
        <div>
          <Link to={`${forInstrument}/settings`} className="settings-link">
            🎛
          </Link>
          <Link to={`${forInstrument}/effects`}>Effects</Link>
        </div>
      ) : (
        <Link to={`/instrument/${forInstrument}`} className="hide-settings-btn link-btn">
          Hide {forInstrument} settings
        </Link>
      )}
    </div>
  );
}
