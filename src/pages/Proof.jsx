import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { unifiedStore } from '../store/unifiedStore';
import { eventBus, Events } from '../utils/eventBus';
import './Proof.css';

const ASSESSMENTS = [
  {
    id: 'technical',
    title: 'Technical Skills',
    description: 'Test your programming and technical knowledge',
    icon: '💻',
    questions: [
      { id: 1, question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correct: 1 },
      { id: 2, question: 'Which data structure uses LIFO?', options: ['Queue', 'Stack', 'Array', 'Tree'], correct: 1 },
      { id: 3, question: 'What does SQL stand for?', options: ['Structured Query Language', 'Simple Query Language', 'Standard Query Language', 'System Query Language'], correct: 0 }
    ]
  },
  {
    id: 'aptitude',
    title: 'Aptitude Test',
    description: 'Logical reasoning and problem solving',
    icon: '🧠',
    questions: [
      { id: 1, question: 'If 2x + 4 = 10, what is x?', options: ['2', '3', '4', '5'], correct: 1 },
      { id: 2, question: 'Complete the series: 2, 6, 12, 20, ?', options: ['28', '30', '32', '34'], correct: 1 },
      { id: 3, question: 'Which number is the odd one out: 3, 5, 7, 9, 11?', options: ['3', '5', '7', '9'], correct: 3 }
    ]
  },
  {
    id: 'communication',
    title: 'Communication',
    description: 'Written and verbal communication skills',
    icon: '💬',
    questions: [
      { id: 1, question: 'Choose the correct sentence:', options: ['Their going to the park', 'They\'re going to the park', 'There going to the park', 'Thier going to the park'], correct: 1 },
      { id: 2, question: 'What is the best way to start a professional email?', options: ['Hey!', 'Yo!', 'Dear Sir/Madam', 'Hi [Name]'], correct: 3 },
      { id: 3, question: 'Which is a formal closing?', options: ['Later!', 'Best regards', 'Bye', 'Cya'], correct: 1 }
    ]
  },
  {
    id: 'problem-solving',
    title: 'Problem Solving',
    description: 'Critical thinking and analytical skills',
    icon: '🎯',
    questions: [
      { id: 1, question: 'You have a bug in production. What do you do first?', options: ['Panic', 'Check logs', 'Blame someone', 'Restart server immediately'], correct: 1 },
      { id: 2, question: 'A project is behind schedule. Best approach?', options: ['Work overtime alone', 'Communicate and replan', 'Cut corners', 'Ignore it'], correct: 1 },
      { id: 3, question: 'How do you handle conflicting requirements?', options: ['Ignore one', 'Ask for clarification', 'Guess', 'Do both fully'], correct: 1 }
    ]
  }
];

function Proof() {
  const [practiceData, setPracticeData] = useState({
    completedAssessments: [],
    skillScores: { technical: 0, aptitude: 0, communication: 0, problemSolving: 0 }
  });
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const data = unifiedStore.getPracticeData();
    setPracticeData(data);
  }, []);

  const startAssessment = (assessment) => {
    setActiveAssessment(assessment);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const handleAnswer = (optionIndex) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestion < activeAssessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      let correct = 0;
      newAnswers.forEach((answer, index) => {
        if (answer === activeAssessment.questions[index].correct) {
          correct++;
        }
      });
      const percentage = Math.round((correct / activeAssessment.questions.length) * 100);
      setScore(percentage);
      setShowResults(true);

      // Save results
      const updatedData = {
        ...practiceData,
        completedAssessments: [
          ...practiceData.completedAssessments.filter(a => a.id !== activeAssessment.id),
          { id: activeAssessment.id, score: percentage, completedAt: new Date().toISOString() }
        ],
        skillScores: {
          ...practiceData.skillScores,
          [activeAssessment.id]: percentage
        }
      };
      
      unifiedStore.updatePracticeData(updatedData);
      setPracticeData(updatedData);
      eventBus.emit(Events.PRACTICE_COMPLETED, { assessment: activeAssessment.id, score: percentage });
    }
  };

  const closeAssessment = () => {
    setActiveAssessment(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const getOverallScore = () => {
    const scores = Object.values(practiceData.skillScores);
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  const getCompletedCount = () => practiceData.completedAssessments.length;

  return (
    <div className="proof-page">
      <Navigation />
      <div className="proof-container">
        <header className="proof-header">
          <h1>Practice & Assessments</h1>
          <p className="proof-subtitle">Improve your skills and track your progress</p>
        </header>

        <div className="proof-stats">
          <div className="proof-stat-card">
            <span className="stat-number">{getCompletedCount()}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="proof-stat-card">
            <span className="stat-number">{getOverallScore()}%</span>
            <span className="stat-label">Average Score</span>
          </div>
          <div className="proof-stat-card">
            <span className="stat-number">{ASSESSMENTS.length - getCompletedCount()}</span>
            <span className="stat-label">Remaining</span>
          </div>
        </div>

        <div className="skill-scores">
          <h3>Skill Breakdown</h3>
          <div className="skill-bars">
            {Object.entries(practiceData.skillScores).map(([skill, score]) => (
              <div key={skill} className="skill-bar-item">
                <span className="skill-name">{skill.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                <div className="skill-bar">
                  <div className="skill-fill" style={{ width: `${score}%` }} />
                </div>
                <span className="skill-score">{score}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="assessments-grid">
          <h3>Available Assessments</h3>
          <div className="assessment-cards">
            {ASSESSMENTS.map(assessment => {
              const completed = practiceData.completedAssessments.find(a => a.id === assessment.id);
              return (
                <div key={assessment.id} className={`assessment-card ${completed ? 'completed' : ''}`}>
                  <div className="assessment-icon">{assessment.icon}</div>
                  <h4>{assessment.title}</h4>
                  <p>{assessment.description}</p>
                  <div className="assessment-meta">
                    <span>{assessment.questions.length} questions</span>
                    {completed && <span className="score-badge">{completed.score}%</span>}
                  </div>
                  <button 
                    className="start-btn"
                    onClick={() => startAssessment(assessment)}
                  >
                    {completed ? 'Retake' : 'Start'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {activeAssessment && (
          <div className="assessment-modal">
            <div className="modal-content">
              {!showResults ? (
                <>
                  <div className="modal-header">
                    <h3>{activeAssessment.title}</h3>
                    <button className="close-btn" onClick={closeAssessment}>×</button>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${((currentQuestion + 1) / activeAssessment.questions.length) * 100}%` }}
                    />
                  </div>
                  <div className="question-container">
                    <span className="question-number">
                      Question {currentQuestion + 1} of {activeAssessment.questions.length}
                    </span>
                    <h4 className="question-text">
                      {activeAssessment.questions[currentQuestion].question}
                    </h4>
                    <div className="options">
                      {activeAssessment.questions[currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          className="option-btn"
                          onClick={() => handleAnswer(index)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="results">
                  <div className="result-icon">{score >= 70 ? '🎉' : score >= 50 ? '👍' : '💪'}</div>
                  <h3>Assessment Complete!</h3>
                  <div className="result-score">{score}%</div>
                  <p className="result-message">
                    {score >= 70 
                      ? 'Excellent work! You\'re well prepared.' 
                      : score >= 50 
                        ? 'Good job! Keep practicing to improve.' 
                        : 'Keep practicing! You\'ll get better with time.'}
                  </p>
                  <button className="start-btn" onClick={closeAssessment}>Close</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Proof;
