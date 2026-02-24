import { useState } from 'react';
import './SkillsSection.css';

const SUGGESTED_SKILLS = {
  technical: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL'],
  soft: ['Team Leadership', 'Problem Solving'],
  tools: ['Git', 'Docker', 'AWS']
};

function SkillsSection({ skills, onChange }) {
  const [inputValues, setInputValues] = useState({ technical: '', soft: '', tools: '' });
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { key: 'technical', label: 'Technical Skills' },
    { key: 'soft', label: 'Soft Skills' },
    { key: 'tools', label: 'Tools & Technologies' }
  ];

  const handleInputChange = (category, value) => {
    setInputValues(prev => ({ ...prev, [category]: value }));
  };

  const handleKeyDown = (category, e) => {
    if (e.key === 'Enter' && inputValues[category].trim()) {
      e.preventDefault();
      addSkill(category, inputValues[category].trim());
    }
  };

  const addSkill = (category, skill) => {
    if (!skills[category].includes(skill)) {
      onChange({
        ...skills,
        [category]: [...skills[category], skill]
      });
    }
    setInputValues(prev => ({ ...prev, [category]: '' }));
  };

  const removeSkill = (category, skillToRemove) => {
    onChange({
      ...skills,
      [category]: skills[category].filter(skill => skill !== skillToRemove)
    });
  };

  const handleSuggestSkills = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newSkills = { ...skills };
      Object.keys(SUGGESTED_SKILLS).forEach(category => {
        SUGGESTED_SKILLS[category].forEach(skill => {
          if (!newSkills[category].includes(skill)) {
            newSkills[category] = [...newSkills[category], skill];
          }
        });
      });
      onChange(newSkills);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="form-section skills-section">
      <div className="section-header">
        <h3>Skills</h3>
        <button 
          className="suggest-btn" 
          onClick={handleSuggestSkills}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading-spinner">⟳</span>
          ) : (
            '✨ Suggest Skills'
          )}
        </button>
      </div>

      <div className="skills-categories">
        {categories.map(({ key, label }) => (
          <div key={key} className="skill-category">
            <h4 className="category-label">
              {label} ({skills[key].length})
            </h4>
            
            <div className="skill-chips">
              {skills[key].map((skill, index) => (
                <span key={index} className="skill-chip">
                  {skill}
                  <button
                    className="chip-remove"
                    onClick={() => removeSkill(key, skill)}
                    aria-label={`Remove ${skill}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <input
              type="text"
              className="skill-input"
              placeholder={`Add ${label.toLowerCase()}...`}
              value={inputValues[key]}
              onChange={(e) => handleInputChange(key, e.target.value)}
              onKeyDown={(e) => handleKeyDown(key, e)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default SkillsSection;
