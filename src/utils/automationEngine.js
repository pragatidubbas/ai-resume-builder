import { eventBus, Events } from './eventBus';
import { unifiedStore } from '../store/unifiedStore';
import { calculateReadinessScore } from './readinessScore';

/**
 * Automation Rules Engine
 * Handles cross-module automation and triggers
 */

// Define automation rules
const automationRules = [
  {
    id: 'auto-update-readiness',
    trigger: Events.RESUME_UPDATED,
    action: updateReadinessScore,
    description: 'Recalculate readiness score when resume is updated'
  },
  {
    id: 'auto-update-readiness-on-job',
    trigger: Events.JOB_SAVED,
    action: updateReadinessScore,
    description: 'Recalculate readiness score when job is saved'
  },
  {
    id: 'auto-update-readiness-on-application',
    trigger: Events.APPLICATION_ADDED,
    action: updateReadinessScore,
    description: 'Recalculate readiness score when application is added'
  },
  {
    id: 'auto-update-readiness-on-practice',
    trigger: Events.PRACTICE_COMPLETED,
    action: updateReadinessScore,
    description: 'Recalculate readiness score when practice is completed'
  },
  {
    id: 'auto-suggest-resume-updates',
    trigger: Events.JD_ANALYZED,
    action: suggestResumeUpdates,
    description: 'Suggest resume updates based on JD analysis'
  },
  {
    id: 'auto-check-job-matches',
    trigger: Events.RESUME_SAVED,
    action: checkJobMatches,
    description: 'Check for new job matches when resume is saved'
  },
  {
    id: 'track-last-activity',
    trigger: '*',
    action: trackLastActivity,
    description: 'Track last activity timestamp on any event'
  }
];

/**
 * Update readiness score
 */
function updateReadinessScore() {
  try {
    const data = unifiedStore.getData();
    const score = calculateReadinessScore(data);
    unifiedStore.saveReadinessScore(score);
    eventBus.emit(Events.READINESS_SCORE_CALCULATED, score);
  } catch (error) {
    console.error('Error updating readiness score:', error);
  }
}

/**
 * Suggest resume updates based on JD analysis
 */
function suggestResumeUpdates(analysis) {
  try {
    const resume = unifiedStore.getResume();
    const suggestions = [];

    // Check for missing skills
    if (analysis.requiredSkills && analysis.requiredSkills.length > 0) {
      const resumeSkills = [
        ...(resume.skills?.technical || []),
        ...(resume.skills?.soft || []),
        ...(resume.skills?.tools || [])
      ].map(s => s.toLowerCase());

      const missingSkills = analysis.requiredSkills.filter(skill =>
        !resumeSkills.some(resumeSkill =>
          resumeSkill.includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(resumeSkill)
        )
      );

      if (missingSkills.length > 0) {
        suggestions.push({
          type: 'skills',
          message: `Consider adding these skills: ${missingSkills.slice(0, 3).join(', ')}`,
          missingSkills: missingSkills.slice(0, 5)
        });
      }
    }

    // Check for keywords in summary
    if (analysis.keywords && analysis.keywords.length > 0) {
      const summary = (resume.summary || '').toLowerCase();
      const missingKeywords = analysis.keywords.filter(keyword =>
        !summary.includes(keyword.toLowerCase())
      );

      if (missingKeywords.length > 0) {
        suggestions.push({
          type: 'summary',
          message: 'Your summary could include more relevant keywords',
          keywords: missingKeywords.slice(0, 5)
        });
      }
    }

    // Emit suggestions if any
    if (suggestions.length > 0) {
      eventBus.emit('resume:suggestions', {
        source: 'jd_analysis',
        analysisId: analysis.id,
        suggestions
      });
    }
  } catch (error) {
    console.error('Error suggesting resume updates:', error);
  }
}

/**
 * Check for job matches when resume is updated
 */
function checkJobMatches() {
  try {
    const data = unifiedStore.getData();
    const { resumeData, jobMatches } = data;

    if (!jobMatches || jobMatches.length === 0) {
      return;
    }

    // Get resume skills
    const resumeSkills = [
      ...(resumeData.skills?.technical || []),
      ...(resumeData.skills?.soft || []),
      ...(resumeData.skills?.tools || [])
    ].map(s => s.toLowerCase());

    // Check each job for improved match
    const updatedMatches = jobMatches.map(job => {
      if (!job.requiredSkills || job.matchScore === 100) {
        return job;
      }

      const matchedSkills = job.requiredSkills.filter(skill =>
        resumeSkills.some(resumeSkill =>
          resumeSkill.includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(resumeSkill)
        )
      );

      const newMatchScore = Math.round((matchedSkills.length / job.requiredSkills.length) * 100);

      if (newMatchScore > (job.matchScore || 0)) {
        return {
          ...job,
          matchScore: newMatchScore,
          matchedSkills,
          updatedAt: new Date().toISOString()
        };
      }

      return job;
    });

    // Save updated matches if changed
    const hasChanges = updatedMatches.some((job, index) =>
      job.matchScore !== jobMatches[index].matchScore
    );

    if (hasChanges) {
      const newData = unifiedStore.getData();
      newData.jobMatches = updatedMatches;
      unifiedStore.saveData(newData);

      eventBus.emit('jobs:matches_updated', { matches: updatedMatches });
    }
  } catch (error) {
    console.error('Error checking job matches:', error);
  }
}

/**
 * Track last activity
 */
function trackLastActivity() {
  try {
    const data = unifiedStore.getData();
    data.lastActivity = new Date().toISOString();
    unifiedStore.saveData(data);
  } catch (error) {
    console.error('Error tracking activity:', error);
  }
}

/**
 * Initialize automation engine
 * Sets up all event listeners
 */
export function initAutomationEngine() {
  // Subscribe to each rule
  automationRules.forEach(rule => {
    if (rule.trigger === '*') {
      // Subscribe to all events
      Object.values(Events).forEach(event => {
        eventBus.on(event, rule.action);
      });
    } else {
      eventBus.on(rule.trigger, rule.action);
    }
  });

  console.log('Automation engine initialized with', automationRules.length, 'rules');
}

/**
 * Get all automation rules (for debugging/admin)
 */
export function getAutomationRules() {
  return automationRules.map(rule => ({
    id: rule.id,
    trigger: rule.trigger,
    description: rule.description
  }));
}

/**
 * Manually trigger an automation action
 */
export function triggerAutomation(ruleId) {
  const rule = automationRules.find(r => r.id === ruleId);
  if (rule) {
    rule.action();
    return true;
  }
  return false;
}

export default {
  init: initAutomationEngine,
  getRules: getAutomationRules,
  trigger: triggerAutomation
};
