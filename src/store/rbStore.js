const STORAGE_KEY = 'rb_project_data';

const defaultState = {
  artifacts: {
    step_1: null,
    step_2: null,
    step_3: null,
    step_4: null,
    step_5: null,
    step_6: null,
    step_7: null,
    step_8: null
  },
  proof: {
    lovableLink: '',
    githubLink: '',
    deployLink: ''
  }
};

export const rbStore = {
  getState() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultState;
  },

  setState(newState) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  },

  setArtifact(step, data) {
    const state = this.getState();
    state.artifacts[`step_${step}`] = data;
    this.setState(state);
  },

  getArtifact(step) {
    const state = this.getState();
    return state.artifacts[`step_${step}`];
  },

  setProofData(data) {
    const state = this.getState();
    state.proof = { ...state.proof, ...data };
    this.setState(state);
  },

  getProofData() {
    return this.getState().proof;
  },

  isStepUnlocked(step) {
    if (step === 1) return true;
    const state = this.getState();
    return state.artifacts[`step_${step - 1}`] !== null;
  }
};
