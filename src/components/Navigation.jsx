import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/resume', label: 'Resume' },
    { path: '/jobs', label: 'Jobs' },
    { path: '/analyze', label: 'Analyze' },
    { path: '/applications', label: 'Applications' },
    { path: '/proof', label: 'Practice' },
    { path: '/settings', label: 'Settings' }
  ];

  return (
    <nav className="top-nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo">JobPlatform</Link>
        <div className="nav-links">
          {navLinks.map(link => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
