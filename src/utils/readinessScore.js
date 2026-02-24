import { calculateATSScore } from './atsScoring';

const WEIGHTS = {
  jobMatchQuality: 0.30,
  jdSkillAlignment: 0.25,
  resumeATSScore: 0.25,
  applicationProgress: 0.10,
  practiceCompletion: 0.10
};

/**
 * Calculate Job Match Quality Score (0-100)
 * Based on number of job matches and their relevance
 */
function calculateJobMatchQuality(jobMatches) {
  if (!jobMatches || jobMatches.length === 0) {
    return 0;
  }

  // Base score for having matches
  let score = Math.min(jobMatches.length * 10, 40);

  // Bonus for high-match jobs (>80% match)
  const highMatches = jobMatches.filter(job => (job.matchScore || 0) > 80).length;
  score += highMatches * 15;

  // Bonus for recent matches (within last 30 days)
  const recentMatches = jobMatches.filter(job => {
    if (!job.savedAt) return false;
    const daysSince = (Date.now() - new Date(job.savedAt).getTime()) / (1000 * 60 * 60 * 24);
    return daysSince <= 30;
  }).length;
  score += recentMatches * 5;

  return Math.min(score, 100);
}

/**
 * Calculate JD Skill Alignment Score (0-100)
 * Based on how well resume skills match analyzed JDs
 */
function calculateJDAlignment(jdAnalyses, resumeData) {
  if (!jdAnalyses || jdAnalyses.length === 0) {
    return 0;
  }

  if (!resumeData) {
    return 0;
  }

  // Get all resume skills
  const resumeSkills = [
    ...(resumeData.skills?.technical || []),
    ...(resumeData.skills?.soft || []),
    ...(resumeData.skills?.tools || [])
  ].map(s => s.toLowerCase());

  let totalAlignment = 0;

  jdAnalyses.forEach(analysis => {
    if (!analysis.requiredSkills || analysis.requiredSkills.length === 0) {
      return;
    }

    const requiredSkills = analysis.requiredSkills.map(s => s.toLowerCase());
    const matchedSkills = requiredSkills.filter(skill =>
      resumeSkills.some(resumeSkill => resumeSkill.includes(skill) || skill.includes(resumeSkill))
    );

    const alignment = (matchedSkills.length / requiredSkills.length) * 100;
    totalAlignment += alignment;
  });

  const averageAlignment = totalAlignment / jdAnalyses.length;

  // Bonus for having multiple analyses
  const analysisBonus = Math.min((jdAnalyses.length - 1) * 5, 20);

  return Math.min(averageAlignment + analysisBonus, 100);
}

/**
 * Calculate Application Progress Score (0-100)
 * Based on application statuses and follow-ups
 */
function calculateApplicationProgress(applications) {
  if (!applications || applications.length === 0) {
    return 0;
  }

  const statusScores = {
    'applied': 20,
    'screening': 40,
    'interview': 60,
    'offer': 80,
    'accepted': 100,
    'rejected': 10
  };

  let totalScore = 0;
  applications.forEach(app => {
    totalScore += statusScores[app.status] || 10;
  });

  const averageScore = totalScore / applications.length;

  // Bonus for having multiple applications
  const volumeBonus = Math.min((applications.length - 1) * 5, 25);

  return Math.min(averageScore + volumeBonus, 100);
}

/**
 * Calculate Practice Completion Score (0-100)
 * Based on completed assessments and skill scores
 */
function calculatePracticeCompletion(practiceData) {
  if (!practiceData) {
    return 0;
  }

  const { completedAssessments, skillScores } = practiceData;

  // Base score from completed assessments
  let score = 0;
  if (completedAssessments && completedAssessments.length > 0) {
    score = Math.min(completedAssessments.length * 15, 50);
  }

  // Add skill scores
  if (skillScores) {
    const skillValues = Object.values(skillScores);
    if (skillValues.length > 0) {
      const averageSkillScore = skillValues.reduce((a, b) => a + b, 0) / skillValues.length;
      score += averageSkillScore * 0.5;
    }
  }

  return Math.min(score, 100);
}

/**
 * Calculate overall readiness score
 * Returns object with overall score and breakdown
 */
export function calculateReadinessScore(data) {
  const {
    resumeData,
    jobMatches,
    applications,
    jdAnalyses,
    practiceData
  } = data;

  // Calculate each component
  const jobMatchScore = calculateJobMatchQuality(jobMatches);
  const jdAlignmentScore = calculateJDAlignment(jdAnalyses, resumeData);
  const atsScore = calculateATSScore(resumeData).score;
  const appProgressScore = calculateApplicationProgress(applications);
  const practiceScore = calculatePracticeCompletion(practiceData);

  // Calculate weighted overall score
  const overall = Math.round(
    jobMatchScore * WEIGHTS.jobMatchQuality +
    jdAlignmentScore * WEIGHTS.jdSkillAlignment +
    atsScore * WEIGHTS.resumeATSScore +
    appProgressScore * WEIGHTS.applicationProgress +
    practiceScore * WEIGHTS.practiceCompletion
  );

  return {
    overall,
    breakdown: {
      jobMatchQuality: Math.round(jobMatchScore),
      jdSkillAlignment: Math.round(jdAlignmentScore),
      resumeATSScore: atsScore,
      applicationProgress: Math.round(appProgressScore),
      practiceCompletion: Math.round(practiceScore)
    }
  };
}

/**
 * Get score category and color
 */
export function getReadinessCategory(score) {
  if (score >= 80) {
    return { label: 'Excellent', color: '#22c55e', bgColor: '#dcfce7' };
  }
  if (score >= 60) {
    return { label: 'Good', color: '#3b82f6', bgColor: '#dbeafe' };
  }
  if (score >= 40) {
    return { label: 'Fair', color: '#f59e0b', bgColor: '#fef3c7' };
  }
  return { label: 'Needs Work', color: '#ef4444', bgColor: '#fee2e2' };
}

/**
 * Get recommendations based on score breakdown
 */
export function getReadinessRecommendations(breakdown) {
  const recommendations = [];

  if (breakdown.resumeATSScore < 70) {
    recommendations.push({
      priority: 'high',
      message: 'Improve your resume ATS score',
      action: '/resume',
      points: Math.round((70 - breakdown.resumeATSScore) * 0.25)
    });
  }

  if (breakdown.jdSkillAlignment < 60) {
    recommendations.push({
      priority: 'high',
      message: 'Analyze more job descriptions to align your skills',
      action: '/analyze',
      points: Math.round((60 - breakdown.jdSkillAlignment) * 0.25)
    });
  }

  if (breakdown.jobMatchQuality < 50) {
    recommendations.push({
      priority: 'medium',
      message: 'Save more job matches to increase opportunities',
      action: '/jobs',
      points: Math.round((50 - breakdown.jobMatchQuality) * 0.30)
    });
  }

  if (breakdown.applicationProgress < 40) {
    recommendations.push({
      priority: 'medium',
      message: 'Apply to more jobs and track your applications',
      action: '/applications',
      points: Math.round((40 - breakdown.applicationProgress) * 0.10)
    });
  }

  if (breakdown.practiceCompletion < 50) {
    recommendations.push({
      priority: 'low',
      message: 'Complete practice assessments to improve readiness',
      action: '/proof',
      points: Math.round((50 - breakdown.practiceCompletion) * 0.10)
    });
  }

  return recommendations.sort((a, b) => b.points - a.points);
}
