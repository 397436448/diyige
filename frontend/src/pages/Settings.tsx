import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

interface Config {
  id: number;
  provider: string;
  endpoint?: string;
  createdAt: string;
  hasApiKey: boolean;
}

export const SettingsPage: React.FC = () => {
  const [configs, setConfigs] = useState<Config[]>([]);
  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState('OpenAI');
  const [apiKey, setApiKey] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [saving, setSaving] = useState(false);
  
  // 密码修改状态
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadConfigs = async () => {
    try {
      const data = await api.config.get();
      setConfigs(data.configs);
    } catch (error) {
      console.error('Failed to load configs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConfigs();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setSaving(true);
    try {
      await api.config.save(provider, apiKey, endpoint || undefined);
      setApiKey('');
      setEndpoint('');
      await loadConfigs();
    } catch (error) {
      console.error('Failed to save config:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.config.delete(id);
      await loadConfigs();
    } catch (error) {
      console.error('Failed to delete config:', error);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: '两次输入的密码不一致' });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: '新密码至少需要 6 个字符' });
      return;
    }

    setChangingPassword(true);
    setPasswordMessage(null);

    try {
      await api.auth.changePassword(currentPassword, newPassword);
      setPasswordMessage({ type: 'success', text: '密码修改成功！' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      setPasswordMessage({ type: 'error', text: error.message || '密码修改失败' });
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          设置
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          管理你的账户和 API 设置
        </p>
      </div>

      <div style={{ display: 'grid', gap: '2rem', maxWidth: '800px' }}>
        {/* 密码修改区域 */}
        <div className="card">
          <div className="card-header">
            修改密码
          </div>
          <div className="card-body">
            <form onSubmit={handleChangePassword}>
              {passwordMessage && (
                <div className={`alert ${passwordMessage.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                  {passwordMessage.text}
                </div>
              )}
              
              <div className="form-group">
                <label className="form-label">当前密码</label>
                <input
                  type="password"
                  className="input"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="请输入当前密码"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">新密码</label>
                <input
                  type="password"
                  className="input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="请输入新密码（至少 6 个字符）"
                  required
                  minLength={6}
                />
              </div>

              <div className="form-group">
                <label className="form-label">确认新密码</label>
                <input
                  type="password"
                  className="input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="请再次输入新密码"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={changingPassword}
              >
                {changingPassword ? (
                  <><div className="spinner" style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} /> 修改中...</>
                ) : (
                  '修改密码'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* API 配置区域 */}
        <div className="card">
          <div className="card-header">
            添加 API 配置
          </div>
          <div className="card-body">
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">服务商</label>
                <select
                  className="input"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                >
                  <option value="OpenAI">OpenAI</option>
                  <option value="StableDiffusion">Stable Diffusion</option>
                  <option value="Midjourney">Midjourney</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">API Key</label>
                <input
                  type="password"
                  className="input"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="请输入你的 API Key"
                />
              </div>

              <div className="form-group">
                <label className="form-label">接口地址（可选）</label>
                <input
                  type="text"
                  className="input"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                  placeholder="自定义接口地址"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving || !apiKey.trim()}
              >
                {saving ? (
                  <><div className="spinner" style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} /> 保存中...</>
                ) : (
                  '保存配置'
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            已保存的配置
          </div>
          <div className="card-body">
            {loading && (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div className="spinner" style={{ margin: '0 auto' }} />
              </div>
            )}
            {!loading && configs.length === 0 && (
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
                暂无配置
              </p>
            )}
            {!loading && configs.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {configs.map(config => (
                  <div
                    key={config.id}
                    style={{
                      padding: '1rem',
                      border: '1px solid var(--border)',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600 }}>{config.provider}</div>
                      {config.endpoint && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          {config.endpoint}
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(config.id)}
                    >
                      删除
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};