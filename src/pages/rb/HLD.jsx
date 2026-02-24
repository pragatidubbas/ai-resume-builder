import PremiumLayout from '../../components/rb/PremiumLayout';
import BuildPanel from '../../components/rb/BuildPanel';

function HLD() {
  const promptText = `Create a high-level design page with:
- User flow diagram (Sign up → Input → AI Generate → Edit → Export)
- Key modules: Auth, Profile, AI Engine, Template, Export
- Data flow visualization
- API endpoint overview`;

  return (
    <PremiumLayout 
      step={4} 
      title="04 — High-Level Design"
      buildPanel={<BuildPanel step={4} promptText={promptText} />}
    >
      <div className="step-content">
        <h2>High-Level Design</h2>
        <p>Core system modules and flows:</p>
        <ul>
          <li>User Management: Registration, login, profiles</li>
          <li>Resume Builder: Form inputs, AI suggestions</li>
          <li>Template Engine: Multiple design options</li>
          <li>AI Service: Content optimization, keyword matching</li>
          <li>Export Module: PDF generation, download</li>
        </ul>
      </div>
    </PremiumLayout>
  );
}

export default HLD;
