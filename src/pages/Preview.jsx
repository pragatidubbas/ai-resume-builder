import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { resumeStore } from '../store/resumeStore';
import './Preview.css';

function Preview() {
  const [resume, setResume] = useState(resumeStore.getResume());

  useEffect(() => {
    const stored = resumeStore.getResume();
    setResume(stored);
  }, []);

  return (
    <div className="preview-page">
      <Navigation />
      <div className="preview-container">
        <div className="preview-paper">
          <div className="preview-header">
            <h1 className="preview-name">{resume.personalInfo.name || 'Your Name'}</h1>
            <div className="preview-contact">
              {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
              {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
              {resume.personalInfo.location && <span>{resume.personalInfo.location}</span>}
            </div>
            {(resume.links.github || resume.links.linkedin) && (
              <div className="preview-links">
                {resume.links.github && <span>{resume.links.github}</span>}
                {resume.links.linkedin && <span>{resume.links.linkedin}</span>}
              </div>
            )}
          </div>

          {resume.summary && (
            <div className="preview-section">
              <h2 className="preview-section-title">Summary</h2>
              <p className="preview-text">{resume.summary}</p>
            </div>
          )}

          {resume.experience.length > 0 && (
            <div className="preview-section">
              <h2 className="preview-section-title">Experience</h2>
              {resume.experience.map(exp => (
                <div key={exp.id} className="preview-entry">
                  <div className="preview-entry-header">
                    <div>
                      <h3 className="preview-entry-title">{exp.position}</h3>
                      <p className="preview-entry-subtitle">{exp.company}</p>
                    </div>
                    <span className="preview-entry-date">{exp.duration}</span>
                  </div>
                  {exp.description && (
                    <p className="preview-text">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {resume.projects.length > 0 && (
            <div className="preview-section">
              <h2 className="preview-section-title">Projects</h2>
              {resume.projects.map(proj => (
                <div key={proj.id} className="preview-entry">
                  <h3 className="preview-entry-title">{proj.name}</h3>
                  {proj.description && (
                    <p className="preview-text">{proj.description}</p>
                  )}
                  {proj.tech && (
                    <p className="preview-tech">{proj.tech}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {resume.education.length > 0 && (
            <div className="preview-section">
              <h2 className="preview-section-title">Education</h2>
              {resume.education.map(edu => (
                <div key={edu.id} className="preview-entry">
                  <div className="preview-entry-header">
                    <div>
                      <h3 className="preview-entry-title">{edu.degree}</h3>
                      <p className="preview-entry-subtitle">{edu.school}</p>
                    </div>
                    <span className="preview-entry-date">{edu.year}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {resume.skills && (
            <div className="preview-section">
              <h2 className="preview-section-title">Skills</h2>
              <p className="preview-text">{resume.skills}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Preview;
