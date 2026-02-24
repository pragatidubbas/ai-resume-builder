import './ResumePreview.css';

function ResumePreview({ resume, template = 'classic' }) {
  const hasContent = resume.personalInfo.name || 
                     resume.personalInfo.email || 
                     resume.personalInfo.phone || 
                     resume.personalInfo.location;

  const hasLinks = resume.links.github || resume.links.linkedin;

  return (
    <div className="resume-preview">
      <div className={`resume-paper template-${template}`}>
        {hasContent && (
          <div className="resume-header">
            <h1 className="resume-name">{resume.personalInfo.name || 'Your Name'}</h1>
            {(resume.personalInfo.email || resume.personalInfo.phone || resume.personalInfo.location) && (
              <div className="resume-contact">
                {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
                {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
                {resume.personalInfo.location && <span>{resume.personalInfo.location}</span>}
              </div>
            )}
            {hasLinks && (
              <div className="resume-links">
                {resume.links.github && <span>{resume.links.github}</span>}
                {resume.links.linkedin && <span>{resume.links.linkedin}</span>}
              </div>
            )}
          </div>
        )}

        {resume.summary && (
          <div className="resume-section">
            <h2 className="resume-section-title">Summary</h2>
            <p className="resume-summary">{resume.summary}</p>
          </div>
        )}

        {resume.experience.length > 0 && resume.experience.some(exp => exp.company || exp.position) && (
          <div className="resume-section">
            <h2 className="resume-section-title">Experience</h2>
            {resume.experience.map(exp => (
              (exp.company || exp.position) && (
                <div key={exp.id} className="resume-entry">
                  <div className="resume-entry-header">
                    <div>
                      <h3 className="resume-entry-title">{exp.position || 'Position'}</h3>
                      <p className="resume-entry-subtitle">{exp.company || 'Company'}</p>
                    </div>
                    {exp.duration && <span className="resume-entry-date">{exp.duration}</span>}
                  </div>
                  {exp.description && (
                    <p className="resume-entry-description">{exp.description}</p>
                  )}
                </div>
              )
            ))}
          </div>
        )}

        {resume.projects.length > 0 && resume.projects.some(proj => proj.name) && (
          <div className="resume-section">
            <h2 className="resume-section-title">Projects</h2>
            <div className="projects-grid">
              {resume.projects.map(proj => (
                proj.name && (
                  <div key={proj.id} className="project-card">
                    <div className="project-card-header">
                      <h3 className="project-card-title">{proj.name}</h3>
                      <div className="project-card-links">
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link" title="Live Demo">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link" title="GitHub">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                    {proj.description && (
                      <p className="project-card-description">{proj.description}</p>
                    )}
                    {proj.tech && proj.tech.length > 0 && (
                      <div className="project-card-tech">
                        {proj.tech.map((tech, index) => (
                          <span key={index} className="tech-pill">{tech}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {resume.education.length > 0 && resume.education.some(edu => edu.school || edu.degree) && (
          <div className="resume-section">
            <h2 className="resume-section-title">Education</h2>
            {resume.education.map(edu => (
              (edu.school || edu.degree) && (
                <div key={edu.id} className="resume-entry">
                  <div className="resume-entry-header">
                    <div>
                      <h3 className="resume-entry-title">{edu.degree || 'Degree'}</h3>
                      <p className="resume-entry-subtitle">{edu.school || 'School'}</p>
                    </div>
                    {edu.year && <span className="resume-entry-date">{edu.year}</span>}
                  </div>
                </div>
              )
            ))}
          </div>
        )}

        {(resume.skills.technical?.length > 0 || resume.skills.soft?.length > 0 || resume.skills.tools?.length > 0) && (
          <div className="resume-section">
            <h2 className="resume-section-title">Skills</h2>
            <div className="skills-grouped">
              {resume.skills.technical?.length > 0 && (
                <div className="skill-group">
                  <h4 className="skill-group-label">Technical</h4>
                  <div className="skill-pills">
                    {resume.skills.technical.map((skill, index) => (
                      <span key={index} className="skill-pill">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
              {resume.skills.soft?.length > 0 && (
                <div className="skill-group">
                  <h4 className="skill-group-label">Soft Skills</h4>
                  <div className="skill-pills">
                    {resume.skills.soft.map((skill, index) => (
                      <span key={index} className="skill-pill">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
              {resume.skills.tools?.length > 0 && (
                <div className="skill-group">
                  <h4 className="skill-group-label">Tools</h4>
                  <div className="skill-pills">
                    {resume.skills.tools.map((skill, index) => (
                      <span key={index} className="skill-pill">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {!hasContent && !resume.summary && resume.experience.length === 0 && 
         resume.projects.length === 0 && resume.education.length === 0 && !resume.skills && (
          <div className="resume-empty-state">
            <p>Start filling out the form to see your resume preview</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumePreview;
