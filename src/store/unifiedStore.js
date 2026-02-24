const UNIFIED_STORE_KEY = 'unifiedPlatformData';
const RESUME_STORE_KEY = 'resumeData';
const TEMPLATE_KEY = 'resumeTemplate';
const COLOR_KEY = 'resumeColor';

const defaultState = {
  preferences: {
    theme: 'light',
    template: 'classic',
    color: 'teal',
    notifications: true
  },
  resumeData: {
    personalInfo: { name: '', email: '', phone: '', location: '' },
    summary: '',
    experience: [],
    education: [],
    skills: { technical: [], soft: [], tools: [] },
    projects: [],
    links: { github: '', linkedin: '' }
  },
  jobMatches: [],
  applications: [],
  jdAnalyses: [],
  readinessScore: {
    overall: 0,
    breakdown: {
      jobMatchQuality: 0,
      jdSkillAlignment: 0,
      resumeATSScore: 0,
      applicationProgress: 0,
      practiceCompletion: 0
    }
  },
  practiceData: {
    completedAssessments: [],
    totalScore: 0,
    skillScores: {
      technical: 0,
      communication: 0,
      problemSolving: 0,
      aptitude: 0
    }
  },
  lastActivity: null
};

function getDefaultResume() {
  return {
    personalInfo: { name: '', email: '', phone: '', location: '' },
    summary: '',
    experience: [],
    education: [],
    skills: { technical: [], soft: [], tools: [] },
    projects: [],
    links: { github: '', linkedin: '' }
  };
}

export const unifiedStore = {
  // Get all unified data
  getData() {
    try {
      const stored = localStorage.getItem(UNIFIED_STORE_KEY);
      if (stored) {
        return { ...defaultState, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.error('Error reading unified store:', e);
    }
    return { ...defaultState };
  },

  // Save all unified data
  saveData(data) {
    try {
      localStorage.setItem(UNIFIED_STORE_KEY, JSON.stringify({
        ...data,
        lastActivity: new Date().toISOString()
      }));
    } catch (e) {
      console.error('Error saving unified store:', e);
    }
  },

  // Resume data methods
  getResume() {
    const data = this.getData();
    return data.resumeData || getDefaultResume();
  },

  saveResume(resumeData) {
    const data = this.getData();
    data.resumeData = resumeData;
    this.saveData(data);
  },

  // Template methods
  getTemplate() {
    const data = this.getData();
    return data.preferences?.template || 'classic';
  },

  saveTemplate(template) {
    const data = this.getData();
    data.preferences = { ...data.preferences, template };
    this.saveData(data);
  },

  // Color methods
  getColor() {
    const data = this.getData();
    return data.preferences?.color || 'teal';
  },

  saveColor(color) {
    const data = this.getData();
    data.preferences = { ...data.preferences, color };
    this.saveData(data);
  },

  // Job matches
  getJobMatches() {
    const data = this.getData();
    return data.jobMatches || [];
  },

  addJobMatch(job) {
    const data = this.getData();
    const exists = data.jobMatches.some(j => j.id === job.id);
    if (!exists) {
      data.jobMatches.push({ ...job, savedAt: new Date().toISOString() });
      this.saveData(data);
    }
  },

  removeJobMatch(jobId) {
    const data = this.getData();
    data.jobMatches = data.jobMatches.filter(j => j.id !== jobId);
    this.saveData(data);
  },

  // Applications
  getApplications() {
    const data = this.getData();
    return data.applications || [];
  },

  addApplication(application) {
    const data = this.getData();
    data.applications.push({
      ...application,
      id: Date.now().toString(),
      appliedAt: new Date().toISOString(),
      status: 'applied'
    });
    this.saveData(data);
  },

  updateApplicationStatus(appId, status) {
    const data = this.getData();
    const app = data.applications.find(a => a.id === appId);
    if (app) {
      app.status = status;
      app.updatedAt = new Date().toISOString();
      this.saveData(data);
    }
  },

  // JD Analyses
  getJDAnalyses() {
    const data = this.getData();
    return data.jdAnalyses || [];
  },

  addJDAnalysis(analysis) {
    const data = this.getData();
    data.jdAnalyses.push({
      ...analysis,
      id: Date.now().toString(),
      analyzedAt: new Date().toISOString()
    });
    this.saveData(data);
  },

  // Practice data
  getPracticeData() {
    const data = this.getData();
    return data.practiceData || defaultState.practiceData;
  },

  updatePracticeData(practiceData) {
    const data = this.getData();
    data.practiceData = { ...data.practiceData, ...practiceData };
    this.saveData(data);
  },

  // Readiness score
  getReadinessScore() {
    const data = this.getData();
    return data.readinessScore || defaultState.readinessScore;
  },

  saveReadinessScore(score) {
    const data = this.getData();
    data.readinessScore = score;
    this.saveData(data);
  },

  // Legacy migration - migrate old separate stores to unified
  migrateFromLegacy() {
    try {
      const data = this.getData();
      let migrated = false;

      // Migrate old resume data
      const oldResume = localStorage.getItem(RESUME_STORE_KEY);
      if (oldResume) {
        data.resumeData = { ...data.resumeData, ...JSON.parse(oldResume) };
        migrated = true;
      }

      // Migrate old template
      const oldTemplate = localStorage.getItem(TEMPLATE_KEY);
      if (oldTemplate) {
        data.preferences.template = oldTemplate;
        migrated = true;
      }

      // Migrate old color
      const oldColor = localStorage.getItem(COLOR_KEY);
      if (oldColor) {
        data.preferences.color = oldColor;
        migrated = true;
      }

      if (migrated) {
        this.saveData(data);
        console.log('Successfully migrated legacy data to unified store');
      }

      return migrated;
    } catch (e) {
      console.error('Error migrating legacy data:', e);
      return false;
    }
  },

  // Clear all data
  clearAll() {
    localStorage.removeItem(UNIFIED_STORE_KEY);
  }
};

// Initialize migration on load
unifiedStore.migrateFromLegacy();
