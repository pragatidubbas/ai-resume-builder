import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { unifiedStore } from '../store/unifiedStore';
import './Settings.css';

function Settings() {
  const [preferences, setPreferences] = useState({
    theme: 'light',
    notifications: true,
    autoSave: true,
    defaultTemplate: 'classic',
    defaultColor: 'teal'
  });
  const [dataStats, setDataStats] = useState({});
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    const data = unifiedStore.getData();
    setPreferences(data.preferences || preferences);
    
    setDataStats({
      resume: JSON.stringify(data.resumeData).length,
      jobs: data.jobMatches?.length || 0,
      applications: data.applications?.length || 0,
      analyses: data.jdAnalyses?.length || 0,
      practice: data.practiceData?.completedAssessments?.length || 0
    });
  }, []);

  const updatePreference = (key, value) => {
    const newPrefs = { ...preferences, [key]: value };
    setPreferences(newPrefs);
    
    const data = unifiedStore.getData();
    data.preferences = newPrefs;
    unifiedStore.saveData(data);
  };

  const clearAllData = () => {
    unifiedStore.clearAll();
    window.location.reload();
  };

  const exportData = () => {
    const data = unifiedStore.getData();
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `job-platform-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        unifiedStore.saveData(data);
        window.location.reload();
      } catch (error) {
        alert('Invalid file format');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="settings-page">
      <Navigation />
      <div className="settings-container">
        <header className="settings-header">
          <h1>Settings</h1>
          <p className="settings-subtitle">Manage your preferences and data</p>
        </header>

        <div className="settings-grid">
          {/* Preferences */}
          <div className="settings-section">
            <h3>Preferences</h3>
            <div className="settings-card">
              <div className="setting-item">
                <div className="setting-info">
                  <label>Theme</label>
                  <span>Choose your preferred color theme</span>
                </div>
                <select 
                  value={preferences.theme}
                  onChange={(e) => updatePreference('theme', e.target.value)}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label>Default Resume Template</label>
                  <span>Template used when creating new resumes</span>
                </div>
                <select
                  value={preferences.defaultTemplate}
                  onChange={(e) => updatePreference('defaultTemplate', e.target.value)}
                >
                  <option value="classic">Classic</option>
                  <option value="modern">Modern</option>
                  <option value="minimal">Minimal</option>
                </select>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label>Default Color Theme</label>
                  <span>Accent color for your resume</span>
                </div>
                <select
                  value={preferences.defaultColor}
                  onChange={(e) => updatePreference('defaultColor', e.target.value)}
                >
                  <option value="teal">Teal</option>
                  <option value="navy">Navy</option>
                  <option value="burgundy">Burgundy</option>
                  <option value="forest">Forest</option>
                  <option value="charcoal">Charcoal</option>
                </select>
              </div>

              <div className="setting-item toggle">
                <div className="setting-info">
                  <label>Notifications</label>
                  <span>Enable browser notifications for reminders</span>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox"
                    checked={preferences.notifications}
                    onChange={(e) => updatePreference('notifications', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item toggle">
                <div className="setting-info">
                  <label>Auto-save</label>
                  <span>Automatically save changes as you type</span>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox"
                    checked={preferences.autoSave}
                    onChange={(e) => updatePreference('autoSave', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="settings-section">
            <h3>Data Management</h3>
            <div className="settings-card">
              <div className="data-stats">
                <h4>Storage Usage</h4>
                <div className="stat-row">
                  <span>Resume Data</span>
                  <span>{(dataStats.resume / 1024).toFixed(2)} KB</span>
                </div>
                <div className="stat-row">
                  <span>Saved Jobs</span>
                  <span>{dataStats.jobs} items</span>
                </div>
                <div className="stat-row">
                  <span>Applications</span>
                  <span>{dataStats.applications} items</span>
                </div>
                <div className="stat-row">
                  <span>JD Analyses</span>
                  <span>{dataStats.analyses} items</span>
                </div>
                <div className="stat-row">
                  <span>Practice Records</span>
                  <span>{dataStats.practice} items</span>
                </div>
              </div>

              <div className="data-actions">
                <h4>Import / Export</h4>
                <p className="action-description">
                  Backup your data or transfer it to another device
                </p>
                <div className="action-buttons">
                  <button className="action-btn secondary" onClick={exportData}>
                    Export Data
                  </button>
                  <label className="action-btn secondary">
                    Import Data
                    <input 
                      type="file" 
                      accept=".json" 
                      onChange={importData}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              </div>

              <div className="danger-zone">
                <h4>Danger Zone</h4>
                <p className="action-description">
                  Clear all your data. This action cannot be undone.
                </p>
                <button className="action-btn danger" onClick={() => setShowClearConfirm(true)}>
                  Clear All Data
                </button>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="settings-section">
            <h3>About</h3>
            <div className="settings-card about-card">
              <div className="about-logo">JP</div>
              <h4>JobPlatform</h4>
              <p className="version">Version 1.0.0</p>
              <p className="about-description">
                A unified platform for job seekers. Build resumes, track applications, 
                analyze job descriptions, and practice for interviews all in one place.
              </p>
              <div className="about-links">
                <a href="#" className="about-link">Privacy Policy</a>
                <a href="#" className="about-link">Terms of Service</a>
                <a href="#" className="about-link">Help & Support</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showClearConfirm && (
        <div className="modal-overlay" onClick={() => setShowClearConfirm(false)}>
          <div className="confirm-modal" onClick={e => e.stopPropagation()}>
            <h3>Clear All Data?</h3>
            <p>This will permanently delete all your resumes, job matches, applications, and settings. This action cannot be undone.</p>
            <div className="confirm-actions">
              <button className="cancel-btn" onClick={() => setShowClearConfirm(false)}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={clearAllData}>
                Yes, Clear Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
