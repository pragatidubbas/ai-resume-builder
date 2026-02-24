import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import ResumePreview from '../components/ResumePreview';
import ATSScore from '../components/ATSScore';
import TemplateSelector from '../components/TemplateSelector';
import { resumeStore } from '../store/resumeStore';
import { calculateATSScore } from '../utils/atsScoring';
import { getTopImprovements } from '../utils/improvements';
import { checkBulletGuidance } from '../utils/bulletGuidance';
import './Builder.css';

function Builder() {
  const [resume, setResume] = useState(resumeStore.getResume());
  const [atsResult, setAtsResult] = useState({ score: 0, suggestions: [] });
  const [improvements, setImprovements] = useState([]);
  const [template, setTemplate] = useState(resumeStore.getTemplate());

  // Load data on mount
  useEffect(() => {
    const stored = resumeStore.getResume();
    const storedTemplate = resumeStore.getTemplate();
    setResume(stored);
    setTemplate(storedTemplate);
    setAtsResult(calculateATSScore(stored));
    setImprovements(getTopImprovements(stored));
  }, []);

  // Auto-save and recalculate ATS score on every change
  useEffect(() => {
    resumeStore.saveResume(resume);
    setAtsResult(calculateATSScore(resume));
    setImprovements(getTopImprovements(resume));
  }, [resume]);

  const handleTemplateChange = (newTemplate) => {
    setTemplate(newTemplate);
    resumeStore.saveTemplate(newTemplate);
  };

  const handlePersonalInfoChange = (field, value) => {
    setResume(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const handleSummaryChange = (value) => {
    setResume(prev => ({ ...prev, summary: value }));
  };

  const handleSkillsChange = (value) => {
    setResume(prev => ({ ...prev, skills: value }));
  };

  const handleLinksChange = (field, value) => {
    setResume(prev => ({
      ...prev,
      links: { ...prev.links, [field]: value }
    }));
  };

  const addEducation = () => {
    setResume(prev => ({
      ...prev,
      education: [...prev.education, { id: Date.now(), school: '', degree: '', year: '' }]
    }));
  };

  const updateEducation = (id, field, value) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addExperience = () => {
    setResume(prev => ({
      ...prev,
      experience: [...prev.experience, { 
        id: Date.now(), 
        company: '', 
        position: '', 
        duration: '', 
        description: '' 
      }]
    }));
  };

  const updateExperience = (id, field, value) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addProject = () => {
    setResume(prev => ({
      ...prev,
      projects: [...prev.projects, { 
        id: Date.now(), 
        name: '', 
        description: '', 
        tech: '' 
      }]
    }));
  };

  const updateProject = (id, field, value) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.map(proj => 
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const removeProject = (id) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }));
  };

  const loadSample = () => {
    const sample = resumeStore.loadSampleData();
    setResume(sample);
  };

  return (
    <div className="builder-page">
      <Navigation />
      <div className="builder-container">
        <div className="builder-form">
          <div className="form-header">
            <h2>Resume Builder</h2>
            <div className="form-header-actions">
              <TemplateSelector 
                selectedTemplate={template} 
                onTemplateChange={handleTemplateChange} 
              />
              <button className="sample-btn" onClick={loadSample}>
                Load Sample Data
              </button>
            </div>
          </div>

          <section className="form-section">
            <h3>Personal Information</h3>
            <div className="form-grid">
              <input
                type="text"
                placeholder="Full Name"
                value={resume.personalInfo.name}
                onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={resume.personalInfo.email}
                onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
              />
              <input
                type="tel"
                placeholder="Phone"
                value={resume.personalInfo.phone}
                onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
              />
              <input
                type="text"
                placeholder="Location"
                value={resume.personalInfo.location}
                onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
              />
            </div>
          </section>

          <section className="form-section">
            <h3>Professional Summary</h3>
            <textarea
              placeholder="Brief overview of your professional background..."
              rows={4}
              value={resume.summary}
              onChange={(e) => handleSummaryChange(e.target.value)}
            />
          </section>

          <section className="form-section">
            <div className="section-header">
              <h3>Education</h3>
              <button className="add-btn" onClick={addEducation}>+ Add</button>
            </div>
            {resume.education.map(edu => (
              <div key={edu.id} className="entry-card">
                <input
                  type="text"
                  placeholder="School/University"
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Year (e.g., 2019 - 2023)"
                  value={edu.year}
                  onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                />
                <button className="remove-btn" onClick={() => removeEducation(edu.id)}>
                  Remove
                </button>
              </div>
            ))}
          </section>

          <section className="form-section">
            <div className="section-header">
              <h3>Experience</h3>
              <button className="add-btn" onClick={addExperience}>+ Add</button>
            </div>
            {resume.experience.map(exp => {
              const bulletSuggestions = checkBulletGuidance(exp.description);
              return (
                <div key={exp.id} className="entry-card">
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Duration (e.g., 2021 - Present)"
                    value={exp.duration}
                    onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                  />
                  <textarea
                    placeholder="Description of responsibilities and achievements..."
                    rows={3}
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  />
                  {bulletSuggestions.length > 0 && exp.description && (
                    <div className="bullet-guidance">
                      {bulletSuggestions.map((suggestion, idx) => (
                        <span key={idx} className="guidance-hint">{suggestion}</span>
                      ))}
                    </div>
                  )}
                  <button className="remove-btn" onClick={() => removeExperience(exp.id)}>
                    Remove
                  </button>
                </div>
              );
            })}
          </section>

          <section className="form-section">
            <div className="section-header">
              <h3>Projects</h3>
              <button className="add-btn" onClick={addProject}>+ Add</button>
            </div>
            {resume.projects.map(proj => {
              const bulletSuggestions = checkBulletGuidance(proj.description);
              return (
                <div key={proj.id} className="entry-card">
                  <input
                    type="text"
                    placeholder="Project Name"
                    value={proj.name}
                    onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                  />
                  <textarea
                    placeholder="Project description..."
                    rows={2}
                    value={proj.description}
                    onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                  />
                  {bulletSuggestions.length > 0 && proj.description && (
                    <div className="bullet-guidance">
                      {bulletSuggestions.map((suggestion, idx) => (
                        <span key={idx} className="guidance-hint">{suggestion}</span>
                      ))}
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder="Technologies used"
                    value={proj.tech}
                    onChange={(e) => updateProject(proj.id, 'tech', e.target.value)}
                  />
                  <button className="remove-btn" onClick={() => removeProject(proj.id)}>
                    Remove
                  </button>
                </div>
              );
            })}
          </section>

          <section className="form-section">
            <h3>Skills</h3>
            <input
              type="text"
              placeholder="Comma-separated skills (e.g., JavaScript, React, Node.js)"
              value={resume.skills}
              onChange={(e) => handleSkillsChange(e.target.value)}
            />
          </section>

          <section className="form-section">
            <h3>Links</h3>
            <div className="form-grid">
              <input
                type="text"
                placeholder="GitHub URL"
                value={resume.links.github}
                onChange={(e) => handleLinksChange('github', e.target.value)}
              />
              <input
                type="text"
                placeholder="LinkedIn URL"
                value={resume.links.linkedin}
                onChange={(e) => handleLinksChange('linkedin', e.target.value)}
              />
            </div>
          </section>
        </div>

        <div className="builder-preview">
          <ATSScore 
            score={atsResult.score} 
            suggestions={atsResult.suggestions}
            improvements={improvements}
          />
          <ResumePreview resume={resume} template={template} />
        </div>
      </div>
    </div>
  );
}

export default Builder;
