import './ATSScore.css';
import { getScoreCategory } from '../utils/atsScoring';

function ATSScore({ score, suggestions }) {
  const category = getScoreCategory(score);
  
  // Calculate circle properties
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="ats-score-card">
      <h3 className="ats-score-title">ATS Score</h3>
      
      <div className="ats-score-circle-container">
        <svg className="ats-score-circle" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            className="ats-score-circle-bg"
            cx="60"
            cy="60"
            r={radius}
          />
          {/* Progress circle */}
          <circle
            className="ats-score-circle-progress"
            cx="60"
            cy="60"
            r={radius}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
              stroke: category.color
            }}
          />
        </svg>
        <div className="ats-score-text">
          <span className="ats-score-number" style={{ color: category.color }}>
            {score}
          </span>
          <span className="ats-score-max">/100</span>
        </div>
      </div>

      <div className="ats-score-label" style={{ color: category.color }}>
        {category.label}
      </div>

      {suggestions.length > 0 && (
        <div className="ats-suggestions">
          <h4>Improvements</h4>
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
