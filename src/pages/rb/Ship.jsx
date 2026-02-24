import PremiumLayout from '../../components/rb/PremiumLayout';
import BuildPanel from '../../components/rb/BuildPanel';

function Ship() {
  const promptText = `Create a deployment checklist page:
- Environment setup (production config)
- CI/CD pipeline status
- Deployment steps checklist
- Monitoring dashboard links
- Launch announcement template`;

  return (
    <PremiumLayout 
      step={8} 
      title="08 — Ship & Deploy"
      buildPanel={<BuildPanel step={8} promptText={promptText} />}
    >
      <div className="step-content">
        <h2>Deployment Phase</h2>
        <p>Launch preparation:</p>
        <ul>
          <li>Production build optimization</li>
          <li>Environment variables configuration</li>
          <li>Database migration scripts</li>
          <li>CDN setup for static assets</li>
          <li>Monitoring and analytics integration</li>
          <li>Launch announcement and marketing</li>
        </ul>
      </div>
    </PremiumLayout>
  );
}

export default Ship;
