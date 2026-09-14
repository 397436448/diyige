/* ============================================
   Auth Page — Login & Register
   ============================================ */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icons';
import { Button } from '../components/ui';
import { useApp } from '../context/AppContext';

const FEATURES = [
  '分级课程体系 — 从 A1 到 C1 循序渐进',
  '互动式学习 — 单词记忆、拼写、语法、口语跟读、听力训练',
  '学习进度追踪 — 实时数据可视化与成长曲线',
  '成就激励系统 — 徽章、连续打卡、等级与 XP',
];

export function AuthPage() {
  const { login, signup } = useApp();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (mode === 'register') {
      if (!name.trim() || !email.trim() || password.length < 4) {
        setError('请填写姓名、邮箱,密码至少 4 位');
        return;
      }
      const res = signup(name.trim(), email.trim(), password);
      if (!res.ok) { setError(res.error || '注册失败'); return; }
    } else {
      if (!email.trim() || !password) {
        setError('请输入邮箱和密码');
        return;
      }
      const res = login(email.trim(), password);
      if (!res.ok) { setError(res.error || '登录失败'); return; }
    }
    navigate('/dashboard');
  };

  const quickDemo = () => {
    // Auto-fill demo credentials
    setEmail('demo@linguaflow.com');
    setPassword('demo1234');
    setName('Alex');
    setMode('register');
    setError('');
  };

  return (
    <div className="auth">
      <div className="auth__card">
        <div className="auth__brand">
          <div className="auth__brand-icon"><Icon.Graduation size={26} /></div>
          <span className="auth__brand-name">LinguaFlow</span>
        </div>
        <h1 className="auth__title">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
        <p className="auth__subtitle">{mode === 'login' ? '继续你的英语学习之旅' : '开启沉浸式英语学习体验'}</p>

        {error && <div className="auth__error">{error}</div>}

        <form onSubmit={submit}>
          {mode === 'register' && (
            <div className="field">
              <label className="field__label">姓名</label>
              <input
                className="field__input"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
          )}
          <div className="field">
            <label className="field__label">邮箱</label>
            <input
              className="field__input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="field">
            <label className="field__label">密码</label>
            <input
              className="field__input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>
          <Button type="submit" variant="primary" size="lg" full>
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="auth__toggle">
          {mode === 'login' ? '还没有账号?' : '已有账号?'}{' '}
          <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}>
            {mode === 'login' ? '立即注册' : '去登录'}
          </button>
        </div>

        <div className="auth__features">
          {FEATURES.map(f => (
            <div key={f} className="auth__feature">
              <Icon.Check size={16} />
              {f}
            </div>
          ))}
          <button onClick={quickDemo} style={{ marginTop: 12, color: 'var(--color-accent)', fontSize: 'var(--text-caption)', fontWeight: 600 }}>
            填充演示账号快速体验 →
          </button>
        </div>
      </div>
    </div>
  );
}
