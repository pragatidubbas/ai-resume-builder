import Navigation from '../components/Navigation';
import './Proof.css';

function Proof() {
  return (
    <div className="proof-page">
      <Navigation />
      <div className="proof-container">
        <div className="proof-content">
          <h1 className="proof-title">Proof of Work</h1>
          <p className="proof-subtitle">
            This section will contain artifacts and evidence of your resume building process.
          </p>
          
          <div className="proof-placeholder">
            <div className="proof-card">
              <h3>Resume Versions</h3>
              <p>Track different versions of your resume</p>
            </div>
            
            <div className="proof-card">
              <h3>Export History</h3>
              <p>View your export and download history</p>
            </div>
            
            <div className="proof-card">
              <h3>ATS Score</h3>
              <p>See how your resume performs with ATS systems</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Proof;
