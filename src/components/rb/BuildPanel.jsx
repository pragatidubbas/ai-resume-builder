import { useState } from 'react';
import { rbStore } from '../../store/rbStore';
import './BuildPanel.css';

function BuildPanel({ step, promptText }) {
  const [copied, setCopied] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [status, setStatus] = useState('pending');

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScreenshot = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = {
          screenshot: event.target.result,
          status,
          timestamp: new Date().toISOString()
        };
        setScreenshot(event.target.result);
        rbStore.setArtifact(step, data);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    if (screenshot) {
      const data = {
        screenshot,
        status: newStatus,
        timestamp: new Date().toISOString()
      };
      rbStore.setArtifact(step, data);
    }
  };

  return (
    <div className="build-panel-content">
      <h3>Build Instructions</h3>
      
      <div className="prompt-section">
        <textarea 
          className="prompt-textarea" 
          value={promptText} 
          readOnly
          rows={8}
        />
        <button className="copy-btn" onClick={handleCopy}>
          {copied ? '✓ Copied!' : 'Copy This Into Lovable'}
        </button>
      </div>

      <div className="action-section">
        <a 
          href="https://lovable.dev" 
          target="_blank" 
          rel="noopener noreferrer"
          className="lovable-btn"
        >
          Build in Lovable →
        </a>
      </div>

      <div className="status-section">
        <h4>Result</h4>
        <div className="status-buttons">
          <button 
            className={`status-btn success ${status === 'worked' ? 'active' : ''}`}
            onClick={() => handleStatusChange('worked')}
          >
            ✓ It Worked
          </button>
          <button 
            className={`status-btn error ${status === 'error' ? 'active' : ''}`}
            onClick={() => handleStatusChange('error')}
          >
            ✗ Error
          </button>
        </div>
      </div>

      <div className="screenshot-section">
        <label className="screenshot-label">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleScreenshot}
            style={{ display: 'none' }}
          />
          <span className="screenshot-btn">
            {screenshot ? '✓ Screenshot Added' : '+ Add Screenshot'}
          </span>
        </label>
        {screenshot && (
          <img src={screenshot} alt="Result" className="screenshot-preview" />
        )}
      </div>
    </div>
  );
}

export default BuildPanel;
