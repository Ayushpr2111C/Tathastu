export type TabType = 
  | 'overview'
  | 'challenges'
  | 'roadmap'
  | 'mentor'
  | 'projects'
  | 'skills'
  | 'community'
  | 'portfolio'
  | 'report'
  | 'badges'
  | 'admin';

export type ChallengeStatus = 'completed' | 'current' | 'locked';

export interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  type: string;
  content?: string;
}

export interface CodeReviewData {
  overallScore: number;
  quality: number;
  documentation: number;
  structure: number;
  readme: number;
  suggestions: {
    title: string;
    description: string;
    type: 'critical' | 'improvement' | 'praise';
    codeSnippet?: string;
  }[];
}

export interface DailyChallenge {
  day: number;
  title: string;
  summary: string;
  description: string;
  stack: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: string;
  status: ChallengeStatus;
  xpReward: number;
  completedAt?: string;
  repoUrl?: string;
  liveUrl?: string;
  codeReview?: CodeReviewData;
  uploadedFiles?: UploadedFileItem[];
  reflection?: {
    learned: string;
    biggestChallenge: string;
    hoursSpent: number;
  };
}

export interface UserProfile {
  id: string;
  email?: string;
  name: string;
  handle: string;
  avatar: string;
  level: number;
  currentXP: number;
  nextLevelXP: number;
  totalXP: number;
  streakDays: number;
  streakHoursRemaining: number;
  streakMinutesRemaining: number;
  streakFreezes: number;
  longestStreak: number;
  projectsCompleted: number;
  commitsTotal: number;
  githubConnected: boolean;
  githubUsername?: string;
  linkedinConnected: boolean;
  rank: string;
  createdAt?: string;
  accountRole?: 'admin' | 'user';
  isAdmin?: boolean;
}

export interface AIMentorRecommendation {
  projectTitle: string;
  stack: string[];
  difficulty: string;
  estimatedHours: string;
  whyThisProject: string[];
  skillGains: string[];
  prerequisites: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  level: number;
  xp: number;
  projectsCount: number;
  icon: string;
  color: string;
  nextMilestone: string;
}

export interface CommunityMember {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  role: string;
  primaryStack: string[];
  currentProject: string;
  dayNumber: number;
  streak: number;
  level: number;
  githubUrl: string;
  isFollowing?: boolean;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  progress: number;
  color: string;
}

export interface NotificationItem {
  id: string;
  type: 'streak' | 'mentor' | 'badge' | 'review' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface DeveloperReport {
  totalCommits: number;
  longestStreak: number;
  projectsCompleted: number;
  technologiesLearned: string[];
  githubActivityPercentile: number;
  consistencyScore: number;
  xpEarned: number;
  badgesUnlocked: number;
  radarData: { subject: string; score: number }[];
}
