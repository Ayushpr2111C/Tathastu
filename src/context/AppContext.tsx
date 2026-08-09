import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { 
  UserProfile, 
  DailyChallenge, 
  TabType, 
  NotificationItem, 
  SkillItem, 
  AchievementBadge, 
  CommunityMember,
  CodeReviewData,
  UploadedFileItem
} from '../types';
import { 
  initialUser, 
  sampleAccounts, 
  generate60Days, 
  initialSkills, 
  initialBadges, 
  initialCommunity, 
  initialNotifications 
} from '../data/mockData';
import { sounds } from '../utils/soundEffects';

interface AppContextType {
  user: UserProfile;
  accountsList: UserProfile[];
  challenges: DailyChallenge[];
  activeTab: TabType;
  viewMode: 'landing' | 'dashboard';
  notifications: NotificationItem[];
  skills: SkillItem[];
  badges: AchievementBadge[];
  community: CommunityMember[];
  selectedChallenge: DailyChallenge;
  
  // Modals state
  isSubmissionModalOpen: boolean;
  isCodeReviewModalOpen: boolean;
  isReflectionModalOpen: boolean;
  isStreakFreezeModalOpen: boolean;
  isNotificationCenterOpen: boolean;
  isLevelUpModalOpen: boolean;
  isAuthModalOpen: boolean;
  authMode: 'login' | 'signup' | 'switch';
  activeCodeReview: CodeReviewData | null;
  isMuted: boolean;
  
  // Actions
  startJourney: () => void;
  setActiveTab: (tab: TabType) => void;
  setSelectedChallenge: (challenge: DailyChallenge) => void;
  openSubmissionModal: (challenge?: DailyChallenge) => void;
  closeSubmissionModal: () => void;
  closeCodeReviewModal: () => void;
  closeReflectionModal: () => void;
  closeStreakFreezeModal: () => void;
  closeLevelUpModal: () => void;
  openStreakFreezeModal: () => void;
  toggleNotificationCenter: () => void;
  toggleSound: () => void;
  
  openAuthModal: (mode?: 'login' | 'signup' | 'switch') => void;
  closeAuthModal: () => void;
  setAuthMode: (mode: 'login' | 'signup' | 'switch') => void;
  switchAccount: (userId: string) => void;
  createAccount: (newUserData: {
    name: string;
    handle: string;
    avatar: string;
    role: string;
    githubUsername: string;
    linkedinConnected: boolean;
  }) => void;
  
  submitChallengeWork: (githubRepo: string, linkedinPost: string, files?: UploadedFileItem[]) => Promise<void>;
  activateStreakFreeze: () => void;
  saveReflection: (reflection: { learned: string; biggestChallenge: string; hoursSpent: number }) => void;
  toggleFollowMember: (memberId: string) => void;
  markNotificationRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved accounts with fail-safe default values
  const [accountsList, setAccountsList] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem('neura60_accounts');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(acc => ({
            ...initialUser,
            ...acc,
            streakDays: typeof acc.streakDays === 'number' ? acc.streakDays : 1,
            streakHoursRemaining: typeof acc.streakHoursRemaining === 'number' ? acc.streakHoursRemaining : 24,
            streakMinutesRemaining: typeof acc.streakMinutesRemaining === 'number' ? acc.streakMinutesRemaining : 0,
            streakFreezes: typeof acc.streakFreezes === 'number' ? acc.streakFreezes : 1,
            currentXP: typeof acc.currentXP === 'number' ? acc.currentXP : 0,
            nextLevelXP: typeof acc.nextLevelXP === 'number' ? acc.nextLevelXP : 500,
            level: typeof acc.level === 'number' ? acc.level : 1,
            totalXP: typeof acc.totalXP === 'number' ? acc.totalXP : 0,
          }));
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved accounts from localStorage:', e);
    }
    return sampleAccounts;
  });

  const [activeUserId, setActiveUserId] = useState<string>(() => {
    const saved = localStorage.getItem('neura60_active_user_id');
    return saved || initialUser.id;
  });

  const rawUser = accountsList.find(a => a.id === activeUserId) || accountsList[0] || initialUser;
  
  // Safe user proxy with fallback numbers
  const user: UserProfile = {
    ...initialUser,
    ...rawUser,
    streakDays: typeof rawUser.streakDays === 'number' ? rawUser.streakDays : 1,
    streakHoursRemaining: typeof rawUser.streakHoursRemaining === 'number' ? rawUser.streakHoursRemaining : 24,
    streakMinutesRemaining: typeof rawUser.streakMinutesRemaining === 'number' ? rawUser.streakMinutesRemaining : 0,
    streakFreezes: typeof rawUser.streakFreezes === 'number' ? rawUser.streakFreezes : 1,
    currentXP: typeof rawUser.currentXP === 'number' ? rawUser.currentXP : 0,
    nextLevelXP: typeof rawUser.nextLevelXP === 'number' ? rawUser.nextLevelXP : 500,
    level: typeof rawUser.level === 'number' ? rawUser.level : 1,
    totalXP: typeof rawUser.totalXP === 'number' ? rawUser.totalXP : 0,
  };

  // Challenges state keyed by user ID
  const [challenges, setChallenges] = useState<DailyChallenge[]>(() => {
    try {
      const saved = localStorage.getItem(`neura60_challenges_${user.id}`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load user challenges:', e);
    }
    return generate60Days(user.id === 'user_alex' ? 18 : 1);
  });

  const [activeTab, setActiveTabState] = useState<TabType>('overview');
  const [viewMode, setViewMode] = useState<'landing' | 'dashboard'>('landing');
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [skills] = useState<SkillItem[]>(initialSkills);
  const [badges] = useState<AchievementBadge[]>(initialBadges);
  const [community, setCommunity] = useState<CommunityMember[]>(initialCommunity);
  
  const [selectedChallenge, setSelectedChallenge] = useState<DailyChallenge>(
    (challenges && challenges.find(c => c.status === 'current')) || (challenges && challenges[0]) || generate60Days(1)[0]
  );

  // Modals state
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [isCodeReviewModalOpen, setIsCodeReviewModalOpen] = useState(false);
  const [isReflectionModalOpen, setIsReflectionModalOpen] = useState(false);
  const [isStreakFreezeModalOpen, setIsStreakFreezeModalOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'switch'>('switch');

  const [activeCodeReview, setActiveCodeReview] = useState<CodeReviewData | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  // Save accounts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('neura60_accounts', JSON.stringify(accountsList));
    } catch (e) {
      console.warn('Failed to save accounts to localStorage:', e);
    }
  }, [accountsList]);

  // Save active user ID to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('neura60_active_user_id', activeUserId);
    } catch (e) {
      console.warn('Failed to save active user ID:', e);
    }
  }, [activeUserId]);

  // Save user's challenges to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`neura60_challenges_${user.id}`, JSON.stringify(challenges));
    } catch (e) {
      console.warn('Failed to save user challenges:', e);
    }
  }, [challenges, user.id]);

  // Sync challenges when user switches
  const switchAccount = (userId: string) => {
    sounds.playClick();
    setActiveUserId(userId);
    const targetUser = accountsList.find(a => a.id === userId) || initialUser;
    
    let userChallenges: DailyChallenge[];
    try {
      const savedChallenges = localStorage.getItem(`neura60_challenges_${targetUser.id}`);
      userChallenges = savedChallenges ? JSON.parse(savedChallenges) : generate60Days(targetUser.id === 'user_alex' ? 18 : 1);
    } catch (e) {
      userChallenges = generate60Days(targetUser.id === 'user_alex' ? 18 : 1);
    }

    setChallenges(userChallenges);
    setSelectedChallenge(userChallenges.find((c: DailyChallenge) => c.status === 'current') || userChallenges[0]);
    
    setNotifications(prev => [
      {
        id: Date.now().toString(),
        type: 'system',
        title: `Switched Profile to ${targetUser.name}`,
        message: `Welcome back, ${targetUser.name}! Streak: ${targetUser.streakDays || 1} days.`,
        timestamp: 'Just now',
        read: false,
      },
      ...prev
    ]);
  };

  const createAccount = (newUserData: {
    name: string;
    handle: string;
    avatar: string;
    role: string;
    githubUsername: string;
    linkedinConnected: boolean;
  }) => {
    sounds.playLevelUp();
    const newId = `user_${Date.now()}`;
    const newUser: UserProfile = {
      id: newId,
      name: newUserData.name,
      handle: newUserData.handle,
      avatar: newUserData.avatar,
      level: 1,
      currentXP: 0,
      nextLevelXP: 500,
      totalXP: 0,
      streakDays: 1,
      streakHoursRemaining: 24,
      streakMinutesRemaining: 0,
      streakFreezes: 1,
      longestStreak: 1,
      projectsCompleted: 0,
      commitsTotal: 0,
      githubConnected: true,
      githubUsername: newUserData.githubUsername,
      linkedinConnected: newUserData.linkedinConnected,
      rank: `${newUserData.role} (Day 1)`,
      createdAt: 'Just now'
    };

    const newChallenges = generate60Days(1);

    setAccountsList(prev => [...prev, newUser]);
    setActiveUserId(newId);
    setChallenges(newChallenges);
    setSelectedChallenge(newChallenges[0]);
    setViewMode('dashboard');

    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 }
      });
    } catch (e) {
      console.warn('Confetti fail silent:', e);
    }
  };

  // Real-time Countdown timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setAccountsList(prev => prev.map(acc => {
        if (acc.id === activeUserId) {
          const minutes = acc.streakMinutesRemaining ?? 0;
          const hours = acc.streakHoursRemaining ?? 24;
          if (minutes > 0) {
            return { ...acc, streakMinutesRemaining: minutes - 1 };
          } else if (hours > 0) {
            return { ...acc, streakHoursRemaining: hours - 1, streakMinutesRemaining: 59 };
          }
        }
        return acc;
      }));
    }, 60000);
    return () => clearInterval(timer);
  }, [activeUserId]);

  const startJourney = () => {
    sounds.playClick();
    setViewMode('dashboard');
    setActiveTabState('overview');
  };

  const setActiveTab = (tab: TabType) => {
    sounds.playHover();
    setActiveTabState(tab);
  };

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sounds.setMuted(nextMuted);
    if (!nextMuted) {
      sounds.playClick();
    }
  };

  const openSubmissionModal = (challenge?: DailyChallenge) => {
    if (challenge) setSelectedChallenge(challenge);
    sounds.playClick();
    setIsSubmissionModalOpen(true);
  };

  const closeSubmissionModal = () => setIsSubmissionModalOpen(false);
  const closeCodeReviewModal = () => setIsCodeReviewModalOpen(false);
  const closeReflectionModal = () => setIsReflectionModalOpen(false);
  const closeStreakFreezeModal = () => setIsStreakFreezeModalOpen(false);
  const closeLevelUpModal = () => setIsLevelUpModalOpen(false);
  const openStreakFreezeModal = () => {
    sounds.playClick();
    setIsStreakFreezeModalOpen(true);
  };

  const openAuthModal = (mode: 'login' | 'signup' | 'switch' = 'switch') => {
    sounds.playClick();
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  const toggleNotificationCenter = () => {
    sounds.playClick();
    setIsNotificationCenterOpen(prev => !prev);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const toggleFollowMember = (memberId: string) => {
    sounds.playClick();
    setCommunity(prev => prev.map(m => m.id === memberId ? { ...m, isFollowing: !m.isFollowing } : m));
  };

  // Submission Flow with File Upload Support
  const submitChallengeWork = async (githubRepo: string, linkedinPost: string, files?: UploadedFileItem[]) => {
    sounds.playSubmitSuccess();

    const reviewScore = Math.floor(Math.random() * 12) + 86;
    const generatedReview: CodeReviewData = {
      overallScore: reviewScore,
      quality: 92,
      documentation: 85,
      structure: 88,
      readme: 82,
      suggestions: [
        {
          title: files && files.length > 0 ? 'Uploaded File Linting' : 'Row Level Security Policy',
          description: files && files.length > 0
            ? `Successfully analyzed ${files.length} project file(s): ${files.map(f => f.name).join(', ')}.`
            : 'Ensure Supabase RLS policies are enabled for public SELECT access on Kanban boards.',
          type: 'praise',
          codeSnippet: files && files[0]?.content ? files[0].content.slice(0, 150) + '...' : `CREATE POLICY "Allow public read" ON boards FOR SELECT USING (true);`
        },
        {
          title: 'Optimistic UI Updates',
          description: 'Great use of temporary state while dragging cards across columns!',
          type: 'praise'
        },
        {
          title: 'Folder Structure',
          description: 'Group Supabase client helpers under /src/lib/supabase for cleaner separation.',
          type: 'improvement'
        }
      ]
    };

    setActiveCodeReview(generatedReview);

    const currentDayNum = selectedChallenge?.day || 1;
    const rewardXP = selectedChallenge?.xpReward || 100;

    setChallenges(prev => prev.map(c => {
      if (c.day === currentDayNum) {
        return {
          ...c,
          status: 'completed',
          completedAt: 'Just now',
          repoUrl: githubRepo || c.repoUrl,
          liveUrl: linkedinPost || c.liveUrl,
          codeReview: generatedReview,
          uploadedFiles: files || c.uploadedFiles
        };
      }
      if (c.day === currentDayNum + 1) {
        return { ...c, status: 'current' };
      }
      return c;
    }));

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.warn('Confetti silent:', e);
    }

    setAccountsList(prev => prev.map(acc => {
      if (acc.id === user.id) {
        const curXP = acc.currentXP ?? 0;
        const nextXP = acc.nextLevelXP ?? 500;
        const newXP = curXP + rewardXP;
        const total = (acc.totalXP ?? 0) + rewardXP;
        let newLevel = acc.level ?? 1;
        let levelUpTriggered = false;

        if (newXP >= nextXP) {
          newLevel += 1;
          levelUpTriggered = true;
        }

        if (levelUpTriggered) {
          setTimeout(() => {
            sounds.playLevelUp();
            setIsLevelUpModalOpen(true);
            try {
              confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.5 }
              });
            } catch (e) {
              console.warn('Confetti silent:', e);
            }
          }, 500);
        }

        return {
          ...acc,
          currentXP: newXP >= nextXP ? newXP - nextXP : newXP,
          level: newLevel,
          totalXP: total,
          streakDays: (acc.streakDays ?? 1) + 1,
          streakHoursRemaining: 23,
          streakMinutesRemaining: 59,
          projectsCompleted: (acc.projectsCompleted ?? 0) + 1,
          commitsTotal: (acc.commitsTotal ?? 0) + 12
        };
      }
      return acc;
    }));

    const newNotif: NotificationItem = {
      id: Date.now().toString(),
      type: 'review',
      title: `Day ${currentDayNum} Verified!`,
      message: `AI Code Review score: ${reviewScore}/100. Earned +${rewardXP} XP!`,
      timestamp: 'Just now',
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);

    setIsSubmissionModalOpen(false);
    setIsCodeReviewModalOpen(true);
  };

  const activateStreakFreeze = () => {
    if ((user.streakFreezes ?? 0) <= 0) return;
    sounds.playStreakFreeze();
    
    setAccountsList(prev => prev.map(acc => {
      if (acc.id === user.id) {
        return {
          ...acc,
          streakFreezes: Math.max(0, (acc.streakFreezes ?? 1) - 1),
          streakHoursRemaining: (acc.streakHoursRemaining ?? 24) + 24,
        };
      }
      return acc;
    }));

    try {
      confetti({
        particleCount: 80,
        colors: ['#06b6d4', '#38bdf8', '#e0f2fe'],
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.warn('Confetti silent:', e);
    }

    setIsStreakFreezeModalOpen(false);

    setNotifications(prev => [
      {
        id: Date.now().toString(),
        type: 'streak',
        title: 'Streak Freeze Activated 🛡️',
        message: 'Your streak is safely protected for another 24 hours!',
        timestamp: 'Just now',
        read: false
      },
      ...prev
    ]);
  };

  const saveReflection = (reflection: { learned: string; biggestChallenge: string; hoursSpent: number }) => {
    sounds.playClick();
    if (selectedChallenge) {
      setChallenges(prev => prev.map(c => c.day === selectedChallenge.day ? { ...c, reflection } : c));
    }
    setIsReflectionModalOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        accountsList,
        challenges,
        activeTab,
        viewMode,
        notifications,
        skills,
        badges,
        community,
        selectedChallenge,
        isSubmissionModalOpen,
        isCodeReviewModalOpen,
        isReflectionModalOpen,
        isStreakFreezeModalOpen,
        isNotificationCenterOpen,
        isLevelUpModalOpen,
        isAuthModalOpen,
        authMode,
        activeCodeReview,
        isMuted,
        
        startJourney,
        setActiveTab,
        setSelectedChallenge,
        openSubmissionModal,
        closeSubmissionModal,
        closeCodeReviewModal,
        closeReflectionModal,
        closeStreakFreezeModal,
        closeLevelUpModal,
        openStreakFreezeModal,
        toggleNotificationCenter,
        toggleSound,
        
        openAuthModal,
        closeAuthModal,
        setAuthMode,
        switchAccount,
        createAccount,
        
        submitChallengeWork,
        activateStreakFreeze,
        saveReflection,
        toggleFollowMember,
        markNotificationRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
