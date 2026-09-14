/* ============================================
   Achievements Page — badges, streaks, levels, XP
   ============================================ */
import { Icon } from '../components/Icons';
import { Card, AchievementBadge, SectionHeader, ProgressBar } from '../components/ui';
import { useApp } from '../context/AppContext';
import { ACHIEVEMENTS, getLevelFromXp } from '../data/content';

const DAY_ICONS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export function Achievements() {
  const { progress, user } = useApp();
  if (!user) return null;

  const { level, current, needed, progress: pct } = getLevelFromXp(progress.xp);
  const earned = progress.unlockedAchievements.length;
  const total = ACHIEVEMENTS.length;

  // Rank: rough position based on XP
  const rank = Math.max(1, 2500 - Math.floor(progress.xp / 2));

  // Streak week
  const now = new Date();
  const weekActive: boolean[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().slice(0, 10);
    weekActive.push(progress.studyDates.includes(key));
  }

  return (
    <>
      <div className="page-header">
        <div className="page-header__eyebrow">Rewards & Milestones</div>
        <h1 className="page-header__title">Achievements</h1>
        <p className="page-header__subtitle">解锁徽章,保持连续打卡,挑战更高等级</p>
      </div>

      {/* Summary */}
      <div className="achievements__summary">
        <div className="achievements__stat">
          <div className="achievements__stat-num">{earned} / {total}</div>
          <div className="achievements__stat-label">Badges Earned</div>
        </div>
        <div className="achievements__stat">
          <div className="achievements__stat-num">{progress.streak}</div>
          <div className="achievements__stat-label">Day Streak</div>
        </div>
        <div className="achievements__stat">
          <div className="achievements__stat-num">#{rank}</div>
          <div className="achievements__stat-label">Your Rank</div>
        </div>
        <div className="achievements__stat">
          <div className="achievements__stat-num">{progress.xp}</div>
          <div className="achievements__stat-label">Total XP</div>
        </div>
      </div>

      <div className="progress__grid">
        {/* Weekly Streak */}
        <Card>
          <SectionHeader title="Weekly Streak" />
          <div className="streak-week">
            {DAY_ICONS.map((day, i) => (
              <div key={day}>
                <div className="streak-week__label">{day}</div>
                <div className={`streak-week__flame${weekActive[i] ? ' streak-week__flame--active' : ''}`}>
                  <Icon.Flame size={weekActive[i] ? 28 : 22} />
                </div>
              </div>
            ))}
            <div className="streak-week__status">Current Streak: <strong>{progress.streak} Days</strong></div>
          </div>
        </Card>

        {/* Level Progress */}
        <Card>
          <SectionHeader title="Level Progress" />
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
        </Card>
      </div>

      {/* Achievements grid */}
      <Card style={{ marginBottom: 32 }}>
        <SectionHeader title="All Achievements" />
        <div className="achievements__grid">
          {ACHIEVEMENTS.map(a => {
            const isEarned = progress.unlockedAchievements.includes(a.id);
            const isSpecial = a.id === 'words-100' || a.id === 'words-500' || a.id === 'streak-30';
            return (
              <AchievementBadge
                key={a.id}
                icon={a.icon}
                label={a.name}
                earned={isEarned}
                special={isEarned && isSpecial}
              />
            );
          })}
        </div>
      </Card>

      {/* Achievement details */}
      <Card>
        <SectionHeader title="Achievement Details" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {ACHIEVEMENTS.map(a => {
            const isEarned = progress.unlockedAchievements.includes(a.id);
            let progressVal = 0;
            switch (a.type) {
              case 'lesson': progressVal = Math.min(1, progress.completedLessons.length / a.threshold); break;
              case 'streak': progressVal = Math.min(1, progress.streak / a.threshold); break;
              case 'words': progressVal = Math.min(1, progress.learnedWords.length / a.threshold); break;
              case 'grammar': progressVal = Math.min(1, progress.grammarAnswered / a.threshold); break;
              case 'speaking': progressVal = Math.min(1, progress.speakingCompleted / a.threshold); break;
              case 'level': progressVal = isEarned ? 1 : 0; break;
            }
            return (
              <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', border: `3px solid ${isEarned ? 'var(--color-accent-blue)' : 'var(--color-border)'}`, background: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isEarned ? 'var(--color-accent-blue)' : 'var(--color-text-muted)', flexShrink: 0 }}>
                  {(() => { const Ic = (Icon as any)[a.icon] || Icon.Sparkles; return <Ic size={20} />; })()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 'var(--text-body)', color: isEarned ? 'var(--color-text)' : 'var(--color-text-secondary)' }}>{a.name}</div>
                  <div style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)' }}>{a.description}</div>
                  {!isEarned && a.type !== 'level' && (
                    <div style={{ marginTop: 6, maxWidth: 200 }}>
                      <ProgressBar progress={progressVal} color="var(--color-accent-blue)" height={6} />
                    </div>
                  )}
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 'var(--text-caption)', fontWeight: 700, color: 'var(--color-accent)' }}>+{a.xpReward} XP</div>
                  {isEarned && <div style={{ fontSize: 'var(--text-micro)', color: 'var(--color-success)', fontWeight: 600 }}><Icon.Check size={12} /> EARNED</div>}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}
