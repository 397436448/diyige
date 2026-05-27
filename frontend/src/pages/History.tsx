import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

interface HistoryItem {
  id: number;
  rawInput: string;
  result: string;
  type: 'TEXT_TO_IMAGE' | 'IMAGE_TO_VIDEO';
  isFavorite: boolean;
  createdAt: string;
}

export const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadHistory = async () => {
    try {
      const data = await api.history.get(page);
      if (page === 1) {
        setHistory(data.history);
      } else {
        setHistory(prev => [...prev, ...data.history]);
      }
      setHasMore(page < data.pagination.totalPages);
    } catch (error) {
      console.error('加载历史失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, [page]);

  const handleDelete = async (id: number) => {
    try {
      await api.history.delete(id);
      setHistory(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('删除失败:', error);
    }
  };

  const handleToggleFavorite = async (id: number) => {
    try {
      const data = await api.history.toggleFavorite(id);
      setHistory(prev =>
        prev.map(item =>
          item.id === id ? { ...item, isFavorite: data.isFavorite } : item
        )
      );
    } catch (error) {
      console.error('收藏失败:', error);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('复制失败:', error);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          历史记录
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          你之前生成的提示词
        </p>
      </div>

      {loading && page === 1 && (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div className="spinner" style={{ margin: '0 auto' }} />
        </div>
      )}

      {!loading && history.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-secondary)' }}>
            暂无历史记录，开始生成提示词吧！
          </p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {history.map(item => (
          <div key={item.id} className="card">
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className={`badge ${item.type === 'TEXT_TO_IMAGE' ? 'badge-primary' : 'badge-success'}`}>
                    {item.type === 'TEXT_TO_IMAGE' ? '文生图' : '图生视频'}
                  </span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  {item.isFavorite && <span>⭐</span>}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleToggleFavorite(item.id)}
                  >
                    {item.isFavorite ? '★' : '☆'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => handleCopy(item.result)}
                  >
                    📋
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: 'var(--text-secondary)', 
                  margin: '0 0 0.5rem 0' 
                }}>
                  输入：
                </p>
                <p style={{ margin: 0 }}>{item.rawInput}</p>
              </div>
              <div>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: 'var(--text-secondary)', 
                  margin: '0 0 0.5rem 0' 
                }}>
                  生成的：
                </p>
                <pre style={{
                  margin: 0,
                  padding: '0.75rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '0.375rem',
                  fontSize: '0.75rem',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  {item.result}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore && history.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setPage(p => p + 1)}
            disabled={loading}
          >
            {loading ? <><div className="spinner" style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} /> 加载中...</> : '加载更多'}
          </button>
        </div>
      )}
    </div>
  );
};