import { useState } from 'react';
import './ProjectsSection.css';

function ProjectsSection({ projects, onChange }) {
  const [expandedId, setExpandedId] = useState(null);
  const [techInputs, setTechInputs] = useState({});

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: '',
      description: '',
      tech: [],
      liveUrl: '',
      githubUrl: ''
    };
    onChange([...projects, newProject]);
    setExpandedId(newProject.id);
  };

  const updateProject = (id, field, value) => {
    onChange(projects.map(proj =>
      proj.id === id ? { ...proj, [field]: value } : proj
    ));
  };

  const removeProject = (id) => {
    onChange(projects.filter(proj => proj.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const addTech = (projectId, tech) => {
    const project = projects.find(p => p.id === projectId);
    if (project && !project.tech.includes(tech)) {
      updateProject(projectId, 'tech', [...project.tech, tech]);
    }
    setTechInputs(prev => ({ ...prev, [projectId]: '' }));
  };

  const removeTech = (projectId, techToRemove) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      updateProject(projectId, 'tech', project.tech.filter(t => t !== techToRemove));
    }
  };

  const handleTechKeyDown = (projectId, e) => {
    if (e.key === 'Enter' && techInputs[projectId]?.trim()) {
      e.preventDefault();
      addTech(projectId, techInputs[projectId].trim());
    }
  };

  return (
    <section className="form-section projects-section">
      <div className="section-header">
        <h3>Projects</h3>
        <button className="add-btn" onClick={addProject}>
          Add Project
        </button>
      </div>

      <div className="projects-list">
        {projects.map(project => {
          const isExpanded = expandedId === project.id;
          const descriptionLength = project.description?.length || 0;
          const maxLength = 200;

          return (
            <div key={project.id} className={`project-entry ${isExpanded ? 'expanded' : ''}`}>
              <div 
                className="project-header"
                onClick={() => toggleExpand(project.id)}
              >
                <h4 className="project-title">
                  {project.name || 'New Project'}
                </h4>
                <div className="project-actions">
                  <button
                    className="expand-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(project.id);
                    }}
                  >
                    {isExpanded ? '−' : '+'}
                  </button>
                  <button
                    className="remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeProject(project.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="project-form">
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={project.name}
                    onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                  />

                  <div className="textarea-wrapper">
                    <textarea
                      placeholder="Project description..."
                      rows={3}
                      maxLength={maxLength}
                      value={project.description}
                      onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                    />
                    <span className="char-counter">
                      {descriptionLength}/{maxLength}
                    </span>
                  </div>

                  <div className="tech-stack-input">
                    <label>Tech Stack</label>
                    <div className="tech-chips">
                      {project.tech.map((tech, index) => (
                        <span key={index} className="tech-chip">
                          {tech}
                          <button
                            className="chip-remove"
                            onClick={() => removeTech(project.id, tech)}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Add technology and press Enter..."
                      value={techInputs[project.id] || ''}
                      onChange={(e) => setTechInputs(prev => ({
                        ...prev,
                        [project.id]: e.target.value
                      }))}
                      onKeyDown={(e) => handleTechKeyDown(project.id, e)}
                    />
                  </div>

                  <div className="project-links">
                    <input
                      type="text"
                      placeholder="Live URL (optional)"
                      value={project.liveUrl}
                      onChange={(e) => updateProject(project.id, 'liveUrl', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="GitHub URL (optional)"
                      value={project.githubUrl}
                      onChange={(e) => updateProject(project.id, 'githubUrl', e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ProjectsSection;
