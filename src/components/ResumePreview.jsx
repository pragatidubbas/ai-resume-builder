import './ResumePreview.css';

function ResumePreview({ resume }) {
  const hasContent = resume.personalInfo.name || 
                     resume.personalInfo.email || 
                     resume.personalInfo.phone || 
                     resume.personalInfo.location;

  const hasLinks = resume.links.github || resume.links.linkedin;

  return (
    <div className="resume-preview">
      <div className="resume-paper">
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
            {resume.projects.map(proj => (
              proj.name && (
                <div key={proj.id} className="resume-entry">
                  <h3 className="resume-entry-title">{proj.name}</h3>
                  {proj.description && (
                    <p className="resume-entry-description">{proj.description}</p>
                  )}
                  {proj.tech && (
                    <p className="resume-entry-tech">{proj.tech}</p>
                  )}
                </div>
              )
            ))}
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

        {resume.skills && (
          <div className="resume-section">
            <h2 className="resume-section-title">Skills</h2>
            <p className="resume-skills">{resume.skills}</p>
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
