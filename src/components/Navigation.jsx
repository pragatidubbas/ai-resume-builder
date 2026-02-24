import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="top-nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo">AI Resume Builder</Link>
        <div className="nav-links">
          <Link 
            to="/builder" 
            className={`nav-link ${isActive('/builder') ? 'active' : ''}`}
          >
            Builder
          </Link>
          <Link 
            to="/preview" 
            className={`nav-link ${isActive('/preview') ? 'active' : ''}`}
          >
            Preview
          </Link>
          <Link 
            to="/proof" 
            className={`nav-link ${isActive('/proof') ? 'active' : ''}`}
          >
            Proof
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
