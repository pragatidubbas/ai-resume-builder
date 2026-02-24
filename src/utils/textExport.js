export function generateResumeText(resume) {
  const lines = [];

  // Name
  if (resume.personalInfo.name) {
    lines.push(resume.personalInfo.name);
    lines.push('');
  }

  // Contact
  const contactParts = [];
  if (resume.personalInfo.email) contactParts.push(resume.personalInfo.email);
  if (resume.personalInfo.phone) contactParts.push(resume.personalInfo.phone);
  if (resume.personalInfo.location) contactParts.push(resume.personalInfo.location);
  if (contactParts.length > 0) {
    lines.push(contactParts.join(' | '));
    lines.push('');
  }

  // Links
  const links = [];
  if (resume.links.github) links.push(`GitHub: ${resume.links.github}`);
  if (resume.links.linkedin) links.push(`LinkedIn: ${resume.links.linkedin}`);
  if (links.length > 0) {
    lines.push(...links);
    lines.push('');
  }

  // Summary
  if (resume.summary) {
    lines.push('SUMMARY');
    lines.push('-'.repeat(40));
    lines.push(resume.summary);
    lines.push('');
  }

  // Experience
  const validExperience = resume.experience.filter(exp => exp.company || exp.position);
  if (validExperience.length > 0) {
    lines.push('EXPERIENCE');
    lines.push('-'.repeat(40));
    validExperience.forEach(exp => {
      const title = [exp.position, exp.company].filter(Boolean).join(' - ');
      if (title) lines.push(title);
      if (exp.duration) lines.push(`Duration: ${exp.duration}`);
      if (exp.description) {
        // Split description by newlines or periods for bullet formatting
        const bullets = exp.description
          .split(/\n|\.\s+/)
          .map(s => s.trim())
          .filter(s => s.length > 0);
        bullets.forEach(bullet => {
          lines.push(`• ${bullet}${bullet.endsWith('.') ? '' : '.'}`);
        });
      }
      lines.push('');
    });
  }

  // Projects
  const validProjects = resume.projects.filter(proj => proj.name);
  if (validProjects.length > 0) {
    lines.push('PROJECTS');
    lines.push('-'.repeat(40));
    validProjects.forEach(proj => {
      lines.push(proj.name);
      if (proj.description) {
        const bullets = proj.description
          .split(/\n|\.\s+/)
          .map(s => s.trim())
          .filter(s => s.length > 0);
        bullets.forEach(bullet => {
          lines.push(`• ${bullet}${bullet.endsWith('.') ? '' : '.'}`);
        });
      }
      if (proj.tech) lines.push(`Technologies: ${proj.tech}`);
      lines.push('');
    });
  }

  // Education
  const validEducation = resume.education.filter(edu => edu.school || edu.degree);
  if (validEducation.length > 0) {
    lines.push('EDUCATION');
    lines.push('-'.repeat(40));
    validEducation.forEach(edu => {
      const title = [edu.degree, edu.school].filter(Boolean).join(' - ');
      if (title) lines.push(title);
      if (edu.year) lines.push(`Year: ${edu.year}`);
      lines.push('');
    });
  }

  // Skills
  if (resume.skills) {
    lines.push('SKILLS');
    lines.push('-'.repeat(40));
    lines.push(resume.skills);
    lines.push('');
  }

  return lines.join('\n');
}

export function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}

export function validateResumeForExport(resume) {
  const warnings = [];

  if (!resume.personalInfo.name || resume.personalInfo.name.trim() === '') {
    warnings.push('Name is missing');
  }

  const hasExperience = resume.experience.some(exp => exp.company || exp.position);
  const hasProjects = resume.projects.some(proj => proj.name);

  if (!hasExperience && !hasProjects) {
    warnings.push('No experience or projects added');
  }

  return {
    isValid: warnings.length === 0,
    warnings
  };
}
