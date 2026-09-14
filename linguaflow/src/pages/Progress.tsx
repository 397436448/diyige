/* ============================================
   Progress Page — tracking & visualization
   Streak calendar, level progress, weekly chart
   ============================================ */
import { Icon } from '../components/Icons';
import { Card, ProgressBar, SectionHeader } from '../components/ui';
import { useApp } from '../context/AppContext';
import { COURSES, getLevelFromXp } from '../data/content';
import { getWeekMinutes } from '../lib/storage';
import type { UserProgress } from '../lib/storage';

function StreakCalendar({ progress }: { progress: UserProgress }) {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const now = new Date();
  const weekActive: boolean[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().slice(0, 10);
    weekActive.push(progress.studyDates.includes(key));
  }

  return (
    <div className="streak-week">
      {days.map((day, i) => (
        <div key={day}>
          <div className="streak-week__label">{day}</div>
          <div className={`streak-week__flame${weekActive[i] ? ' streak-week__flame--active' : ''}`}>
            <Icon.Flame size={weekActive[i] ? 28 : 22} />
          </div>
        </div>
      ))}
      <div className="streak-week__status">Current Streak: <strong>{progress.streak} Days</strong></div>
    </div>
  );
}

function LevelProgress({ progress }: { progress: UserProgress }) {
  const { level, current, needed, progress: pct } = getLevelFromXp(progress.xp);
  return (
    <div className="level-progress">
      <div className="level-progress__levels">
        <span className="level-progress__current">Level {level}</span>
        <span className="level-progress__next">→ Level {level + 1}</span>
      </div>
      <ProgressBar progress={pct} color="var(--color-accent)" height={14} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)' }}>
        <span className="level-progress__xp">XP: {current} / {needed}</span>
        <span className="level-progress__pct">{Math.round(pct * 100)}% Complete</span>
      </div>
    </div>
  );
}

function WeeklyChart({ progress }: { progress: UserProgress }) {
  const data = getWeekMinutes(progress);
  const max = Math.max(60, ...data.map(d => d.minutes));
  return (
    <div className="chart" style={{ display: 'flex', gap: 12 }}>
      <div className="chart__yaxis">
        {[max, Math.round(max * 0.66), Math.round(max * 0.33), 0].map(v => (
          <span key={v} className="chart__yval">{v}</span>
        ))}
      </div>
      <div style={{ flex: 1 }}>
        <div className="chart__body">
          {data.map((d, i) => {
            const h = d.minutes > 0 ? (d.minutes / max) * 100 : 2;
            return (
              <div key={i} className="chart__col">
                <div className={`chart__bar${d.minutes === 0 ? ' chart__bar--zero' : ''}`} style={{ height: `${h}%` }}>
                  {d.minutes > 0 && <span className="chart__value">{d.minutes}</span>}
                </div>
              </div>
            );
          })}
        </div>
        <div className="chart__xaxis">
          {data.map((d, i) => <span key={i} className="chart__xlabel">{d.day}</span>)}
        </div>
      </div>
    </div>
  );
}

export function Progress() {
  const { progress, user } = useApp();
  if (!user) return null;

  const { level } = getLevelFromXp(progress.xp);
  const doneLessons = progress.completedLessons.length;

  return (
    <>
      <div className="page-header">
        <div className="page-header__eyebrow">Your Growth</div>
        <h1 className="page-header__title">Learning Progress</h1>
        <p className="page-header__subtitle">追踪你的学习数据与成长曲线</p>
      </div>

      {/* Summary stats */}
      <div className="achievements__summary" style={{ marginBottom: 32 }}>
        <div className="achievements__stat">
          <div className="achievements__stat-num">{progress.xp}</div>
          <div className="achievements__stat-label">Total XP</div>
        </div>
        <div className="achievements__stat">
          <div className="achievements__stat-num">{progress.streak}</div>
          <div className="achievements__stat-label">Day Streak</div>
        </div>
        <div className="achievements__stat">
          <div className="achievements__stat-num">{doneLessons}</div>
          <div className="achievements__stat-label">Lessons Done</div>
        </div>
        <div className="achievements__stat">
          <div className="achievements__stat-num">{progress.learnedWords.length}</div>
          <div className="achievements__stat-label">Words Learned</div>
        </div>
        <div className="achievements__stat">
          <div className="achievements__stat-num">Level {level}</div>
          <div className="achievements__stat-label">Current Level</div>
        </div>
      </div>

      <div className="progress__grid">
        <Card>
          <SectionHeader title="Weekly Streak" />
          <StreakCalendar progress={progress} />
        </Card>
        <Card>
          <SectionHeader title="Level Progress" />
          <LevelProgress progress={progress} />
        </Card>
      </div>

      <Card style={{ marginBottom: 32 }}>
        <SectionHeader title="Weekly Minutes Studied" />
        <WeeklyChart progress={progress} />
      </Card>

      <Card>
        <SectionHeader title="Course Completion" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {COURSES.map(c => {
            const done = c.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
            const pct = c.lessons.length ? done / c.lessons.length : 0;
            return (
              <div key={c.level}>
                <ProgressBar progress={pct} label={`${c.title} ${c.level}`} meta={`${done} / ${c.lessons.length} lessons`} color={c.color} height={12} />
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}
