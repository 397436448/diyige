/* ============================================
   Courses Page — graded course system
   ============================================ */
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icons';
import { Card, ProgressBar } from '../components/ui';
import { useApp } from '../context/AppContext';
import { COURSES } from '../data/content';

const TYPE_ICONS: Record<string, string> = {
  vocabulary: 'Doc', spelling: 'Pencil', grammar: 'Brain', speaking: 'Mic', listening: 'Headphones',
};

export function Courses() {
  const { progress } = useApp();
  const navigate = useNavigate();

  return (
    <>
      <div className="page-header">
        <div className="page-header__eyebrow">分级课程体系</div>
        <h1 className="page-header__title">课程等级</h1>
        <p className="page-header__subtitle">从入门到精通,五级课程体系循序渐进</p>
      </div>

      <div className="course-list">
        {COURSES.map(course => {
          const done = course.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
          const pct = course.lessons.length ? done / course.lessons.length : 0;
          return (
            <Card key={course.level} padded={false}>
              <div style={{ display: 'flex', gap: 0, overflow: 'hidden', borderRadius: 'inherit' }}>
                <div className="course-card__accent" style={{ background: course.color }} />
                <div className="course-card__body" style={{ padding: 'var(--space-6)', flex: 1 }}>
                  <div className="course-card__header">
                    <div>
                      <h2 className="course-card__title">{course.title} · {course.subtitle}</h2>
                      <p className="course-card__desc">{course.description}</p>
                    </div>
                    <span className="course-card__code" style={{ background: course.color + '20', color: course.color }}>{course.cefr}</span>
                  </div>
                  <div style={{ maxWidth: 400, marginBottom: 16 }}>
                    <ProgressBar progress={pct} label={`${course.level}`} meta={`${done} / ${course.lessons.length} 课时`} color={course.color} height={10} />
                  </div>
                  <div className="lesson-list">
                    {course.lessons.map(lesson => {
                      const isDone = progress.completedLessons.includes(lesson.id);
                      const IconComp = (Icon as any)[TYPE_ICONS[lesson.type]] || Icon.Doc;
                      return (
                        <div key={lesson.id} className="lesson-row" onClick={() => navigate(`/learn/${lesson.id}`)}>
                          <div className={`lesson-row__icon${isDone ? ' lesson-row__icon--done' : ' lesson-row__icon--todo'}`}>
                            {isDone ? <Icon.Check size={18} /> : <IconComp size={18} />}
                          </div>
                          <div className="lesson-row__body">
                            <div className="lesson-row__title">{lesson.title}</div>
                            <div className="lesson-row__desc">{lesson.description}</div>
                          </div>
                          <div className="lesson-row__xp">+{lesson.xp} 经验</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}
