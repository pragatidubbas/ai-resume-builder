import PremiumLayout from '../../components/rb/PremiumLayout';
import BuildPanel from '../../components/rb/BuildPanel';

function Test() {
  const promptText = `Create a testing dashboard showing:
- Unit test results for components
- Integration test status for API
- E2E test scenarios (user creates resume)
- Performance metrics
- Bug tracking table`;

  return (
    <PremiumLayout 
      step={7} 
      title="07 — Testing & QA"
      buildPanel={<BuildPanel step={7} promptText={promptText} />}
    >
      <div className="step-content">
        <h2>Testing Phase</h2>
        <p>Quality assurance checklist:</p>
        <ul>
          <li>Unit Tests: Component rendering, form validation</li>
          <li>Integration: API endpoints, AI service</li>
          <li>E2E: Complete resume creation flow</li>
          <li>Performance: Load time, PDF generation speed</li>
          <li>Security: Auth, data validation, XSS prevention</li>
        </ul>
      </div>
    </PremiumLayout>
  );
}

export default Test;
