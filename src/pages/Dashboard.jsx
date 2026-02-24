import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import ReadinessScoreWidget from '../components/dashboard/ReadinessScoreWidget';
import { unifiedStore } from '../store/unifiedStore';
import { calculateATSScore } from '../utils/atsScoring';
import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    atsScore: 0,
    jobMatches: 0,
    applications: 0,
    jdAnalyses: 0,
    practiceCompleted: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const data = unifiedStore.getData();
    const atsResult = calculateATSScore(data.resumeData);
    
    setStats({
      atsScore: atsResult.score,
      jobMatches: data.jobMatches?.length || 0,
      applications: data.applications?.length || 0,
      jdAnalyses: data.jdAnalyses?.length || 0,
      practiceCompleted: data.practiceData?.completedAssessments?.length || 0
    });

    // Generate recent activity
    const activities = [];
    
    if (data.lastActivity) {
      activities.push({
        type: 'activity',
        message: 'Last active',
        time: new Date(data.lastActivity).toLocaleDateString(),
        icon: '🕐'
      });
    }

    if (data.applications?.length > 0) {
      const latestApp = data.applications[data.applications.length - 1];
      activities.push({
        type: 'application',
        message: `Applied to ${latestApp.company || 'a company'}`,
        time: new Date(latestApp.appliedAt).toLocaleDateString(),
        icon: '📝'
      });
    }

    if (data.jobMatches?.length > 0) {
      activities.push({
        type: 'job',
        message: `Saved ${data.jobMatches.length} job matches`,
        time: 'Recently',
        icon: '💼'
      });
    }

    setRecentActivity(activities.slice(0, 5));
  }, []);

  return (
    <div className="dashboard-page">
      <Navigation />
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <p className="dashboard-subtitle">Your job search command center</p>
        </header>

        <div className="dashboard-grid">
          {/* Main Readiness Score */}
          <div className="dashboard-card readiness-card">
            <ReadinessScoreWidget />
          </div>

          {/* Quick Stats */}
          <div className="dashboard-stats">
            <Link to="/resume" className="stat-card">
              <div className="stat-icon">📄</div>
              <div className="stat-content">
                <span className="stat-value">{stats.atsScore}</span>
                <span className="stat-label">ATS Score</span>
              </div>
            </Link>

            <Link to="/jobs" className="stat-card">
              <div className="stat-icon">💼</div>
              <div className="stat-content">
                <span className="stat-value">{stats.jobMatches}</span>
                <span className="stat-label">Job Matches</span>
              </div>
            </Link>

            <Link to="/applications" className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-content">
                <span className="stat-value">{stats.applications}</span>
                <span className="stat-label">Applications</span>
              </div>
            </Link>

            <Link to="/analyze" className="stat-card">
              <div className="stat-icon">🔍</div>
              <div className="stat-content">
                <span className="stat-value">{stats.jdAnalyses}</span>
                <span className="stat-label">JD Analyses</span>
              </div>
            </Link>

            <Link to="/proof" className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <span className="stat-value">{stats.practiceCompleted}</span>
                <span className="stat-label">Practice Done</span>
              </div>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="dashboard-card activity-card">
            <h3>Recent Activity</h3>
            {recentActivity.length > 0 ? (
              <ul className="activity-list">
                {recentActivity.map((activity, index) => (
                  <li key={index} className="activity-item">
                    <span className="activity-icon">{activity.icon}</span>
                    <div className="activity-content">
                      <span className="activity-message">{activity.message}</span>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-state">No recent activity. Start by building your resume!</p>
            )}
          </div>

          {/* Quick Actions */}
          <div className="dashboard-card actions-card">
            <h3>Quick Actions</h3>
            <div className="quick-actions">
              <Link to="/resume" className="action-btn primary">
                <span className="action-icon">✏️</span>
                Build Resume
              </Link>
              <Link to="/jobs" className="action-btn">
                <span className="action-icon">🔍</span>
                Find Jobs
              </Link>
              <Link to="/analyze" className="action-btn">
                <span className="action-icon">📊</span>
                Analyze JD
              </Link>
              <Link to="/proof" className="action-btn">
                <span className="action-icon">🎯</span>
                Practice
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
