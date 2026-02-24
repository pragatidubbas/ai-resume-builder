import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { unifiedStore } from '../store/unifiedStore';
import { eventBus, Events } from '../utils/eventBus';
import './Jobs.css';

const SAMPLE_JOBS = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    type: 'Full-time',
    salary: '$80k - $120k',
    description: 'We are looking for a skilled Frontend Developer proficient in React and modern JavaScript.',
    requiredSkills: ['React', 'JavaScript', 'HTML', 'CSS', 'TypeScript'],
    postedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: 'StartupXYZ',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$100k - $150k',
    description: 'Join our fast-growing startup as a Full Stack Engineer working with React and Node.js.',
    requiredSkills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'Git'],
    postedAt: '2024-01-14'
  },
  {
    id: '3',
    title: 'Software Engineer',
    company: 'BigTech Inc',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120k - $180k',
    description: 'Looking for talented Software Engineers to join our platform team.',
    requiredSkills: ['Java', 'Python', 'AWS', 'Docker', 'Kubernetes'],
    postedAt: '2024-01-13'
  },
  {
    id: '4',
    title: 'React Developer',
    company: 'Digital Agency',
    location: 'Remote',
    type: 'Contract',
    salary: '$60 - $80/hr',
    description: 'Short-term contract for an experienced React developer.',
    requiredSkills: ['React', 'Redux', 'JavaScript', 'CSS', 'Git'],
    postedAt: '2024-01-12'
  },
  {
    id: '5',
    title: 'Backend Developer',
    company: 'CloudSystems',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$90k - $130k',
    description: 'Build scalable backend services using Node.js and PostgreSQL.',
    requiredSkills: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    postedAt: '2024-01-11'
  }
];

function Jobs() {
  const [jobs, setJobs] = useState(SAMPLE_JOBS);
  const [savedJobs, setSavedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [resumeSkills, setResumeSkills] = useState([]);

  useEffect(() => {
    const data = unifiedStore.getData();
    setSavedJobs(data.jobMatches || []);
    
    // Get resume skills for matching
    const skills = [
      ...(data.resumeData?.skills?.technical || []),
      ...(data.resumeData?.skills?.tools || [])
    ];
    setResumeSkills(skills.map(s => s.toLowerCase()));
  }, []);

  const calculateMatchScore = (job) => {
    if (resumeSkills.length === 0 || !job.requiredSkills) return 0;
    
    const matchedSkills = job.requiredSkills.filter(skill =>
      resumeSkills.some(resumeSkill => 
        resumeSkill.includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(resumeSkill)
      )
    );
    
    return Math.round((matchedSkills.length / job.requiredSkills.length) * 100);
  };

  const isJobSaved = (jobId) => savedJobs.some(j => j.id === jobId);

  const toggleSaveJob = (job) => {
    if (isJobSaved(job.id)) {
      unifiedStore.removeJobMatch(job.id);
      setSavedJobs(savedJobs.filter(j => j.id !== job.id));
    } else {
      const jobWithScore = { ...job, matchScore: calculateMatchScore(job) };
      unifiedStore.addJobMatch(jobWithScore);
      setSavedJobs([...savedJobs, jobWithScore]);
      eventBus.emit(Events.JOB_SAVED, jobWithScore);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.requiredSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filter === 'saved') return isJobSaved(job.id) && matchesSearch;
    if (filter === 'remote') return job.location.toLowerCase().includes('remote') && matchesSearch;
    return matchesSearch;
  }).map(job => ({
    ...job,
    matchScore: calculateMatchScore(job)
  })).sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className="jobs-page">
      <Navigation />
      <div className="jobs-container">
        <header className="jobs-header">
          <h1>Job Listings</h1>
          <p className="jobs-subtitle">Find your next opportunity</p>
        </header>

        <div className="jobs-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search jobs, companies, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-tabs">
            <button 
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All Jobs
            </button>
            <button 
              className={filter === 'saved' ? 'active' : ''}
              onClick={() => setFilter('saved')}
            >
              Saved ({savedJobs.length})
            </button>
            <button 
              className={filter === 'remote' ? 'active' : ''}
              onClick={() => setFilter('remote')}
            >
              Remote
            </button>
          </div>
        </div>

        <div className="jobs-stats">
          <span>{filteredJobs.length} jobs found</span>
          {resumeSkills.length > 0 && (
            <span className="match-info">Match scores based on your resume skills</span>
          )}
        </div>

        <div className="jobs-list">
          {filteredJobs.length === 0 ? (
            <div className="empty-state">
              <p>No jobs found matching your criteria.</p>
            </div>
          ) : (
            filteredJobs.map(job => (
              <div key={job.id} className="job-card">
                <div className="job-header">
                  <div className="job-title-section">
                    <h3>{job.title}</h3>
                    <span className="company">{job.company}</span>
                  </div>
                  <button 
                    className={`save-btn ${isJobSaved(job.id) ? 'saved' : ''}`}
                    onClick={() => toggleSaveJob(job)}
                  >
                    {isJobSaved(job.id) ? '★' : '☆'}
                  </button>
                </div>

                <div className="job-meta">
                  <span className="location">📍 {job.location}</span>
                  <span className="type">💼 {job.type}</span>
                  <span className="salary">💰 {job.salary}</span>
                </div>

                <p className="job-description">{job.description}</p>

                <div className="job-skills">
                  {job.requiredSkills.map(skill => {
                    const isMatch = resumeSkills.some(rs => 
                      rs.includes(skill.toLowerCase()) || 
                      skill.toLowerCase().includes(rs)
                    );
                    return (
                      <span key={skill} className={`skill-tag ${isMatch ? 'match' : ''}`}>
                        {skill}
                      </span>
                    );
                  })}
                </div>

                {resumeSkills.length > 0 && (
                  <div className="match-score">
                    <div className="match-bar">
                      <div 
                        className="match-fill" 
                        style={{ width: `${job.matchScore}%` }}
                      />
                    </div>
                    <span className="match-percentage">{job.matchScore}% match</span>
                  </div>
                )}

                <div className="job-footer">
                  <span className="posted">Posted {job.postedAt}</span>
                  <button className="apply-btn">Apply Now</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
