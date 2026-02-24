import './ResumePreview.css';

function ResumePreview({ resume }) {
  return (
    <div className="resume-preview">
      <div className="resume-paper">
        <div className="resume-header">
          <h1 className="resume-name">{resume.personalInfo.name || 'Your Name'}</h1>
          <div className="resume-contact">
            {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
            {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
            {resume.personalInfo.location && <span>{resume.personalInfo.location}</span>}
          </div>
          {(resume.links.github || resume.links.linkedin) && (
            <div className="resume-links">
              {resume.links.github && <span>{resume.links.github}</span>}
              {resume.links.linkedin && <span>{resume.links.linkedin}</span>}
            </div>
          )}
        </div>

        {resume.summary && (
          <div className="resume-section">
            <h2 className="resume-section-title">Summary</h2>
            <p className="resume-summary">{resume.summary}</p>
          </div>
        )}

        {resume.experience.length > 0 && (
          <div className="resume-section">
            <h2 className="resume-section-title">Experience</h2>
            {resume.experience.map(exp => (
              <div key={exp.id} className="resume-entry">
                <div className="resume-entry-header">
                  <div>
                    <h3 className="resume-entry-title">{exp.position || 'Position'}</h3>
                    <p className="resume-entry-subtitle">{exp.company || 'Company'}</p>
                  </div>
                  <span className="resume-entry-date">{exp.duration}</span>
                </div>
                {exp.description && (
                  <p className="resume-entry-description">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {resume.projects.length > 0 && (
          <div className="resume-section">
            <h2 className="resume-section-title">Projects</h2>
            {resume.projects.map(proj => (
              <div key={proj.id} className="resume-entry">
                <h3 className="resume-entry-title">{proj.name || 'Project Name'}</h3>
                {proj.description && (
                  <p className="resume-entry-description">{proj.description}</p>
                )}
                {proj.tech && (
                  <p className="resume-entry-tech">{proj.tech}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {resume.education.length > 0 && (
          <div className="resume-section">
            <h2 className="resume-section-title">Education</h2>
            {resume.education.map(edu => (
              <div key={edu.id} className="resume-entry">
                <div className="resume-entry-header">
                  <div>
                    <h3 className="resume-entry-title">{edu.degree || 'Degree'}</h3>
                    <p className="resume-entry-subtitle">{edu.school || 'School'}</p>
                  </div>
                  <span className="resume-entry-date">{edu.year}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {resume.skills && (
          <div className="resume-section">
            <h2 className="resume-section-title">Skills</h2>
            <p className="resume-skills">{resume.skills}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumePreview;
