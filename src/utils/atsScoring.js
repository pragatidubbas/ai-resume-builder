const ACTION_VERBS = [
  'built', 'developed', 'designed', 'implemented', 'led', 'improved',
  'created', 'optimized', 'automated', 'managed', 'launched', 'delivered',
  'established', 'increased', 'reduced', 'achieved', 'coordinated',
  'executed', 'facilitated', 'generated', 'initiated', 'maintained',
  'organized', 'planned', 'produced', 'resolved', 'streamlined',
  'transformed', 'upgraded', 'validated', 'architected', 'collaborated',
  'conducted', 'directed', 'enhanced', 'formulated', 'integrated'
];

export function calculateATSScore(resume) {
  let score = 0;
  const suggestions = [];

  // +10 if name provided
  if (resume.personalInfo.name && resume.personalInfo.name.trim().length > 0) {
    score += 10;
  } else {
    suggestions.push('Add your name (+10 points)');
  }

  // +10 if email provided
  if (resume.personalInfo.email && resume.personalInfo.email.trim().length > 0) {
    score += 10;
  } else {
    suggestions.push('Add your email (+10 points)');
  }

  // +10 if summary > 50 chars
  if (resume.summary && resume.summary.trim().length > 50) {
    score += 10;
  } else {
    suggestions.push('Add a professional summary (+10 points)');
  }

  // +15 if at least 1 experience entry with bullets
  const hasExperienceWithBullets = resume.experience.some(exp => 
    exp.description && exp.description.trim().length > 0
  );
  if (hasExperienceWithBullets) {
    score += 15;
  } else {
    suggestions.push('Add work experience with descriptions (+15 points)');
  }

  // +10 if at least 1 education entry
  if (resume.education.length >= 1) {
    score += 10;
  } else {
    suggestions.push('Add education (+10 points)');
  }

  // +10 if at least 5 skills added
  const skillsArray = [
    ...(resume.skills.technical || []),
    ...(resume.skills.soft || []),
    ...(resume.skills.tools || [])
  ];
  if (skillsArray.length >= 5) {
    score += 10;
  } else {
    suggestions.push(`Add more skills (${5 - skillsArray.length} more for +10 points)`);
  }

  // +10 if at least 1 project added
  if (resume.projects.length >= 1) {
    score += 10;
  } else {
    suggestions.push('Add a project (+10 points)');
  }

  // +5 if phone provided
  if (resume.personalInfo.phone && resume.personalInfo.phone.trim().length > 0) {
    score += 5;
  } else {
    suggestions.push('Add phone number (+5 points)');
  }

  // +5 if LinkedIn provided
  if (resume.links.linkedin && resume.links.linkedin.trim().length > 0) {
    score += 5;
  } else {
    suggestions.push('Add LinkedIn URL (+5 points)');
  }

  // +5 if GitHub provided
  if (resume.links.github && resume.links.github.trim().length > 0) {
    score += 5;
  } else {
    suggestions.push('Add GitHub URL (+5 points)');
  }

  // +10 if summary contains action verbs
  const summaryLower = (resume.summary || '').toLowerCase();
  const hasActionVerb = ACTION_VERBS.some(verb => summaryLower.includes(verb));
  if (hasActionVerb) {
    score += 10;
  } else {
    suggestions.push('Use action verbs in summary (built, led, designed...) (+10 points)');
  }

  // Cap at 100
  score = Math.min(score, 100);

  return {
    score,
    suggestions: suggestions.slice(0, 5)
  };
}

export function getScoreCategory(score) {
  if (score >= 71) return { label: 'Strong Resume', color: '#22c55e' };
  if (score >= 41) return { label: 'Getting There', color: '#f59e0b' };
  return { label: 'Needs Work', color: '#ef4444' };
}
