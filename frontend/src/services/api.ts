const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function fetchApi(
  endpoint: string,
  options: RequestInit = {}
) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  };

  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
}

export const api = {
  auth: {
    register: (email: string, username: string, password: string) =>
      fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, username, password }),
      }),
    login: (email: string, password: string) =>
      fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    getCurrentUser: () => fetchApi('/auth/me'),
    changePassword: (currentPassword: string, newPassword: string) =>
      fetchApi('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      }),
  },

  prompt: {
    generate: (input: string) =>
      fetchApi('/prompt/generate', {
        method: 'POST',
        body: JSON.stringify({ input }),
      }),
    refine: (prompt: string) =>
      fetchApi('/prompt/refine', {
        method: 'POST',
        body: JSON.stringify({ prompt }),
      }),
  },

  history: {
    get: (page = 1, limit = 10) =>
      fetchApi(`/history?page=${page}&limit=${limit}`),
    delete: (id: number) =>
      fetchApi(`/history/${id}`, { method: 'DELETE' }),
    toggleFavorite: (id: number) =>
      fetchApi(`/history/${id}/favorite`, { method: 'POST' }),
  },

  config: {
    get: () => fetchApi('/config'),
    save: (provider: string, apiKey: string, endpoint?: string) =>
      fetchApi('/config', {
        method: 'POST',
        body: JSON.stringify({ provider, apiKey, endpoint }),
      }),
    delete: (id: number) =>
      fetchApi(`/config/${id}`, { method: 'DELETE' }),
    test: (provider: string) =>
      fetchApi('/config/test', {
        method: 'POST',
        body: JSON.stringify({ provider }),
      }),
  },
};
