import { useState, useEffect } from 'react';
import { rbStore } from '../../store/rbStore';
import './Proof.css';

function Proof() {
  const [proofData, setProofData] = useState({
    lovableLink: '',
    githubLink: '',
    deployLink: ''
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = rbStore.getProofData();
    setProofData(saved);
  }, []);

  const handleChange = (field, value) => {
    const updated = { ...proofData, [field]: value };
    setProofData(updated);
    rbStore.setProofData(updated);
  };

  const getStepStatus = (step) => {
    const artifact = rbStore.getArtifact(step);
    if (!artifact) return 'pending';
    return artifact.status === 'worked' ? 'complete' : 'error';
  };

  const allStepsComplete = () => {
    for (let i = 1; i <= 8; i++) {
      if (getStepStatus(i) !== 'complete') return false;
    }
    return true;
  };

  const handleCopySubmission = () => {
    const submission = `AI Resume Builder - Final Submission

Step Status:
${Array.from({ length: 8 }, (_, i) => {
  const step = i + 1;
  const status = getStepStatus(step);
  const emoji = status === 'complete' ? '✓' : status === 'error' ? '✗' : '○';
  return `${emoji} Step ${step}: ${status}`;
}).join('\n')}

Links:
Lovable: ${proofData.lovableLink || 'Not provided'}
GitHub: ${proofData.githubLink || 'Not provided'}
Deploy: ${proofData.deployLink || 'Not provided'}

Completed: ${new Date().toLocaleString()}`;

    navigator.clipboard.writeText(submission);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    { num: 1, name: 'Problem' },
    { num: 2, name: 'Market' },
    { num: 3, name: 'Architecture' },
    { num: 4, name: 'HLD' },
    { num: 5, name: 'LLD' },
    { num: 6, name: 'Build' },
    { num: 7, name: 'Test' },
    { num: 8, name: 'Ship' }
  ];

  return (
    <div className="proof-page">
      <div className="proof-header">
        <h1>AI Resume Builder — Proof of Completion</h1>
        <p>Project 3 — Build Track</p>
      </div>

      <div className="proof-content">
        <section className="steps-status">
          <h2>Build Steps Status</h2>
          <div className="steps-grid">
            {steps.map(step => {
              const status = getStepStatus(step.num);
              return (
                <div key={step.num} className={`step-card ${status}`}>
                  <div className="step-number">Step {step.num}</div>
                  <div className="step-name">{step.name}</div>
                  <div className="step-status">
                    {status === 'complete' && '✓ Complete'}
                    {status === 'error' && '✗ Error'}
                    {status === 'pending' && '○ Pending'}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="links-section">
          <h2>Project Links</h2>
          <div className="link-inputs">
            <div className="input-group">
              <label>Lovable Project Link</label>
              <input
                type="url"
                placeholder="https://lovable.dev/projects/..."
                value={proofData.lovableLink}
                onChange={(e) => handleChange('lovableLink', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>GitHub Repository</label>
              <input
                type="url"
                placeholder="https://github.com/..."
                value={proofData.githubLink}
                onChange={(e) => handleChange('githubLink', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Deployed Application</label>
              <input
                type="url"
                placeholder="https://..."
                value={proofData.deployLink}
                onChange={(e) => handleChange('deployLink', e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="submission-section">
          <button
            className="copy-submission-btn"
            onClick={handleCopySubmission}
            disabled={!allStepsComplete()}
          >
            {copied ? '✓ Copied!' : 'Copy Final Submission'}
          </button>
          {!allStepsComplete() && (
            <p className="warning">Complete all steps to enable submission</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default Proof;
