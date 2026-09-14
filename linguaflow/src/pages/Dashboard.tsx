/* ============================================
   Dashboard — main hub
   Greeting, learning path, levels, daily goal, quick practice
   ============================================ */
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icons';
import { Card, ProgressRing, ProgressBar } from '../components/ui';
import { useApp } from '../context/AppContext';
import { COURSES, getLevelFromXp, getAllLessons } from '../data/content';

const QUICK = [
  { key: 'vocabulary', label: '词汇', icon: 'Doc', color: '#4a6cf7' },
  { key: 'spelling', label: '拼写', icon: 'Pencil', color: '#22c55e' },
  { key: 'grammar', label: '语法', icon: 'Brain', color: '#f5a623' },
  { key: 'speaking', label: '口语', icon: 'Mic', color: '#a855f7' },
  { key: 'listening', label: '听力', icon: 'Headphones', color: '#ef4444' },
] as const;

export function Dashboard() {
  const { user, progress, todayMinutes } = useApp();
  const navigate = useNavigate();

  if (!user) return null;

  const { level } = getLevelFromXp(progress.xp);
  const allLessons = getAllLessons();

  // Build personalized path: next 3 lessons to do
  const nextLessons = allLessons
    .filter(l => !progress.completedLessons.includes(l.id))
    .slice(0, 3);
  const lastDone = allLessons.filter(l => progress.completedLessons.includes(l.id)).slice(-1)[0];

  // Course progress
  const courseProgress = COURSES.map(c => {
    const total = c.lessons.length;
    const done = c.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
    return { ...c, done, total, pct: total ? done / total : 0 };
  });

  // Daily goal
  const goalPct = progress.dailyGoalMinutes ? todayMinutes / progress.dailyGoalMinutes : 0;

  const quickClick = (type: string) => {
    // Find next lesson of this type
    const lesson = allLessons.find(l => l.type === type && !progress.completedLessons.includes(l.id))
      || allLessons.find(l => l.type === type);
    if (lesson) navigate(`/learn/${lesson.id}`);
  };

  const pathNodes = [
    { label: lastDone?.title || '开始', state: lastDone ? 'done' : 'current' as const, icon: 'Check' as const },
    ...nextLessons.slice(0, 2).map((l, i) => ({
      label: l.title,
      state: i === 0 ? 'current' : 'todo' as const,
      icon: l.type === 'vocabulary' ? 'Doc' : l.type === 'grammar' ? 'Brain' : l.type === 'spelling' ? 'Pencil' : l.type === 'speaking' ? 'Mic' : 'Headphones' as const,
    })),
  ];
  if (pathNodes.length < 3) pathNodes.push({ label: '更多', state: 'todo' as const, icon: 'Sparkles' as const });

  return (
    <>
      <div className="dash__header">
        <div>
          <h1 className="dash__greeting">你好,{user.name}</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 4 }}>等级 {level} · {progress.xp} 经验值 · 已学 {progress.learnedWords.length} 个单词</p>
        </div>
        <div className="dash__streak">
          <Icon.Flame size={20} />
          连续 {progress.streak} 天
        </div>
      </div>

      <div className="dash__grid">
        {/* Personalized Learning Path */}
        <Card>
          <div className="dash__card-title">你的个性化学习路径</div>
          <div className="path">
            <svg className="path__svg" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M 15 50 Q 35 20, 50 50 T 85 50" fill="none" stroke="var(--color-border)" strokeWidth="1.5" strokeDasharray="3 4" strokeLinecap="round" />
            </svg>
            <div className="path__nodes">
              {pathNodes.map((node, i) => {
                const IconComp = (Icon as any)[node.icon] || Icon.Sparkles;
                return (
                  <div key={i} className={`path__node path__node--${node.state}`} onClick={() => node.state !== 'todo' && nextLessons[0] && navigate(`/learn/${nextLessons[0].id}`)} style={{ cursor: node.state !== 'todo' ? 'pointer' : 'default' }}>
                    <div className="path__node-circle"><IconComp size={24} /></div>
                    <span className="path__node-label">{node.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Course Levels */}
        <Card>
          <div className="dash__card-title">你的课程等级</div>
          <div className="levels">
            {courseProgress.map(c => (
              <div key={c.level} className="level-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/courses')}>
                <div className="level-card__ring">
                  <ProgressRing progress={c.pct} size={80} strokeWidth={6} color={c.color} label={`${Math.round(c.pct * 100)}%`} />
                </div>
                <div className="level-card__name">{c.title}</div>
                <div className="level-card__code">{c.level}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Daily Goal */}
        <Card>
          <div className="dash__card-title">每日目标</div>
          <ProgressBar
            progress={goalPct}
            label="完成度"
            meta={`${todayMinutes.toFixed(0)} / ${progress.dailyGoalMinutes} 分钟 · 今日目标`}
            color="var(--color-primary)"
            height={20}
          />
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12, color: 'var(--color-text-secondary)', fontSize: 'var(--text-caption)' }}>
            <Icon.Target size={18} style={{ color: 'var(--color-accent)' }} />
            {goalPct >= 1 ? '目标已达成!继续保持连胜!' : `还差 ${Math.ceil(progress.dailyGoalMinutes - todayMinutes)} 分钟达成今日目标`}
          </div>
        </Card>

        {/* Quick Practice */}
        <Card>
          <div className="dash__card-title">快速练习</div>
          <div className="quick">
            {QUICK.map(q => {
              const IconComp = (Icon as any)[q.icon] || Icon.Sparkles;
              return (
                <div key={q.key} className="quick__item" onClick={() => quickClick(q.key)}>
                  <div className="quick__icon" style={{ color: q.color }}><IconComp size={26} /></div>
                  <span className="quick__label">{q.label}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Recommended next lesson CTA */}
      {nextLessons[0] && (
        <Card style={{ display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer' }} onClick={() => navigate(`/learn/${nextLessons[0].id}`)}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--color-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon.Route size={26} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 'var(--text-section)', color: 'var(--color-text)' }}>继续学习</div>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-caption)' }}>{nextLessons[0].title} · {nextLessons[0].courseTitle} {nextLessons[0].level}</div>
          </div>
          <Icon.ArrowRight size={24} style={{ color: 'var(--color-accent)' }} />
        </Card>
      )}
    </>
  );
}
