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

const DAY_LABELS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

function StreakCalendar({ progress }: { progress: UserProgress }) {
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
      {DAY_LABELS.map((day, i) => (
        <div key={day}>
          <div className="streak-week__label">{day}</div>
          <div className={`streak-week__flame${weekActive[i] ? ' streak-week__flame--active' : ''}`}>
            <Icon.Flame size={weekActive[i] ? 28 : 22} />
          </div>
        </div>
      ))}
      <div className="streak-week__status">当前连续: <strong>{progress.streak} 天</strong></div>
    </div>
  );
}

function LevelProgress({ progress }: { progress: UserProgress }) {
  const { level, current, needed, progress: pct } = getLevelFromXp(progress.xp);
  return (
    <div className="level-progress">
      <div className="level-progress__levels">
        <span className="level-progress__current">等级 {level}</span>
        <span className="level-progress__next">→ 等级 {level + 1}</span>
      </div>
      <ProgressBar progress={pct} color="var(--color-accent)" height={14} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)' }}>
        <span className="level-progress__xp">经验值: {current} / {needed}</span>
        <span className="level-progress__pct">{Math.round(pct * 100)}% 完成</span>
      </div>
    </div>
  );
}

function WeeklyChart({ progress }: { progress: UserProgress }) {
  const data = getWeekMinutes(progress);
  const max = Math.max(60, ...data.map(d => d.minutes));
  const dayMap: Record<string, string> = { SUN: '周日', MON: '周一', TUE: '周二', WED: '周三', THU: '周四', FRI: '周五', SAT: '周六' };
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
          {data.map((d, i) => <span key={i} className="chart__xlabel">{dayMap[d.day] || d.day}</span>)}
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
        <div className="page-header__eyebrow">你的成长</div>
        <h1 className="page-header__title">学习进度</h1>
        <p className="page-header__subtitle">追踪你的学习数据与成长曲线</p>
      </div>

      {/* Summary stats */}
      <div className="achievements__summary" style={{ marginBottom: 32 }}>
        <div className="achievements__stat">
          <div className="achievements__stat-num">{progress.xp}</div>
          <div className="achievements__stat-label">总经验值</div>
        </div>
        <div className="achievements__stat">
          <div className="achievements__stat-num">{progress.streak}</div>
          <div className="achievements__stat-label">连续天数</div>
        </div>
        <div className="achievements__stat">
          <div className="achievements__stat-num">{doneLessons}</div>
          <div className="achievements__stat-label">完成课时</div>
        </div>
        <div className="achievements__stat">
          <div className="achievements__stat-num">{progress.learnedWords.length}</div>
          <div className="achievements__stat-label">已学单词</div>
        </div>
        <div className="achievements__stat">
          <div className="achievements__stat-num">等级 {level}</div>
          <div className="achievements__stat-label">当前等级</div>
        </div>
      </div>

      <div className="progress__grid">
        <Card>
          <SectionHeader title="本周连续打卡" />
          <StreakCalendar progress={progress} />
        </Card>
        <Card>
          <SectionHeader title="等级进度" />
          <LevelProgress progress={progress} />
        </Card>
      </div>

      <Card style={{ marginBottom: 32 }}>
        <SectionHeader title="本周学习时长(分钟)" />
        <WeeklyChart progress={progress} />
      </Card>

      <Card>
        <SectionHeader title="课程完成度" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {COURSES.map(c => {
            const done = c.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
            const pct = c.lessons.length ? done / c.lessons.length : 0;
            return (
              <div key={c.level}>
                <ProgressBar progress={pct} label={`${c.title} ${c.level}`} meta={`${done} / ${c.lessons.length} 课时`} color={c.color} height={12} />
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}
