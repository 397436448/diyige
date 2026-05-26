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

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Settings
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Configure your AI providers
        </p>
      </div>

      <div style={{ display: 'grid', gap: '2rem' }}>
        <div className="card">
          <div className="card-header">
            Add API Configuration
          </div>
          <div className="card-body">
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Provider</label>
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
                  placeholder="Enter your API key"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Endpoint (optional)</label>
                <input
                  type="text"
                  className="input"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                  placeholder="Custom endpoint"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving || !apiKey.trim()}
              >
                {saving ? (
                  <><div className="spinner" style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} /> Saving...</>
                ) : (
                  'Save Configuration'
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            Saved Configurations
          </div>
          <div className="card-body">
            {loading && (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div className="spinner" style={{ margin: '0 auto' }} />
              </div>
            )}
            {!loading && configs.length === 0 && (
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
              No configurations saved yet.
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
                      Delete
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
