export function calculateATSScore(resume) {
  let score = 0;
  const suggestions = [];

  // +15 if summary length is 40–120 words
  const summaryWords = resume.summary.trim().split(/\s+/).filter(w => w.length > 0).length;
  if (summaryWords >= 40 && summaryWords <= 120) {
    score += 15;
  } else if (summaryWords < 40) {
    suggestions.push('Write a stronger summary (40–120 words).');
  }

  // +10 if at least 2 projects
  if (resume.projects.length >= 2) {
    score += 10;
  } else {
    suggestions.push('Add at least 2 projects.');
  }

  // +10 if at least 1 experience entry
  if (resume.experience.length >= 1) {
    score += 10;
  } else {
    suggestions.push('Add at least 1 work experience entry.');
  }

  // +10 if skills list has ≥ 8 items
  const skillsArray = [
    ...(resume.skills.technical || []),
    ...(resume.skills.soft || []),
    ...(resume.skills.tools || [])
  ];
  if (skillsArray.length >= 8) {
    score += 10;
  } else {
    suggestions.push('Add more skills (target 8+).');
  }

  // +10 if GitHub or LinkedIn link exists
  if (resume.links.github || resume.links.linkedin) {
    score += 10;
  } else {
    suggestions.push('Add GitHub or LinkedIn link.');
  }

  // +15 if any experience/project bullet contains a number (%, X, k, etc.)
  const hasNumbers = [...resume.experience, ...resume.projects].some(item => {
    const text = item.description || '';
    return /\d/.test(text);
  });
  if (hasNumbers) {
    score += 15;
  } else {
    suggestions.push('Add measurable impact (numbers) in bullets.');
  }

  // +10 if education section has complete fields
  const hasCompleteEducation = resume.education.some(edu => 
    edu.school && edu.degree && edu.year
  );
  if (hasCompleteEducation) {
    score += 10;
  } else if (resume.education.length > 0) {
    suggestions.push('Complete all education fields (school, degree, year).');
  }

  // Cap at 100
  score = Math.min(score, 100);

  // Return top 3 suggestions
  return {
    score,
    suggestions: suggestions.slice(0, 3)
  };
}
