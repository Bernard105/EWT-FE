import { env } from '../../config/env';
import { STORAGE_KEYS } from '../../constants/storageKeys';

function buildRequestUrl(path) {
  if (/^https?:\/\//i.test(path)) return path;
  if (!env.apiBaseUrl) return path;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${env.apiBaseUrl}${normalizedPath}`;
}

function readSessionToken() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.authSession);
    if (!raw) return '';
    const parsed = JSON.parse(raw);
    return parsed?.token || '';
  } catch {
    return '';
  }
}

async function parseResponse(response) {
  if (response.status === 204) return null;

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const payload = isJson ? await response.json().catch(() => ({})) : await response.text().catch(() => '');

  if (!response.ok) {
    const message = typeof payload === 'string'
      ? payload
      : payload?.message || payload?.error || 'Request failed.';
    const error = new Error(message);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

export async function apiRequest(path, options = {}) {
  const { headers, body, authenticated = true, ...restOptions } = options;
  const hasJsonBody = body !== undefined && !(body instanceof FormData);
  const token = authenticated ? readSessionToken() : '';

  const response = await fetch(buildRequestUrl(path), {
    credentials: 'include',
    ...restOptions,
    headers: {
      Accept: 'application/json',
      ...(hasJsonBody ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: hasJsonBody ? JSON.stringify(body) : body,
  });

  return parseResponse(response);
}

export function createApiPath(path) {
  return buildRequestUrl(path);
}
