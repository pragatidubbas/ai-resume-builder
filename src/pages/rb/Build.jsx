import PremiumLayout from '../../components/rb/PremiumLayout';
import BuildPanel from '../../components/rb/BuildPanel';

function Build() {
  const promptText = `Build the core resume builder interface:
- Multi-step form (Personal Info, Experience, Education, Skills)
- Real-time preview panel
- AI suggestion button for each section
- Template switcher
- Save draft functionality`;

  return (
    <PremiumLayout 
      step={6} 
      title="06 — Build Implementation"
      buildPanel={<BuildPanel step={6} promptText={promptText} />}
    >
      <div className="step-content">
        <h2>Build Phase</h2>
        <p>Implement the core features:</p>
        <ul>
          <li>Resume form with validation</li>
          <li>Live preview with template rendering</li>
          <li>AI content generation integration</li>
          <li>Template selection and customization</li>
          <li>Auto-save and draft management</li>
        </ul>
      </div>
    </PremiumLayout>
  );
}

export default Build;
