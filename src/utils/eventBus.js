/**
 * Simple Event Bus for cross-module communication
 * Implements pub/sub pattern
 */
class EventBus {
  constructor() {
    this.events = {};
  }

  /**
   * Subscribe to an event
   * @param {string} event - Event name
   * @param {function} callback - Event handler
   * @returns {function} Unsubscribe function
   */
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);

    // Return unsubscribe function
    return () => {
      this.off(event, callback);
    };
  }

  /**
   * Unsubscribe from an event
   * @param {string} event - Event name
   * @param {function} callback - Event handler to remove
   */
  off(event, callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }

  /**
   * Emit an event
   * @param {string} event - Event name
   * @param {*} data - Data to pass to subscribers
   */
  emit(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in event handler for ${event}:`, error);
      }
    });
  }

  /**
   * Subscribe to an event once
   * @param {string} event - Event name
   * @param {function} callback - Event handler
   */
  once(event, callback) {
    const onceCallback = (data) => {
      this.off(event, onceCallback);
      callback(data);
    };
    this.on(event, onceCallback);
  }
}

// Export singleton instance
export const eventBus = new EventBus();

// Event names for standardization
export const Events = {
  // Resume events
  RESUME_UPDATED: 'resume:updated',
  RESUME_SAVED: 'resume:saved',
  TEMPLATE_CHANGED: 'template:changed',
  COLOR_CHANGED: 'color:changed',

  // Job events
  JOB_SAVED: 'job:saved',
  JOB_REMOVED: 'job:removed',

  // Application events
  APPLICATION_ADDED: 'application:added',
  APPLICATION_STATUS_CHANGED: 'application:status_changed',

  // JD Analysis events
  JD_ANALYZED: 'jd:analyzed',

  // Practice events
  PRACTICE_COMPLETED: 'practice:completed',
  ASSESSMENT_COMPLETED: 'assessment:completed',

  // Score events
  SCORE_UPDATED: 'score:updated',
  READINESS_SCORE_CALCULATED: 'readiness:score_calculated',

  // Navigation events
  NAVIGATE_TO: 'navigate:to',
  SHOW_NOTIFICATION: 'notification:show'
};

export default eventBus;
