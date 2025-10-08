const BASE_URL = (process.env.REACT_APP_API_BASE_URL || '').replace(/\/$/, '');

function headers(extra = {}) {
  const h = { 'Content-Type': 'application/json', ...extra };
  const token = localStorage.getItem('nc_token');
  if (token) h['Authorization'] = `Bearer ${token}`;
  return h;
}

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, { ...options, headers: headers(options.headers || {}) });
  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await res.json().catch(() => ({})) : await res.text();
  if (!res.ok) {
    const detail = isJson ? data?.detail || JSON.stringify(data) : data;
    throw new Error(`API error ${res.status}: ${detail}`);
  }
  return { data, status: res.status, ok: res.ok };
}

// PUBLIC_INTERFACE
export const api = {
  /** GET helper */
  get: (path) => request(path, { method: 'GET' }),
  /** POST helper */
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  /** PUT helper */
  put: (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body) }),
  /** DELETE helper */
  delete: (path) => request(path, { method: 'DELETE' }),
  /** Health check convenience */
  health: () => request('/health/')
};
