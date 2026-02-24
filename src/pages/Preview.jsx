import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import TemplateSelector from '../components/TemplateSelector';
import { resumeStore } from '../store/resumeStore';
import { generateResumeText, copyToClipboard, validateResumeForExport } from '../utils/textExport';
import './Preview.css';

function Preview() {
  const [resume, setResume] = useState(resumeStore.getResume());
  const [template, setTemplate] = useState(resumeStore.getTemplate());
  const [copyFeedback, setCopyFeedback] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const stored = resumeStore.getResume();
    const storedTemplate = resumeStore.getTemplate();
    setResume(stored);
    setTemplate(storedTemplate);
  }, []);

  const handleTemplateChange = (newTemplate) => {
    setTemplate(newTemplate);
    resumeStore.saveTemplate(newTemplate);
  };

  const handlePrint = () => {
    const validation = validateResumeForExport(resume);
    setShowWarning(!validation.isValid);
    window.print();
  };

  const handleCopyText = async () => {
    const validation = validateResumeForExport(resume);
    setShowWarning(!validation.isValid);
    
    const text = generateResumeText(resume);
    try {
      await copyToClipboard(text);
      setCopyFeedback('Copied to clipboard!');
      setTimeout(() => setCopyFeedback(''), 2000);
    } catch (err) {
      setCopyFeedback('Failed to copy');
      setTimeout(() => setCopyFeedback(''), 2000);
    }
  };

  const hasContent = resume.personalInfo.name || 
                     resume.personalInfo.email || 
                     resume.personalInfo.phone || 
                     resume.personalInfo.location;

  const hasLinks = resume.links.github || resume.links.linkedin;

  const validation = validateResumeForExport(resume);

  return (
    <div className="preview-page">
      <Navigation />
      <div className="preview-container">
        <div className="preview-controls">
          <TemplateSelector 
            selectedTemplate={template} 
            onTemplateChange={handleTemplateChange} 
          />
          <div className="export-buttons">
            <button className="export-btn print-btn" onClick={handlePrint}>
              Print / Save as PDF
            </button>
            <button className="export-btn copy-btn" onClick={handleCopyText}>
              Copy Resume as Text
            </button>
          </div>
          {copyFeedback && <span className="copy-feedback">{copyFeedback}</span>}
        </div>
        {showWarning && !validation.isValid && (
          <div className="export-warning">
            <span className="warning-icon">⚠️</span>
            <span>Your resume may look incomplete.</span>
          </div>
        )}
        <div className={`preview-paper template-${template}`}>
          {hasContent && (
            <div className="preview-header">
              <h1 className="preview-name">{resume.personalInfo.name || 'Your Name'}</h1>
              {(resume.personalInfo.email || resume.personalInfo.phone || resume.personalInfo.location) && (
                <div className="preview-contact">
                  {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
                  {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
                  {resume.personalInfo.location && <span>{resume.personalInfo.location}</span>}
                </div>
              )}
              {hasLinks && (
                <div className="preview-links">
                  {resume.links.github && <span>{resume.links.github}</span>}
                  {resume.links.linkedin && <span>{resume.links.linkedin}</span>}
                </div>
              )}
            </div>
          )}

          {resume.summary && (
            <div className="preview-section">
              <h2 className="preview-section-title">Summary</h2>
              <p className="preview-text">{resume.summary}</p>
            </div>
          )}

          {resume.experience.length > 0 && resume.experience.some(exp => exp.company || exp.position) && (
            <div className="preview-section">
              <h2 className="preview-section-title">Experience</h2>
              {resume.experience.map(exp => (
                (exp.company || exp.position) && (
                  <div key={exp.id} className="preview-entry">
                    <div className="preview-entry-header">
                      <div>
                        <h3 className="preview-entry-title">{exp.position}</h3>
                        <p className="preview-entry-subtitle">{exp.company}</p>
                      </div>
                      {exp.duration && <span className="preview-entry-date">{exp.duration}</span>}
                    </div>
                    {exp.description && (
                      <p className="preview-text">{exp.description}</p>
                    )}
                  </div>
                )
              ))}
            </div>
          )}

          {resume.projects.length > 0 && resume.projects.some(proj => proj.name) && (
            <div className="preview-section">
              <h2 className="preview-section-title">Projects</h2>
              {resume.projects.map(proj => (
                proj.name && (
                  <div key={proj.id} className="preview-entry">
                    <h3 className="preview-entry-title">{proj.name}</h3>
                    {proj.description && (
                      <p className="preview-text">{proj.description}</p>
                    )}
                    {proj.tech && proj.tech.length > 0 && (
                      <p className="preview-tech">{proj.tech.join(', ')}</p>
                    )}
                  </div>
                )
              ))}
            </div>
          )}

          {resume.education.length > 0 && resume.education.some(edu => edu.school || edu.degree) && (
            <div className="preview-section">
              <h2 className="preview-section-title">Education</h2>
              {resume.education.map(edu => (
                (edu.school || edu.degree) && (
                  <div key={edu.id} className="preview-entry">
                    <div className="preview-entry-header">
                      <div>
                        <h3 className="preview-entry-title">{edu.degree}</h3>
                        <p className="preview-entry-subtitle">{edu.school}</p>
                      </div>
                      {edu.year && <span className="preview-entry-date">{edu.year}</span>}
                    </div>
                  </div>
                )
              ))}
            </div>
          )}

          {(resume.skills.technical?.length > 0 || resume.skills.soft?.length > 0 || resume.skills.tools?.length > 0) && (
            <div className="preview-section">
              <h2 className="preview-section-title">Skills</h2>
              <div className="preview-skills-grouped">
                {resume.skills.technical?.length > 0 && (
                  <div className="preview-skill-category">
                    <strong>Technical:</strong> {resume.skills.technical.join(', ')}
                  </div>
                )}
                {resume.skills.soft?.length > 0 && (
                  <div className="preview-skill-category">
                    <strong>Soft Skills:</strong> {resume.skills.soft.join(', ')}
                  </div>
                )}
                {resume.skills.tools?.length > 0 && (
                  <div className="preview-skill-category">
                    <strong>Tools:</strong> {resume.skills.tools.join(', ')}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Preview;
