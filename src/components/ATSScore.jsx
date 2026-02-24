import './ATSScore.css';

function ATSScore({ score, suggestions, improvements }) {
  const getScoreColor = () => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreLabel = () => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Work';
  };

  return (
    <div className="ats-score-card">
      <div className="ats-score-header">
        <h3>ATS Readiness Score</h3>
        <div className="ats-score-value" style={{ color: getScoreColor() }}>
          {score}
          <span className="ats-score-label">{getScoreLabel()}</span>
        </div>
      </div>

      <div className="ats-score-meter">
        <div 
          className="ats-score-fill" 
          style={{ 
            width: `${score}%`,
            background: getScoreColor()
          }}
        />
      </div>

      {improvements && improvements.length > 0 && (
        <div className="ats-improvements">
          <h4>Top 3 Improvements</h4>
          <ul>
            {improvements.map((improvement, index) => (
              <li key={index}>{improvement}</li>
            ))}
          </ul>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="ats-suggestions">
          <h4>Missing Items</h4>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ATSScore;
