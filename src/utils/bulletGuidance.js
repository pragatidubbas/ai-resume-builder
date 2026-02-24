const ACTION_VERBS = [
  'built', 'developed', 'designed', 'implemented', 'led', 'improved',
  'created', 'optimized', 'automated', 'managed', 'launched', 'delivered',
  'established', 'increased', 'reduced', 'achieved', 'coordinated',
  'executed', 'facilitated', 'generated', 'initiated', 'maintained',
  'organized', 'planned', 'produced', 'resolved', 'streamlined',
  'transformed', 'upgraded', 'validated', 'architected', 'collaborated',
  'conducted', 'directed', 'enhanced', 'formulated', 'integrated'
];

export function checkBulletGuidance(text) {
  if (!text || text.trim().length === 0) {
    return [];
  }

  const suggestions = [];
  const trimmedText = text.trim().toLowerCase();
  const firstWord = trimmedText.split(/\s+/)[0];

  // Check for action verb
  const startsWithActionVerb = ACTION_VERBS.some(verb => 
    firstWord === verb || firstWord.startsWith(verb)
  );

  if (!startsWithActionVerb) {
    suggestions.push('Start with a strong action verb.');
  }

  // Check for numbers
  const hasNumbers = /\d/.test(text);
  if (!hasNumbers) {
    suggestions.push('Add measurable impact (numbers).');
  }

  return suggestions;
}
