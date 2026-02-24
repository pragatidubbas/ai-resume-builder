const STORAGE_KEY = 'resumeBuilderData';
const TEMPLATE_KEY = 'resumeTemplate';

const defaultResume = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: ''
  },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: {
    technical: [],
    soft: [],
    tools: []
  },
  links: {
    github: '',
    linkedin: ''
  }
};

export const resumeStore = {
  getResume() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultResume;
  },

  saveResume(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  getTemplate() {
    return localStorage.getItem(TEMPLATE_KEY) || 'classic';
  },

  saveTemplate(template) {
    localStorage.setItem(TEMPLATE_KEY, template);
  },

  loadSampleData() {
    const sample = {
      personalInfo: {
        name: 'Alex Johnson',
        email: 'alex.johnson@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA'
      },
      summary: 'Full-stack developer with 5+ years of experience building scalable web applications. Passionate about clean code and user experience.',
      education: [
        {
          id: Date.now(),
          school: 'Stanford University',
          degree: 'Bachelor of Science in Computer Science',
          year: '2015 - 2019'
        }
      ],
      experience: [
        {
          id: Date.now(),
          company: 'Tech Corp',
          position: 'Senior Software Engineer',
          duration: '2021 - Present',
          description: 'Led development of microservices architecture serving 1M+ users. Reduced API response time by 40%.'
        },
        {
          id: Date.now() + 1,
          company: 'StartupXYZ',
          position: 'Software Engineer',
          duration: '2019 - 2021',
          description: 'Built responsive web applications using React and Node.js. Implemented CI/CD pipelines.'
        }
      ],
      projects: [
        {
          id: Date.now(),
          name: 'E-commerce Platform',
          description: 'Built a full-stack e-commerce platform with payment integration and real-time inventory management.',
          tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
          liveUrl: '',
          githubUrl: ''
        }
      ],
      skills: {
        technical: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL'],
        soft: ['Communication', 'Problem Solving'],
        tools: ['AWS', 'Docker', 'Git']
      },
      links: {
        github: 'github.com/alexjohnson',
        linkedin: 'linkedin.com/in/alexjohnson'
      }
    };
    this.saveResume(sample);
    return sample;
  }
};
