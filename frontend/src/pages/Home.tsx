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
      console.error('Generation failed:', error);
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
      console.error('Refine failed:', error);
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
      console.error('Copy failed:', error);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          AI Prompt Generator
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Describe what you want to create, and we'll generate a professional prompt
        </p>
      </div>

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="card-body">
          <form onSubmit={handleGenerate}>
            <div className="form-group">
              <label className="form-label">Describe your idea</label>
              <textarea
                className="input textarea"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., A sunset over the ocean with seagulls flying..."
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={loading || !input.trim()}
            >
              {loading ? (
                <><div className="spinner" style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} /> Generating...</>
              ) : (
                'Generate Prompt'
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
                Generated Prompt{' '}
                <span className={`badge ${result.type === 'TEXT_TO_IMAGE' ? 'badge-primary' : 'badge-success'}`}>
                  {result.type === 'TEXT_TO_IMAGE' ? 'Text to Image' : 'Image to Video'}
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
                    <><div className="spinner" style={{ width: '0.75rem', height: '0.75rem', marginRight: '0.25rem' }} /> Refining...</>
                  ) : (
                    '✨ Refine'
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => handleCopy(result.prompt)}
                >
                  {copied ? '✓ Copied!' : '📋 Copy'}
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
                ✨ Refined Version
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
                  📋 Copy Refined
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
