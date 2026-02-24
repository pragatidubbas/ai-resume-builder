import PremiumLayout from '../../components/rb/PremiumLayout';
import BuildPanel from '../../components/rb/BuildPanel';

function Market() {
  const promptText = `Add a market analysis section to the resume builder:
- Target audience cards (Students, Professionals, Career Changers)
- Market size statistics
- Competitor comparison table
- Unique value proposition`;

  return (
    <PremiumLayout 
      step={2} 
      title="02 — Market Research"
      buildPanel={<BuildPanel step={2} promptText={promptText} />}
    >
      <div className="step-content">
        <h2>Market Analysis</h2>
        <p>Understanding the market landscape:</p>
        <ul>
          <li>Target: 50M+ job seekers annually</li>
          <li>Competitors: Resume.io, Zety, Novoresume</li>
          <li>Gap: AI-powered personalization</li>
          <li>Opportunity: $2B resume services market</li>
        </ul>
      </div>
    </PremiumLayout>
  );
}

export default Market;
