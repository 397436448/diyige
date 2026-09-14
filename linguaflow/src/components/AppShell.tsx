/* ============================================
   App Shell — sidebar layout + toasts
   ============================================ */
import type { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Icon } from './Icons';
import { useApp } from '../context/AppContext';
import { getLevelFromXp } from '../data/content';

const NAV = [
  { to: '/dashboard', label: '首页', icon: 'Home' as const },
  { to: '/courses', label: '课程', icon: 'Book' as const },
  { to: '/progress', label: '进度', icon: 'Chart' as const },
  { to: '/achievements', label: '成就', icon: 'Trophy' as const },
];

function Toasts() {
  const { toasts, dismissToast } = useApp();
  if (!toasts.length) return null;
  return (
    <div className="toast-container">
      {toasts.map(t => {
        const IconComp = (Icon as any)[t.icon || 'Sparkles'] || Icon.Sparkles;
        return (
          <div key={t.id} className={`toast toast--${t.type}`} onClick={() => dismissToast(t.id)} role="alert">
            <IconComp size={22} className="toast__icon" />
            <div className="toast__body">
              <div className="toast__title">{t.title}</div>
              <div className="toast__desc">{t.desc}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { user, progress, signout } = useApp();
  const navigate = useNavigate();
  const { level } = getLevelFromXp(progress.xp);

  if (!user) return <>{children}</>;

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar__brand">
          <div className="sidebar__brand-icon"><Icon.Graduation size={20} /></div>
          <span className="sidebar__brand-name">LinguaFlow</span>
        </div>
        <nav className="sidebar__nav">
          {NAV.map(item => {
            const IconComp = Icon[item.icon];
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `sidebar__nav-item${isActive ? ' sidebar__nav-item--active' : ''}`}
              >
                <IconComp size={20} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="sidebar__footer">
          <div className="sidebar__user" onClick={() => navigate('/achievements')}>
            <div className="sidebar__avatar">{user.name.slice(0, 1).toUpperCase()}</div>
            <div className="sidebar__user-info">
              <div className="sidebar__user-name">{user.name}</div>
              <div className="sidebar__user-level">等级 {level}</div>
            </div>
            <button className="sidebar__logout" onClick={(e) => { e.stopPropagation(); signout(); navigate('/'); }} aria-label="退出登录" title="退出登录">
              <Icon.LogOut size={18} style={{ color: 'var(--color-text-muted)' }} />
            </button>
          </div>
        </div>
      </aside>
      <main className="main">
        <div className="main__content">{children}</div>
      </main>
      <Toasts />
    </div>
  );
}
