import { Link, useLocation } from 'react-router-dom';
import '.././../Styles/Components/Settings.css';

export default function SettingsLink({ forInstrument }) {
  const path = useLocation().pathname;
  const capitalized = `${forInstrument[0].toUpperCase()}${forInstrument.substring(1, forInstrument.length)}`;
  return (
    <div>
      {path === `/instrument/${forInstrument}` ? (
        <Link to={`/instrument/${forInstrument}/settings`} className="settings-link">
          🎛
        </Link>
      ) : (
        <Link to={`/instrument/${forInstrument}`}>Hide settings</Link>
      )}
    </div>
  );
}
