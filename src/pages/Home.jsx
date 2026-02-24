import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-headline">
            Build a Resume<br />That Gets Read.
          </h1>
          <p className="home-subtext">
            Create a professional, ATS-friendly resume in minutes.<br />
            Clean design. Smart formatting. Zero hassle.
          </p>
          <button 
            className="home-cta"
            onClick={() => navigate('/builder')}
          >
            Start Building
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
