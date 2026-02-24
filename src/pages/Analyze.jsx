import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { unifiedStore } from '../store/unifiedStore';
import { eventBus, Events } from '../utils/eventBus';
import './Analyze.css';

function Analyze() {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [savedAnalyses, setSavedAnalyses] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resumeSkills, setResumeSkills] = useState([]);

  useEffect(() => {
    const data = unifiedStore.getData();
    setSavedAnalyses(data.jdAnalyses || []);
    
    const skills = [
      ...(data.resumeData?.skills?.technical || []),
      ...(data.resumeData?.skills?.soft || []),
      ...(data.resumeData?.skills?.tools || [])
    ];
    setResumeSkills(skills.map(s => s.toLowerCase()));
  }, []);

  const extractSkills = (text) => {
    const commonSkills = [
      'javascript', 'python', 'java', 'react', 'node.js', 'sql', 'mongodb',
      'aws', 'docker', 'kubernetes', 'git', 'html', 'css', 'typescript',
      'angular', 'vue', 'express', 'django', 'flask', 'spring', 'hibernate',
      'postgresql', 'mysql', 'redis', 'elasticsearch', 'kafka', 'rabbitmq',
      'jenkins', 'circleci', 'travis', 'terraform', 'ansible', 'puppet',
      'linux', 'bash', 'powershell', 'nginx', 'apache', 'graphql', 'rest',
      'agile', 'scrum', 'kanban', 'jira', 'confluence', 'figma', 'sketch'
    ];
    
    const foundSkills = [];
    const textLower = text.toLowerCase();
    
    commonSkills.forEach(skill => {
      if (textLower.includes(skill.toLowerCase())) {
        foundSkills.push(skill);
      }
    });
    
    // Extract additional skills using patterns
    const skillPatterns = [
      /(\w+)\s+(?:programming|language|framework|library|tool|platform)/gi,
      /experience\s+(?:with|in)\s+([\w\s,]+)/gi,
      /proficient\s+(?:in|with)\s+([\w\s,]+)/gi,
      /knowledge\s+of\s+([\w\s,]+)/gi
    ];
    
    skillPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        const extracted = match[1].split(/[,\s]+/).filter(s => s.length > 2);
        foundSkills.push(...extracted);
      }
    });
    
    return [...new Set(foundSkills)].slice(0, 15);
  };

  const extractKeywords = (text) => {
    const commonKeywords = [
      'frontend', 'backend', 'fullstack', 'devops', 'cloud', 'microservices',
      'api', 'database', 'testing', 'ci/cd', 'agile', 'scrum', 'remote',
      'leadership', 'communication', 'teamwork', 'problem-solving'
    ];
    
    const foundKeywords = [];
    const textLower = text.toLowerCase();
    
    commonKeywords.forEach(keyword => {
      if (textLower.includes(keyword.toLowerCase())) {
        foundKeywords.push(keyword);
      }
    });
    
    return foundKeywords;
  };

  const analyzeJD = () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      const requiredSkills = extractSkills(jobDescription);
      const keywords = extractKeywords(jobDescription);
      
      // Calculate alignment
      const matchedSkills = requiredSkills.filter(skill =>
        resumeSkills.some(resumeSkill => 
          resumeSkill.includes(skill.toLowerCase()) || 
          skill.toLowerCase().includes(resumeSkill)
        )
      );
      
      const alignmentScore = requiredSkills.length > 0 
        ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
        : 0;
      
      const missingSkills = requiredSkills.filter(skill =>
        !resumeSkills.some(resumeSkill => 
          resumeSkill.includes(skill.toLowerCase()) || 
          skill.toLowerCase().includes(resumeSkill)
        )
      );
      
      const newAnalysis = {
        id: Date.now().toString(),
        jobDescription: jobDescription.slice(0, 200) + '...',
        requiredSkills,
        keywords,
        alignmentScore,
        matchedSkills,
        missingSkills,
        analyzedAt: new Date().toISOString()
      };
      
      setAnalysis(newAnalysis);
      unifiedStore.addJDAnalysis(newAnalysis);
      setSavedAnalyses([newAnalysis, ...savedAnalyses]);
      eventBus.emit(Events.JD_ANALYZED, newAnalysis);
      setIsAnalyzing(false);
    }, 1500);
  };

  const deleteAnalysis = (id) => {
    const data = unifiedStore.getData();
    data.jdAnalyses = data.jdAnalyses.filter(a => a.id !== id);
    unifiedStore.saveData(data);
    setSavedAnalyses(data.jdAnalyses);
  };

  return (
    <div className="analyze-page">
      <Navigation />
      <div className="analyze-container">
        <header className="analyze-header">
          <h1>JD Analysis</h1>
          <p className="analyze-subtitle">Analyze job descriptions and align your resume</p>
        </header>

        <div className="analyze-grid">
          <div className="analyzer-section">
            <div className="input-card">
              <h3>Paste Job Description</h3>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here to analyze required skills and keywords..."
                rows={10}
              />
              <button 
                className="analyze-btn"
                onClick={analyzeJD}
                disabled={!jobDescription.trim() || isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze JD'}
              </button>
            </div>

            {analysis && (
              <div className="results-card">
                <div className="alignment-score">
                  <h4>Resume Alignment</h4>
                  <div className="score-circle">
                    <span className="score-number">{analysis.alignmentScore}%</span>
                  </div>
                  <p className="score-label">
                    {analysis.alignmentScore >= 70 ? 'Great match!' : 
                     analysis.alignmentScore >= 50 ? 'Good match' : 'Needs improvement'}
                  </p>
                </div>

                <div className="skills-section">
                  <h4>Required Skills ({analysis.requiredSkills.length})</h4>
                  <div className="skills-grid">
                    {analysis.requiredSkills.map(skill => {
                      const isMatch = analysis.matchedSkills.includes(skill);
                      return (
                        <span key={skill} className={`skill-pill ${isMatch ? 'matched' : 'missing'}`}>
                          {isMatch ? '✓' : '○'} {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {analysis.missingSkills.length > 0 && (
                  <div className="missing-skills">
                    <h4>Skills to Add ({analysis.missingSkills.length})</h4>
                    <ul>
                      {analysis.missingSkills.map(skill => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="keywords-section">
                  <h4>Key Terms</h4>
                  <div className="keywords-list">
                    {analysis.keywords.map(keyword => (
                      <span key={keyword} className="keyword-tag">{keyword}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="history-section">
            <h3>Analysis History ({savedAnalyses.length})</h3>
            {savedAnalyses.length === 0 ? (
              <p className="empty-history">No analyses yet. Paste a job description to get started.</p>
            ) : (
              <div className="analysis-list">
                {savedAnalyses.map(item => (
                  <div key={item.id} className="history-item">
                    <div className="history-header">
                      <span className="history-score">{item.alignmentScore}%</span>
                      <button 
                        className="delete-btn"
                        onClick={() => deleteAnalysis(item.id)}
                      >
                        ×
                      </button>
                    </div>
                    <p className="history-preview">{item.jobDescription}</p>
                    <div className="history-skills">
                      {item.requiredSkills.slice(0, 5).map(skill => (
                        <span key={skill} className="history-skill">{skill}</span>
                      ))}
                      {item.requiredSkills.length > 5 && (
                        <span className="more-skills">+{item.requiredSkills.length - 5}</span>
                      )}
                    </div>
                    <span className="history-date">
                      {new Date(item.analyzedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analyze;
