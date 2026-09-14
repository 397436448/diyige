/* ============================================
   LinguaFlow State & Storage
   LocalStorage persistence + auth + progress
   ============================================ */

import { ACHIEVEMENTS, getLevelFromXp } from '../data/content';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // demo only — plaintext in localStorage
  createdAt: number;
}

export interface UserProgress {
  userId: string;
  xp: number;
  completedLessons: string[];
  learnedWords: string[];
  grammarAnswered: number;
  speakingCompleted: number;
  streak: number;
  lastStudyDate: string | null;
  studyDates: string[];
  minutesStudied: Record<string, number>; // date string -> minutes
  unlockedAchievements: string[];
  dailyGoalMinutes: number;
}

const USERS_KEY = 'linguaflow:users';
const SESSION_KEY = 'linguaflow:session';
const PROGRESS_PREFIX = 'linguaflow:progress:';

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(d1: string, d2: string): number {
  const a = new Date(d1 + 'T00:00:00');
  const b = new Date(d2 + 'T00:00:00');
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

/* ---------- User management ---------- */

export function getUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser(name: string, email: string, password: string): { ok: boolean; error?: string } {
  const users = getUsers();
  if (users.some(u => u.email === email)) {
    return { ok: false, error: '该邮箱已被注册' };
  }
  const user: User = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
    createdAt: Date.now(),
  };
  users.push(user);
  saveUsers(users);
  localStorage.setItem(SESSION_KEY, user.id);
  initProgress(user.id);
  return { ok: true };
}

export function loginUser(email: string, password: string): { ok: boolean; error?: string } {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return { ok: false, error: '邮箱或密码不正确' };
  localStorage.setItem(SESSION_KEY, user.id);
  return { ok: true };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUserId(): string | null {
  return localStorage.getItem(SESSION_KEY);
}

export function getCurrentUser(): User | null {
  const id = getCurrentUserId();
  if (!id) return null;
  return getUsers().find(u => u.id === id) || null;
}

/* ---------- Progress management ---------- */

function initProgress(userId: string) {
  const progress: UserProgress = {
    userId,
    xp: 0,
    completedLessons: [],
    learnedWords: [],
    grammarAnswered: 0,
    speakingCompleted: 0,
    streak: 0,
    lastStudyDate: null,
    studyDates: [],
    minutesStudied: {},
    unlockedAchievements: [],
    dailyGoalMinutes: 15,
  };
  saveProgress(progress);
}

export function getProgress(userId: string): UserProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_PREFIX + userId);
    if (raw) return JSON.parse(raw);
  } catch {}
  // fallback
  const p: UserProgress = {
    userId,
    xp: 0,
    completedLessons: [],
    learnedWords: [],
    grammarAnswered: 0,
    speakingCompleted: 0,
    streak: 0,
    lastStudyDate: null,
    studyDates: [],
    minutesStudied: {},
    unlockedAchievements: [],
    dailyGoalMinutes: 15,
  };
  return p;
}

export function saveProgress(p: UserProgress) {
  localStorage.setItem(PROGRESS_PREFIX + p.userId, JSON.stringify(p));
}

export function recordStudySession(userId: string, minutes: number): UserProgress {
  const p = getProgress(userId);
  const today = todayStr();

  // streak logic
  if (p.lastStudyDate !== today) {
    if (p.lastStudyDate && daysBetween(p.lastStudyDate, today) === 1) {
      p.streak += 1;
    } else if (p.lastStudyDate && daysBetween(p.lastStudyDate, today) > 1) {
      p.streak = 1;
    } else {
      p.streak = Math.max(1, p.streak || 1);
    }
    p.lastStudyDate = today;
    if (!p.studyDates.includes(today)) p.studyDates.push(today);
  }

  p.minutesStudied[today] = (p.minutesStudied[today] || 0) + minutes;
  saveProgress(p);
  return p;
}

export function addXp(userId: string, amount: number): UserProgress {
  const p = getProgress(userId);
  p.xp += amount;
  saveProgress(p);
  return p;
}

export function completeLesson(userId: string, lessonId: string, xp: number): UserProgress {
  const p = getProgress(userId);
  if (!p.completedLessons.includes(lessonId)) {
    p.completedLessons.push(lessonId);
    p.xp += xp;
  }
  saveProgress(p);
  return p;
}

export function addLearnedWords(userId: string, words: string[]): UserProgress {
  const p = getProgress(userId);
  const newWords = words.filter(w => !p.learnedWords.includes(w));
  p.learnedWords.push(...newWords);
  p.xp += newWords.length * 5;
  saveProgress(p);
  return p;
}

export function incrementGrammar(userId: string, count: number): UserProgress {
  const p = getProgress(userId);
  p.grammarAnswered += count;
  p.xp += count * 8;
  saveProgress(p);
  return p;
}

export function incrementSpeaking(userId: string, count: number): UserProgress {
  const p = getProgress(userId);
  p.speakingCompleted += count;
  p.xp += count * 10;
  saveProgress(p);
  return p;
}

export function checkAchievements(userId: string): { newlyUnlocked: string[]; progress: UserProgress } {
  const p = getProgress(userId);
  const { level } = getLevelFromXp(p.xp);
  const newlyUnlocked: string[] = [];

  for (const a of ACHIEVEMENTS) {
    if (p.unlockedAchievements.includes(a.id)) continue;
    let met = false;
    switch (a.type) {
      case 'lesson': met = p.completedLessons.length >= a.threshold; break;
      case 'streak': met = p.streak >= a.threshold; break;
      case 'words': met = p.learnedWords.length >= a.threshold; break;
      case 'grammar': met = p.grammarAnswered >= a.threshold; break;
      case 'speaking': met = p.speakingCompleted >= a.threshold; break;
      case 'level': met = level >= a.threshold + 1; break;
    }
    if (met) {
      p.unlockedAchievements.push(a.id);
      p.xp += a.xpReward;
      newlyUnlocked.push(a.id);
    }
  }

  // Special level unlocks — levels unlock by XP milestones
  saveProgress(p);
  return { newlyUnlocked, progress: p };
}

export function getTodayMinutes(p: UserProgress): number {
  return p.minutesStudied[todayStr()] || 0;
}

export function getWeekMinutes(p: UserProgress): { day: string; minutes: number }[] {
  const days: { day: string; minutes: number }[] = [];
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const now = new Date();
  // start from 6 days ago
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    days.push({ day: dayNames[d.getDay()], minutes: p.minutesStudied[key] || 0 });
  }
  return days;
}

export function getStreakWeek(p: UserProgress): boolean[] {
  const result: boolean[] = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    result.push(p.studyDates.includes(key));
  }
  return result;
}
