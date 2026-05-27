import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      backgroundColor: 'var(--bg-primary)',
      borderBottom: '1px solid var(--border)',
      padding: '0 1rem'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '60px'
      }}>
        <Link to="/" style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          textDecoration: 'none'
        }}>
          ✨ 提示词生成器
        </Link>

        {user && (
          <div className="nav" style={{ gap: '1.5rem' }}>
            <Link to="/" className="nav-link">
              生成器
            </Link>
            <Link to="/history" className="nav-link">
              历史记录
            </Link>
            <Link to="/settings" className="nav-link">
              设置
            </Link>
            {user.role === 'ADMIN' && (
              <Link to="/admin" className="nav-link">
                🛠️ 管理后台
              </Link>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {user.username}
              </span>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleLogout}
              >
                退出登录
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};