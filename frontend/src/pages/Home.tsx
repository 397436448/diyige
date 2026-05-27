import React, { useState } from 'react';
import { api } from '../services/api';

export const HomePage: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    type: 'TEXT_TO_IMAGE' | 'IMAGE_TO_VIDEO';
    prompt: string;
  } | null>(null);
  const [refinedPrompt, setRefinedPrompt] = useState<string | null>(null);
  const [refining, setRefining] = useState(false);
  const [needsClarification, setNeedsClarification] = useState(false);
  const [clarification, setClarification] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResult(null);
    setRefinedPrompt(null);
    setNeedsClarification(false);
    setCopied(false);

    try {
      const data = await api.prompt.generate(input);
      
      if (data.needsClarification) {
        setNeedsClarification(true);
        setClarification(data.clarification);
      } else {
        setResult({
          type: data.type,
          prompt: data.prompt,
        });
      }
    } catch (error) {
      console.error('生成失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefine = async () => {
    if (!result) return;

    setRefining(true);
    try {
      const data = await api.prompt.refine(result.prompt);
      setRefinedPrompt(data.refined);
    } catch (error) {
      console.error('润色失败:', error);
    } finally {
      setRefining(false);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('复制失败:', error);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          AI 提示词生成器
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          描述你想要创建的内容，我们将为你生成专业的提示词
        </p>
      </div>

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="card-body">
          <form onSubmit={handleGenerate}>
            <div className="form-group">
              <label className="form-label">描述你的想法</label>
              <textarea
                className="input textarea"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="例如：海边日落，海鸥飞过..."
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={loading || !input.trim()}
            >
              {loading ? (
                <><div className="spinner" style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} /> 生成中...</>
              ) : (
                '生成提示词'
              )}
            </button>
          </form>
        </div>
      </div>

      {needsClarification && (
        <div className="card" style={{ maxWidth: '800px', margin: '1.5rem auto 0' }}>
          <div className="card-body">
            <div className="alert" style={{ backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fcd34d' }}>
              {clarification}
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className="card" style={{ maxWidth: '800px', margin: '1.5rem auto 0' }}>
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>
                生成的提示词{' '}
                <span className={`badge ${result.type === 'TEXT_TO_IMAGE' ? 'badge-primary' : 'badge-success'}`}>
                  {result.type === 'TEXT_TO_IMAGE' ? '文生图' : '图生视频'}
                </span>
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleRefine}
                  disabled={refining}
                >
                  {refining ? (
                    <><div className="spinner" style={{ width: '0.75rem', height: '0.75rem', marginRight: '0.25rem' }} /> 润色中...</>
                  ) : (
                    '✨ 润色'
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => handleCopy(result.prompt)}
                >
                  {copied ? '✓ 已复制' : '📋 复制'}
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <pre style={{
              margin: 0,
              padding: '1rem',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}>
              {result.prompt}
            </pre>
          </div>

          {refinedPrompt && (
            <>
              <div className="card-header">
                ✨ 润色后的版本
              </div>
              <div className="card-body">
                <pre style={{
                  margin: 0,
                  padding: '1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  {refinedPrompt}
                </pre>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  style={{ marginTop: '1rem' }}
                  onClick={() => handleCopy(refinedPrompt)}
                >
                  📋 复制润色后的
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};