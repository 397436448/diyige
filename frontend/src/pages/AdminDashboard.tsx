import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

interface User {
  id: number;
  email: string;
  username: string;
  role: 'user' | 'admin';
  createdAt: string;
}

interface PromptStats {
  totalPrompts: number;
  todayPrompts: number;
  activeUsers: number;
}

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<PromptStats>({
    totalPrompts: 0,
    todayPrompts: 0,
    activeUsers: 0
  });
  const [loading, setLoading] = useState(true);

  // 由于我们还没有完整的管理员API，这里我们模拟一下
  useEffect(() => {
    // 模拟数据
    setUsers([
      {
        id: 1,
        email: 'admin@example.com',
        username: 'admin',
        role: 'admin',
        createdAt: new Date().toISOString()
      }
    ]);
    setStats({
      totalPrompts: 128,
      todayPrompts: 15,
      activeUsers: 5
    });
    setLoading(false);
  }, []);

  if (!user || user.role !== 'admin') {
    return (
      <div className="container" style={{ padding: '2rem 1rem', textAlign: 'center' }}>
        <div className="card">
          <h1>⚠️ 无权访问</h1>
          <p style={{ color: 'var(--text-secondary)' }}>只有管理员可以访问此页面</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>🛠️ 管理后台</h1>
        <p style={{ color: 'var(--text-secondary)' }}>系统管理与用户管理</p>
      </div>

      {/* 统计卡片 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        <div className="card">
          <div className="card-body">
            <h3 style={{ marginBottom: '0.5rem' }}>📊 总提示词</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary)' }}>
              {loading ? <div className="spinner" style={{ display: 'inline-block' }} /> : stats.totalPrompts}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 style={{ marginBottom: '0.5rem' }}>🗓️ 今日生成</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#10b981' }}>
              {loading ? <div className="spinner" style={{ display: 'inline-block' }} /> : stats.todayPrompts}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 style={{ marginBottom: '0.5rem' }}>👥 活跃用户</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#6366f1' }}>
              {loading ? <div className="spinner" style={{ display: 'inline-block' }} /> : stats.activeUsers}
            </div>
          </div>
        </div>
      </div>

      {/* 用户管理 */}
      <div className="card">
        <div className="card-header">
          <h3>👥 用户管理</h3>
        </div>
        <div className="card-body">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div className="spinner" />
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>ID</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>用户名</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>邮箱</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>角色</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>注册时间</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '0.75rem' }}>{u.id}</td>
                      <td style={{ padding: '0.75rem' }}>{u.username}</td>
                      <td style={{ padding: '0.75rem' }}>{u.email}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <span className={`badge ${u.role === 'admin' ? 'badge-danger' : 'badge-primary'}`}>
                          {u.role === 'admin' ? '管理员' : '用户'}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* 系统管理提示 */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div className="card-header">
          <h3>🎯 功能提示</h3>
        </div>
        <div className="card-body">
          <p style={{ marginBottom: '0.5rem' }}>
            ✅ <strong>系统状态:</strong> 正常运行
          </p>
          <p style={{ marginBottom: '0.5rem' }}>
            📍 <strong>后台API:</strong> 本地运行在 http://localhost:3001
          </p>
          <p style={{ marginBottom: '0.5rem' }}>
            📍 <strong>前端:</strong> 本地运行在 http://localhost:5173
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '1rem' }}>
            💡 提示：如需添加完整的用户管理功能（如删除用户、设置用户等，可继续开发！
          </p>
        </div>
      </div>
    </div>
  );
};
