import { useEffect, useState } from 'react';
import { unifiedStore } from '../../store/unifiedStore';
import { calculateReadinessScore, getReadinessCategory, getReadinessRecommendations } from '../../utils/readinessScore';
import { eventBus, Events } from '../../utils/eventBus';
import './ReadinessScoreWidget.css';

function ReadinessScoreWidget() {
  const [score, setScore] = useState({ overall: 0, breakdown: {} });
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const updateScore = () => {
      const data = unifiedStore.getData();
      const newScore = calculateReadinessScore(data);
      setScore(newScore);
      setRecommendations(getReadinessRecommendations(newScore.breakdown));
    };

    updateScore();

    // Subscribe to score update events
    const unsubscribe = eventBus.on(Events.READINESS_SCORE_CALCULATED, updateScore);

    return () => unsubscribe();
  }, []);

  const category = getReadinessCategory(score.overall);

  // Calculate circle properties
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score.overall / 100) * circumference;

  return (
    <div className="readiness-widget">
      <h3 className="widget-title">Readiness Score</h3>
      
      <div className="readiness-circle-container">
        <svg className="readiness-circle" viewBox="0 0 100 100">
          <circle className="readiness-circle-bg" cx="50" cy="50" r={radius} />
          <circle
            className="readiness-circle-progress"
            cx="50"
            cy="50"
            r={radius}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
              stroke: category.color
            }}
          />
        </svg>
        <div className="readiness-text">
          <span className="readiness-number" style={{ color: category.color }}>
            {score.overall}
          </span>
          <span className="readiness-max">/100</span>
        </div>
      </div>

      <div className="readiness-label" style={{ color: category.color, background: category.bgColor }}>
        {category.label}
      </div>

      {recommendations.length > 0 && (
        <div className="readiness-recommendations">
          <h4>Top Recommendations</h4>
          <ul>
            {recommendations.slice(0, 3).map((rec, index) => (
              <li key={index} className={`priority-${rec.priority}`}>
                <span className="rec-message">{rec.message}</span>
                <span className="rec-points">+{rec.points} pts</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="readiness-breakdown">
        <h4>Score Breakdown</h4>
        <div className="breakdown-grid">
          <div className="breakdown-item">
            <span className="breakdown-label">Resume ATS</span>
            <div className="breakdown-bar">
              <div 
                className="breakdown-fill" 
                style={{ width: `${score.breakdown.resumeATSScore}%` }}
              />
            </div>
            <span className="breakdown-value">{score.breakdown.resumeATSScore}%</span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-label">JD Alignment</span>
            <div className="breakdown-bar">
              <div 
                className="breakdown-fill" 
                style={{ width: `${score.breakdown.jdSkillAlignment}%` }}
              />
            </div>
            <span className="breakdown-value">{score.breakdown.jdSkillAlignment}%</span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-label">Job Matches</span>
            <div className="breakdown-bar">
              <div 
                className="breakdown-fill" 
                style={{ width: `${score.breakdown.jobMatchQuality}%` }}
              />
            </div>
            <span className="breakdown-value">{score.breakdown.jobMatchQuality}%</span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-label">Applications</span>
            <div className="breakdown-bar">
              <div 
                className="breakdown-fill" 
                style={{ width: `${score.breakdown.applicationProgress}%` }}
              />
            </div>
            <span className="breakdown-value">{score.breakdown.applicationProgress}%</span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-label">Practice</span>
            <div className="breakdown-bar">
              <div 
                className="breakdown-fill" 
                style={{ width: `${score.breakdown.practiceCompletion}%` }}
              />
            </div>
            <span className="breakdown-value">{score.breakdown.practiceCompletion}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadinessScoreWidget;
