import PremiumLayout from '../../components/rb/PremiumLayout';
import BuildPanel from '../../components/rb/BuildPanel';

function LLD() {
  const promptText = `Create a low-level design page showing:
- Database schema (users, resumes, templates tables)
- API specifications with request/response examples
- Component hierarchy diagram
- State management flow
- Error handling patterns`;

  return (
    <PremiumLayout 
      step={5} 
      title="05 — Low-Level Design"
      buildPanel={<BuildPanel step={5} promptText={promptText} />}
    >
      <div className="step-content">
        <h2>Low-Level Design</h2>
        <p>Detailed technical specifications:</p>
        <ul>
          <li>Database: User, Resume, Template, Section tables</li>
          <li>API Routes: /auth, /resumes, /ai/generate, /export</li>
          <li>Components: ResumeForm, TemplateSelector, AIAssistant</li>
          <li>State: Redux for resume data, Context for UI</li>
          <li>Validation: Zod schemas, error boundaries</li>
        </ul>
      </div>
    </PremiumLayout>
  );
}

export default LLD;
