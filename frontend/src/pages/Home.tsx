import React, { useState } from 'react';
import { api } from '../services/api';

// 预设模板
const quickPresets = [
  { label: '🌅 风景摄影', prompt: '壮丽的自然风光，山川湖泊，日落，专业风光摄影，高画质' },
  { label: '👤 人像艺术', prompt: '精美人物肖像，柔和灯光，专业人像摄影，高质量细节' },
  { label: '🏘️ 赛博朋克城市', prompt: '未来都市夜景，霓虹灯，赛博朋克风格，科幻，高细节' },
  { label: '🎨 动漫风格', prompt: '精美动漫插画，日系风格，色彩鲜艳，高画质' },
];

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

      {/* 快速预设 */}
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto 1.5rem' }}>
        <div className="card-body">
          <h3 style={{ marginBottom: '0.75rem' }}>💡 快速开始</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.875rem' }}>
            选择一个预设模板，或输入你自己的创意：
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {quickPresets.map(p => (
              <button
                key={p.prompt}
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => setInput(p.prompt)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
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
                placeholder="例如：海边日落，金色沙滩，海浪拍打，海鸥飞翔，晚霞，宁静的气氛"
              />
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                💡 提示：你可以包含主题、风格、颜色、光线、构图等元素的描述
              </p>
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
                '✨ 生成提示词'
              )}
            </button>
          </form>
        </div>
      </div>

      {needsClarification && (
        <div className="card" style={{ maxWidth: '800px', margin: '1.5rem auto 0' }}>
          <div className="card-body">
            <div className="alert alert-error">
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
                    '✨ 智能润色'
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => handleCopy(result.prompt)}
                >
                  {copied ? '✅ 已复制' : '📋 复制'}
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
                ✨ 智能润色后的版本
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
                  📋 复制润色后的版本
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* 功能介绍卡片 */}
      <div className="card" style={{ maxWidth: '800px', margin: '2rem auto 0' }}>
        <div className="card-header">
          <h3>🎯 功能介绍</h3>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <h4 style={{ marginBottom: '0.25rem' }}>🖼️ 文生图提示词</h4>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.875rem' }}>
                自动分析你的描述，生成专业的文生图提示词，包含风格、光线、构图等要素
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '0.25rem' }}>🎬 图生视频提示词</h4>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.875rem' }}>
                为视频生成场景提供动态提示词，包含摄像机运动、转换风格等要素
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '0.25rem' }}>✨ 智能润色</h4>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.875rem' }}>
                一键增强你的提示词，添加更多细节和专业词汇
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
