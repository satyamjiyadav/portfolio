export interface Project {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  highlights: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  metrics: {
    label: string;
    value: string;
  }[];
  architecture: {
    type: 'event-driven' | 'rag-vector' | 'microservice' | 'general';
    flow: string[];
    deepDiveText: string;
  };
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  team: string;
  location: string;
  period: string;
  highlights: {
    title: string;
    points: string;
    tag: string;
    metricsGlow: string;
  }[];
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: {
    name: string;
    highlight?: boolean;
    tag?: string;
  }[];
}

export interface SystemMetric {
  id: string;
  label: string;
  value: string;
  subtext: string;
  iconName: string;
}

export interface ProfileInfo {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  leetcode: string;
  resumeUrl: string;
  resumeName: string;
  resumeUpdatedAt: string;
  education: {
    degree: string;
    college: string;
    period: string;
    cgpa: string;
  };
}

export interface PortfolioData {
  profile: ProfileInfo;
  systemMetrics: SystemMetric[];
  experience: ExperienceItem[];
  projects: Project[];
  skillCategories: SkillCategory[];
  adminPasscodeHash: string; // Master key for admin login
}
