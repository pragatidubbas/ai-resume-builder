import PremiumLayout from '../../components/rb/PremiumLayout';
import BuildPanel from '../../components/rb/BuildPanel';

function Problem() {
  const promptText = `Create an AI Resume Builder landing page with:
- Hero section with "Build Your Perfect Resume with AI"
- Feature cards showcasing AI capabilities
- CTA button "Get Started"
- Modern, professional design`;

  return (
    <PremiumLayout 
      step={1} 
      title="01 — Problem Definition"
      buildPanel={<BuildPanel step={1} promptText={promptText} />}
    >
      <div className="step-content">
        <h2>Define the Problem</h2>
        <p>What problem does the AI Resume Builder solve?</p>
        <ul>
          <li>Job seekers struggle to create professional resumes</li>
          <li>Formatting and design take too much time</li>
          <li>Difficulty tailoring resumes for different jobs</li>
          <li>Lack of guidance on what to include</li>
        </ul>
      </div>
    </PremiumLayout>
  );
}

export default Problem;
