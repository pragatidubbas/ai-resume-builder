export function getTopImprovements(resume) {
  const improvements = [];

  // Check projects
  if (resume.projects.length < 2) {
    improvements.push({
      priority: 1,
      text: 'Add at least 2 projects to showcase your work.'
    });
  }

  // Check for numbers in experience/projects
  const hasNumbers = [...resume.experience, ...resume.projects].some(item => {
    const text = item.description || '';
    return /\d/.test(text);
  });
  if (!hasNumbers) {
    improvements.push({
      priority: 2,
      text: 'Add measurable impact with numbers (%, X, k) in your bullets.'
    });
  }

  // Check summary length
  const summaryWords = resume.summary.trim().split(/\s+/).filter(w => w.length > 0).length;
  if (summaryWords < 40) {
    improvements.push({
      priority: 3,
      text: 'Expand your summary to 40-120 words for better impact.'
    });
  }

  // Check skills count
  const skillsArray = resume.skills
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0);
  if (skillsArray.length < 8) {
    improvements.push({
      priority: 4,
      text: 'Add more skills (target 8+) to improve ATS matching.'
    });
  }

  // Check experience
  if (resume.experience.length === 0) {
    improvements.push({
      priority: 5,
      text: 'Add work experience, internships, or relevant project work.'
    });
  }

  // Check links
  if (!resume.links.github && !resume.links.linkedin) {
    improvements.push({
      priority: 6,
      text: 'Add GitHub or LinkedIn link to strengthen your profile.'
    });
  }

  // Sort by priority and return top 3
  return improvements
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 3)
    .map(imp => imp.text);
}
