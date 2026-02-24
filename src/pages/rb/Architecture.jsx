import PremiumLayout from '../../components/rb/PremiumLayout';
import BuildPanel from '../../components/rb/BuildPanel';

function Architecture() {
  const promptText = `Create an architecture diagram page showing:
- Frontend: React + Vite
- Backend: Node.js API
- AI: OpenAI GPT-4 integration
- Storage: PostgreSQL + S3
- Visual component diagram with connections`;

  return (
    <PremiumLayout 
      step={3} 
      title="03 — System Architecture"
      buildPanel={<BuildPanel step={3} promptText={promptText} />}
    >
      <div className="step-content">
        <h2>System Architecture</h2>
        <p>Technical stack and components:</p>
        <ul>
          <li>Frontend: React, TailwindCSS, React Router</li>
          <li>Backend: Node.js, Express, PostgreSQL</li>
          <li>AI Engine: OpenAI API for content generation</li>
          <li>Storage: AWS S3 for resume PDFs</li>
          <li>Auth: JWT-based authentication</li>
        </ul>
      </div>
    </PremiumLayout>
  );
}

export default Architecture;
