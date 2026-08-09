import type { UserProfile, DailyChallenge, SkillItem, CommunityMember, AchievementBadge, NotificationItem, AIMentorRecommendation, DeveloperReport } from '../types';

export const presetAvatars = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
];

export const initialUser: UserProfile = {
  id: 'user_alex',
  email: 'alex.vance@dev.platform',
  name: 'Alex Vance',
  handle: '@alexvance_dev',
  avatar: presetAvatars[0],
  level: 12,
  currentXP: 2840,
  nextLevelXP: 3000,
  totalXP: 14840,
  streakDays: 17,
  streakHoursRemaining: 2,
  streakMinutesRemaining: 14,
  streakFreezes: 2,
  longestStreak: 17,
  projectsCompleted: 17,
  commitsTotal: 342,
  githubConnected: true,
  githubUsername: 'alexvance-builds',
  linkedinConnected: true,
  rank: 'Neural Architect (Platform Admin)',
  accountRole: 'admin',
  isAdmin: true,
};

export const secondaryUser: UserProfile = {
  id: 'user_sarah',
  email: 'sarah.chen@ai.build',
  name: 'Sarah Chen',
  handle: '@sarahchen_codes',
  avatar: presetAvatars[2],
  level: 5,
  currentXP: 950,
  nextLevelXP: 1500,
  totalXP: 4950,
  streakDays: 8,
  streakHoursRemaining: 14,
  streakMinutesRemaining: 30,
  streakFreezes: 1,
  longestStreak: 8,
  projectsCompleted: 7,
  commitsTotal: 145,
  githubConnected: true,
  githubUsername: 'sarahchen-ai',
  linkedinConnected: true,
  rank: 'Full-Stack Developer',
  accountRole: 'user',
  isAdmin: false,
};

export const sampleAccounts: UserProfile[] = [initialUser, secondaryUser];

// 60-Day Challenge Curriculum Generator
export const generate60Days = (userDay: number = 18): DailyChallenge[] => {
  const challenges: DailyChallenge[] = [
    {
      day: 1,
      title: 'Glassmorphic Developer Portfolio',
      summary: 'Build a futuristic personal landing page with Tailwind & HTML5.',
      description: 'Create your digital identity page featuring modern typography, glass panels, dark backdrop, and responsive contact form.',
      stack: ['HTML5', 'CSS3', 'Tailwind CSS'],
      difficulty: 'Beginner',
      estimatedHours: '2-3 hours',
      status: userDay > 1 ? 'completed' : 'current',
      xpReward: 100,
      completedAt: '17 days ago',
      repoUrl: 'https://github.com/alexvance-builds/day-01-portfolio',
      liveUrl: 'https://day01-portfolio.demo.app',
      codeReview: {
        overallScore: 92,
        quality: 95,
        documentation: 88,
        structure: 90,
        readme: 95,
        suggestions: [
          { title: 'Semantic Tags', description: 'Great use of header, main, and footer semantics.', type: 'praise' },
          { title: 'Image Optimization', description: 'Consider lazy loading background avatars.', type: 'improvement' },
        ]
      }
    },
    {
      day: 2,
      title: 'Interactive Task Matrix',
      summary: 'State management app with local storage persistence.',
      description: 'Build a task prioritization matrix using Eisenhower grid layout with smooth drag & reorder.',
      stack: ['JavaScript', 'Tailwind CSS', 'LocalStorage'],
      difficulty: 'Beginner',
      estimatedHours: '2 hours',
      status: userDay > 2 ? 'completed' : (userDay === 2 ? 'current' : 'locked'),
      xpReward: 120,
      completedAt: '16 days ago',
    },
    {
      day: 5,
      title: 'Neumorphic Scientific Calculator',
      summary: 'Keyboard accessible calculator with history stack.',
      description: 'Design and build a high-precision scientific calculator supporting trigonometric functions and dark mode toggle.',
      stack: ['React', 'TypeScript', 'Tailwind CSS'],
      difficulty: 'Intermediate',
      estimatedHours: '3 hours',
      status: userDay > 5 ? 'completed' : (userDay === 5 ? 'current' : 'locked'),
      xpReward: 150,
      completedAt: '13 days ago',
    },
    {
      day: 10,
      title: 'GitHub Repository Insights Dashboard',
      summary: 'Fetch repo metrics using GitHub REST API.',
      description: 'Visualize star trends, open issues, pull request velocity, and top committers for any public GitHub repo.',
      stack: ['React', 'Chart.js', 'GitHub API'],
      difficulty: 'Intermediate',
      estimatedHours: '4 hours',
      status: userDay > 10 ? 'completed' : (userDay === 10 ? 'current' : 'locked'),
      xpReward: 180,
      completedAt: '8 days ago',
    },
    {
      day: 15,
      title: 'Real-time Crypto & Stock Tracker',
      summary: 'WebSocket powered live ticker dashboard.',
      description: 'Build a real-time price monitoring web app with candlestick charts, price alert sound notifications, and portfolio tracking.',
      stack: ['React', 'Recharts', 'WebSockets', 'Tailwind'],
      difficulty: 'Intermediate',
      estimatedHours: '3.5 hours',
      status: userDay > 15 ? 'completed' : (userDay === 15 ? 'current' : 'locked'),
      xpReward: 200,
      completedAt: '3 days ago',
    },
    {
      day: 17,
      title: 'AI Prompt Engineering Playground',
      summary: 'Prompt testing workbench with token streaming.',
      description: 'Build a developer playground to compare prompt variations, measure latency, track token usage, and export JSON system prompts.',
      stack: ['React', 'OpenAI API', 'Framer Motion'],
      difficulty: 'Advanced',
      estimatedHours: '4 hours',
      status: userDay > 17 ? 'completed' : (userDay === 17 ? 'current' : 'locked'),
      xpReward: 220,
      completedAt: 'Yesterday',
    },
    {
      day: 18,
      title: 'Build a Kanban Board with Real-time Sync',
      summary: 'Interactive drag-and-drop workflow management app.',
      description: 'Construct a multi-column Kanban board featuring optimistic UI updates, real-time sync with Supabase PostgreSQL, task tags, priority filtering, and markdown card attachments.',
      stack: ['Next.js', 'Supabase', 'Tailwind CSS', 'dnd-kit'],
      difficulty: 'Intermediate',
      estimatedHours: '3–4 hours',
      status: userDay === 18 ? 'current' : (userDay > 18 ? 'completed' : 'locked'),
      xpReward: 250,
      repoUrl: 'https://github.com/alexvance-builds/day-18-kanban-board',
    },
    {
      day: 19,
      title: 'Multi-Tenant Authentication Gateway',
      summary: 'Secure OAuth 2.0 & magic link auth flow.',
      description: 'Implement secure JWT authentication, session refreshing, multi-factor auth (TOTP), and role-based permissions (RBAC).',
      stack: ['Next.js', 'NextAuth', 'Prisma', 'PostgreSQL'],
      difficulty: 'Intermediate',
      estimatedHours: '4 hours',
      status: userDay === 19 ? 'current' : (userDay > 19 ? 'completed' : 'locked'),
      xpReward: 250,
    },
    {
      day: 30,
      title: 'AI Resume & Portfolio Analyzer',
      summary: 'Intelligent PDF parser & ATS scoring pipeline.',
      description: 'Extract skills from resumes using LLM structured output, evaluate ATS formatting score, suggest missing keywords, and render visual report.',
      stack: ['FastAPI', 'Python', 'OpenAI API', 'React'],
      difficulty: 'Advanced',
      estimatedHours: '5 hours',
      status: userDay === 30 ? 'current' : (userDay > 30 ? 'completed' : 'locked'),
      xpReward: 350,
    },
    {
      day: 60,
      title: 'Full-Stack AI Developer SaaS Platform',
      summary: 'Production-ready AI product with Stripe billing.',
      description: 'Architect, build, and deploy a complete production-grade SaaS application with subscription billing, AI workflows, user analytics, and CI/CD pipelines.',
      stack: ['Next.js 14', 'TypeScript', 'Supabase', 'Stripe', 'Vercel'],
      difficulty: 'Advanced',
      estimatedHours: '8+ hours',
      status: userDay === 60 ? 'current' : (userDay > 60 ? 'completed' : 'locked'),
      xpReward: 1000,
    }
  ];

  const filled: DailyChallenge[] = [];
  const existingDaysMap = new Map(challenges.map(c => [c.day, c]));

  for (let i = 1; i <= 60; i++) {
    if (existingDaysMap.has(i)) {
      filled.push(existingDaysMap.get(i)!);
    } else {
      const isPast = i < userDay;
      const isCur = i === userDay;
      filled.push({
        day: i,
        title: `Challenge Day ${i}: ${getGenericTitle(i)}`,
        summary: `Master fundamental developer concepts and build real project components for Day ${i}.`,
        description: `Implement scalable features, write clean documentation, and push verified code to GitHub for Day ${i}.`,
        stack: getGenericStack(i),
        difficulty: i > 40 ? 'Advanced' : (i > 20 ? 'Intermediate' : 'Beginner'),
        estimatedHours: '2-4 hours',
        status: isPast ? 'completed' : (isCur ? 'current' : 'locked'),
        xpReward: 150 + i * 5,
        completedAt: isPast ? `${userDay - i} days ago` : undefined,
      });
    }
  }

  return filled;
};

function getGenericTitle(day: number): string {
  const topics = [
    'Custom Hook Micro-Library', 'DOM Animation Engine', 'RESTful API Server',
    'GraphQL Schema Resolver', 'Docker Containerization', 'CI/CD Pipeline Workflow',
    'PostgreSQL Query Optimization', 'Unit & E2E Testing Suite', 'WebRTC Peer Video Chat',
    'State Machine Architecture', 'Serverless Edge Functions', 'Monorepo Architecture'
  ];
  return topics[(day - 1) % topics.length];
}

function getGenericStack(day: number): string[] {
  const stacks = [
    ['React', 'TypeScript'],
    ['Node.js', 'Express'],
    ['Python', 'FastAPI'],
    ['Next.js', 'Tailwind CSS'],
    ['Docker', 'PostgreSQL'],
    ['Redis', 'WebSockets']
  ];
  return stacks[day % stacks.length];
}

export const initialSkills: SkillItem[] = [
  { id: '1', name: 'React / Next.js', category: 'Frontend', level: 88, xp: 4200, projectsCount: 12, icon: 'Layout', color: 'from-cyan-500 to-blue-600', nextMilestone: 'Server Components Mastery' },
  { id: '2', name: 'TypeScript', category: 'Language', level: 82, xp: 3800, projectsCount: 14, icon: 'Code2', color: 'from-blue-500 to-indigo-600', nextMilestone: 'Generic Type Systems' },
  { id: '3', name: 'Python / AI APIs', category: 'Backend & AI', level: 75, xp: 2900, projectsCount: 6, icon: 'BrainCircuit', color: 'from-purple-500 to-pink-600', nextMilestone: 'Vector Indexing & RAG' },
  { id: '4', name: 'PostgreSQL / Supabase', category: 'Database', level: 68, xp: 2100, projectsCount: 8, icon: 'Database', color: 'from-emerald-500 to-teal-600', nextMilestone: 'Row Level Security (RLS)' },
  { id: '5', name: 'Docker / DevOps', category: 'Infrastructure', level: 52, xp: 1400, projectsCount: 4, icon: 'Container', color: 'from-amber-500 to-orange-600', nextMilestone: 'Multi-Stage Container Builds' },
];

export const initialBadges: AchievementBadge[] = [
  { id: 'b1', title: '7 Day Streak', description: 'Maintained consistency for 7 straight days.', icon: '🔥', unlocked: true, unlockedAt: '10 days ago', rarity: 'Common', progress: 100, color: 'text-amber-400 border-amber-500/30' },
  { id: 'b2', title: '30 Day Streak', description: 'Halfway to legend status with 30 consecutive days.', icon: '⚡', unlocked: false, rarity: 'Epic', progress: 56, color: 'text-purple-400 border-purple-500/30' },
  { id: 'b3', title: 'First Project Shipped', description: 'Submitted first verified project with passing AI Code Review.', icon: '🚀', unlocked: true, unlockedAt: '17 days ago', rarity: 'Common', progress: 100, color: 'text-cyan-400 border-cyan-500/30' },
  { id: 'b4', title: 'AI Architect', description: 'Integrated LLMs into 3+ working project submissions.', icon: '🧠', unlocked: true, unlockedAt: '3 days ago', rarity: 'Rare', progress: 100, color: 'text-indigo-400 border-indigo-500/30' },
  { id: 'b5', title: 'Documentation Master', description: 'Achieved 90%+ README score across 5 consecutive projects.', icon: '📚', unlocked: false, rarity: 'Rare', progress: 80, color: 'text-emerald-400 border-emerald-500/30' },
  { id: 'b6', title: '60 Day Legend', description: 'Completed the ultimate 60-Day Developer Challenge.', icon: '🏆', unlocked: false, rarity: 'Legendary', progress: 28, color: 'text-yellow-400 border-yellow-500/30' },
];

export const initialCommunity: CommunityMember[] = [
  { id: 'c1', name: 'Rahul Sharma', handle: '@rahul_dev', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80', role: 'Full-Stack Developer', primaryStack: ['FastAPI', 'React', 'Python'], currentProject: 'AI Resume Analyzer', dayNumber: 28, streak: 28, level: 16, githubUrl: 'https://github.com', isFollowing: true },
  { id: 'c2', name: 'Sneha Patel', handle: '@sneha_tech', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', role: 'Frontend Engineer', primaryStack: ['Next.js', 'Tailwind', 'Three.js'], currentProject: '3D Product Configurator', dayNumber: 42, streak: 42, level: 21, githubUrl: 'https://github.com', isFollowing: false },
  { id: 'c3', name: 'Aman Verma', handle: '@amanv_codes', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', role: 'Backend Specialist', primaryStack: ['FastAPI', 'Docker', 'PostgreSQL'], currentProject: 'Distributed Task Queue', dayNumber: 18, streak: 17, level: 12, githubUrl: 'https://github.com', isFollowing: false },
  { id: 'c4', name: 'Elena Rostova', handle: '@elena_ai', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80', role: 'AI Systems Builder', primaryStack: ['Python', 'Qdrant', 'PyTorch'], currentProject: 'Vector Search Engine', dayNumber: 35, streak: 35, level: 19, githubUrl: 'https://github.com', isFollowing: true },
];

export const mentorRecommendation: AIMentorRecommendation = {
  projectTitle: 'Build a Kanban Board using Next.js + Supabase',
  stack: ['Next.js 14', 'Supabase PostgreSQL', 'Tailwind CSS', 'dnd-kit'],
  difficulty: 'Intermediate',
  estimatedHours: '3–4 hours',
  whyThisProject: [
    'Extends your solid React component skills into full-stack Next.js App Router patterns.',
    'Introduces real-time database subscription sync with Supabase PostgreSQL.',
    'Adds crucial backend authorization (Row Level Security) to your developer portfolio.',
    'Strengthens interactive state management with drag-and-drop micro-interactions.'
  ],
  skillGains: ['Next.js App Router', 'Supabase Real-time', 'Drag & Drop UX', 'Row Level Security'],
  prerequisites: ['React Hooks', 'CSS Flexbox/Grid', 'Basic SQL concepts']
};

export const initialNotifications: NotificationItem[] = [
  { id: 'n1', type: 'streak', title: 'Streak Guardian Warning', message: 'You are 1 submission away from keeping your streak! 2h 14m remaining.', timestamp: '10 mins ago', read: false },
  { id: 'n2', type: 'mentor', title: 'New AI Project Recommendation', message: 'Your AI Mentor prepared Day 18 Kanban Board specs tailored to your React experience.', timestamp: '1 hour ago', read: false },
  { id: 'n3', type: 'badge', title: 'Badge Unlocked!', message: 'You earned the "AI Architect" badge for completing 3 AI projects.', timestamp: 'Yesterday', read: true },
];

export const sampleReportCard: DeveloperReport = {
  totalCommits: 342,
  longestStreak: 17,
  projectsCompleted: 17,
  technologiesLearned: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Python', 'FastAPI', 'OpenAI API'],
  githubActivityPercentile: 94,
  consistencyScore: 96,
  xpEarned: 14840,
  badgesUnlocked: 4,
  radarData: [
    { subject: 'Frontend', score: 88 },
    { subject: 'Backend', score: 75 },
    { subject: 'Database', score: 68 },
    { subject: 'DevOps', score: 52 },
    { subject: 'AI / Prompting', score: 82 },
    { subject: 'Documentation', score: 90 },
  ]
};
