/* ============================================
   App Context — global state
   User auth + progress + achievement toasts
   ============================================ */
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import {
  type User, type UserProgress,
  getCurrentUser, registerUser, loginUser, logout,
  getProgress, recordStudySession, completeLesson, addLearnedWords,
  incrementGrammar, incrementSpeaking, checkAchievements, getTodayMinutes,
} from '../lib/storage';
import { ACHIEVEMENTS } from '../data/content';

interface Toast {
  id: string;
  type: 'achievement' | 'info';
  title: string;
  desc: string;
  icon?: string;
}

interface AppContextValue {
  user: User | null;
  progress: UserProgress;
  toasts: Toast[];
  dismissToast: (id: string) => void;
  signup: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  login: (email: string, password: string) => { ok: boolean; error?: string };
  signout: () => void;
  refreshProgress: () => void;
  recordSession: (minutes: number) => void;
  finishLesson: (lessonId: string, xp: number, words?: string[]) => void;
  recordGrammar: (count: number) => void;
  recordSpeaking: (count: number) => void;
  todayMinutes: number;
}

const AppContext = createContext<AppContextValue | null>(null);

const emptyProgress: UserProgress = {
  userId: '', xp: 0, completedLessons: [], learnedWords: [], grammarAnswered: 0,
  speakingCompleted: 0, streak: 0, lastStudyDate: null, studyDates: [],
  minutesStudied: {}, unlockedAchievements: [], dailyGoalMinutes: 15,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [progress, setProgress] = useState<UserProgress>(
    () => { const u = getCurrentUser(); return u ? getProgress(u.id) : emptyProgress; }
  );
  const [toasts, setToasts] = useState<Toast[]>([]);

  const pushToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = crypto.randomUUID();
    setToasts(t => [...t, { ...toast, id }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 5000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(t => t.filter(x => x.id !== id));
  }, []);

  const refreshProgress = useCallback(() => {
    if (user) setProgress(getProgress(user.id));
  }, [user]);

  const signup = useCallback((name: string, email: string, password: string) => {
    const res = registerUser(name, email, password);
    if (res.ok) {
      const u = getCurrentUser();
      setUser(u);
      if (u) setProgress(getProgress(u.id));
    }
    return res;
  }, []);

  const login = useCallback((email: string, password: string) => {
    const res = loginUser(email, password);
    if (res.ok) {
      const u = getCurrentUser();
      setUser(u);
      if (u) setProgress(getProgress(u.id));
    }
    return res;
  }, []);

  const signout = useCallback(() => {
    logout();
    setUser(null);
    setProgress(emptyProgress);
  }, []);

  const recordSession = useCallback((minutes: number) => {
    if (!user) return;
    recordStudySession(user.id, minutes);
    refreshProgress();
  }, [user, refreshProgress]);

  const finishLesson = useCallback((lessonId: string, xp: number, words?: string[]) => {
    if (!user) return;
    completeLesson(user.id, lessonId, xp);
    if (words && words.length) addLearnedWords(user.id, words);
    recordStudySession(user.id, 3);
    const { newlyUnlocked } = checkAchievements(user.id);
    refreshProgress();
    newlyUnlocked.forEach(id => {
      const a = ACHIEVEMENTS.find(x => x.id === id);
      if (a) pushToast({ type: 'achievement', title: '成就解锁!', desc: a.name, icon: a.icon });
    });
  }, [user, refreshProgress, pushToast]);

  const recordGrammar = useCallback((count: number) => {
    if (!user) return;
    incrementGrammar(user.id, count);
    const { newlyUnlocked } = checkAchievements(user.id);
    refreshProgress();
    newlyUnlocked.forEach(id => {
      const a = ACHIEVEMENTS.find(x => x.id === id);
      if (a) pushToast({ type: 'achievement', title: '成就解锁!', desc: a.name, icon: a.icon });
    });
  }, [user, refreshProgress, pushToast]);

  const recordSpeaking = useCallback((count: number) => {
    if (!user) return;
    incrementSpeaking(user.id, count);
    const { newlyUnlocked } = checkAchievements(user.id);
    refreshProgress();
    newlyUnlocked.forEach(id => {
      const a = ACHIEVEMENTS.find(x => x.id === id);
      if (a) pushToast({ type: 'achievement', title: '成就解锁!', desc: a.name, icon: a.icon });
    });
  }, [user, refreshProgress, pushToast]);

  return (
    <AppContext.Provider value={{
      user, progress, toasts, dismissToast,
      signup, login, signout, refreshProgress,
      recordSession, finishLesson, recordGrammar, recordSpeaking,
      todayMinutes: user ? getTodayMinutes(progress) : 0,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
