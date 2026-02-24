import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { unifiedStore } from '../store/unifiedStore';
import { eventBus, Events } from '../utils/eventBus';
import './Applications.css';

const STATUS_OPTIONS = [
  { value: 'applied', label: 'Applied', color: '#3b82f6' },
  { value: 'screening', label: 'Screening', color: '#8b5cf6' },
  { value: 'interview', label: 'Interview', color: '#f59e0b' },
  { value: 'offer', label: 'Offer', color: '#22c55e' },
  { value: 'accepted', label: 'Accepted', color: '#10b981' },
  { value: 'rejected', label: 'Rejected', color: '#ef4444' }
];

function Applications() {
  const [applications, setApplications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newApplication, setNewApplication] = useState({
    company: '',
    position: '',
    location: '',
    salary: '',
    status: 'applied',
    notes: ''
  });

  useEffect(() => {
    const data = unifiedStore.getApplications();
    setApplications(data);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    unifiedStore.addApplication(newApplication);
    const updatedApps = unifiedStore.getApplications();
    setApplications(updatedApps);
    
    eventBus.emit(Events.APPLICATION_ADDED, newApplication);
    
    setNewApplication({
      company: '',
      position: '',
      location: '',
      salary: '',
      status: 'applied',
      notes: ''
    });
    setShowForm(false);
  };

  const updateStatus = (appId, newStatus) => {
    unifiedStore.updateApplicationStatus(appId, newStatus);
    setApplications(unifiedStore.getApplications());
    eventBus.emit(Events.APPLICATION_STATUS_CHANGED, { id: appId, status: newStatus });
  };

  const deleteApplication = (appId) => {
    const data = unifiedStore.getData();
    data.applications = data.applications.filter(a => a.id !== appId);
    unifiedStore.saveData(data);
    setApplications(data.applications);
  };

  const getStatusColor = (status) => {
    const option = STATUS_OPTIONS.find(opt => opt.value === status);
    return option ? option.color : '#666';
  };

  const getStatusLabel = (status) => {
    const option = STATUS_OPTIONS.find(opt => opt.value === status);
    return option ? option.label : status;
  };

  const getStats = () => {
    const stats = {};
    STATUS_OPTIONS.forEach(opt => {
      stats[opt.value] = applications.filter(a => a.status === opt.value).length;
    });
    return stats;
  };

  const stats = getStats();

  return (
    <div className="applications-page">
      <Navigation />
      <div className="applications-container">
        <header className="applications-header">
          <h1>Application Tracker</h1>
          <p className="applications-subtitle">Track your job applications and their progress</p>
        </header>

        <div className="stats-grid">
          <div className="stat-box total">
            <span className="stat-value">{applications.length}</span>
            <span className="stat-label">Total</span>
          </div>
          {STATUS_OPTIONS.map(status => (
            <div key={status.value} className="stat-box" style={{ borderColor: status.color }}>
              <span className="stat-value" style={{ color: status.color }}>{stats[status.value] || 0}</span>
              <span className="stat-label">{status.label}</span>
            </div>
          ))}
        </div>

        <div className="actions-bar">
          <button className="add-btn" onClick={() => setShowForm(true)}>
            + Add Application
          </button>
        </div>

        {showForm && (
          <div className="modal-overlay" onClick={() => setShowForm(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h3>Add New Application</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Company *</label>
                  <input
                    type="text"
                    value={newApplication.company}
                    onChange={(e) => setNewApplication({...newApplication, company: e.target.value})}
                    required
                    placeholder="Company name"
                  />
                </div>
                <div className="form-group">
                  <label>Position *</label>
                  <input
                    type="text"
                    value={newApplication.position}
                    onChange={(e) => setNewApplication({...newApplication, position: e.target.value})}
                    required
                    placeholder="Job title"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      value={newApplication.location}
                      onChange={(e) => setNewApplication({...newApplication, location: e.target.value})}
                      placeholder="City, Remote, etc."
                    />
                  </div>
                  <div className="form-group">
                    <label>Salary</label>
                    <input
                      type="text"
                      value={newApplication.salary}
                      onChange={(e) => setNewApplication({...newApplication, salary: e.target.value})}
                      placeholder="Salary range"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={newApplication.status}
                    onChange={(e) => setNewApplication({...newApplication, status: e.target.value})}
                  >
                    {STATUS_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Notes</label>
                  <textarea
                    value={newApplication.notes}
                    onChange={(e) => setNewApplication({...newApplication, notes: e.target.value})}
                    placeholder="Any notes about this application..."
                    rows={3}
                  />
                </div>
                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
                  <button type="submit" className="submit-btn">Add Application</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="applications-list">
          {applications.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No applications yet</h3>
              <p>Start tracking your job applications by clicking "Add Application"</p>
            </div>
          ) : (
            applications.map(app => (
              <div key={app.id} className="application-card">
                <div className="app-header">
                  <div className="app-title">
                    <h3>{app.position}</h3>
                    <span className="company">{app.company}</span>
                  </div>
                  <button className="delete-btn" onClick={() => deleteApplication(app.id)}>×</button>
                </div>

                <div className="app-meta">
                  {app.location && <span className="meta-item">📍 {app.location}</span>}
                  {app.salary && <span className="meta-item">💰 {app.salary}</span>}
                  <span className="meta-item">📅 {new Date(app.appliedAt).toLocaleDateString()}</span>
                </div>

                {app.notes && (
                  <p className="app-notes">{app.notes}</p>
                )}

                <div className="app-footer">
                  <div className="status-selector">
                    <span>Status:</span>
                    <select
                      value={app.status}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                      style={{ borderColor: getStatusColor(app.status), color: getStatusColor(app.status) }}
                    >
                      {STATUS_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div 
                    className="status-badge"
                    style={{ background: getStatusColor(app.status) + '20', color: getStatusColor(app.status) }}
                  >
                    {getStatusLabel(app.status)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Applications;
