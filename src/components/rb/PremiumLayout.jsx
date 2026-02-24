import { useNavigate } from 'react-router-dom';
import { rbStore } from '../../store/rbStore';
import './PremiumLayout.css';

function PremiumLayout({ step, title, children, buildPanel }) {
  const navigate = useNavigate();
  const currentArtifact = rbStore.getArtifact(step);
  const nextStepUnlocked = step === 8 || rbStore.isStepUnlocked(step + 1);

  const getStatusBadge = () => {
    if (currentArtifact) return { text: 'Complete', color: '#10b981' };
    return { text: 'In Progress', color: '#f59e0b' };
  };

  const status = getStatusBadge();

  const handleNext = () => {
    if (step < 8) {
      navigate(`/rb/0${step + 1}-${getStepPath(step + 1)}`);
    } else {
      navigate('/rb/proof');
    }
  };

  const getStepPath = (stepNum) => {
    const paths = ['problem', 'market', 'architecture', 'hld', 'lld', 'build', 'test', 'ship'];
    return paths[stepNum - 1];
  };

  return (
    <div className="premium-layout">
      <div className="top-bar">
        <div className="top-bar-left">AI Resume Builder</div>
        <div className="top-bar-center">Project 3 — Step {step} of 8</div>
        <div className="top-bar-right">
          <span className="status-badge" style={{ background: status.color }}>
            {status.text}
          </span>
        </div>
      </div>

      <div className="context-header">
        <h1>{title}</h1>
      </div>

      <div className="main-container">
        <div className="main-workspace">{children}</div>
        <div className="build-panel">{buildPanel}</div>
      </div>

      <div className="proof-footer">
        <button 
          className="next-btn" 
          disabled={!nextStepUnlocked}
          onClick={handleNext}
        >
          {step === 8 ? 'Go to Proof' : 'Next Step'}
        </button>
      </div>
    </div>
  );
}

export default PremiumLayout;
