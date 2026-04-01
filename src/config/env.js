const normalizeBaseUrl = (value) => {
  if (!value) return '';
  return value.replace(/\/$/, '');
};

export const env = {
  apiBaseUrl: normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL),
  appName: import.meta.env.VITE_APP_NAME || 'EasyWorkTogether',
  authStorageKey: import.meta.env.VITE_AUTH_STORAGE_KEY || 'ewt_auth_session',
  enableDemoAuth: (import.meta.env.VITE_ENABLE_DEMO_AUTH || '').toLowerCase() === 'true',
};

export const isRealApiConfigured = Boolean(env.apiBaseUrl);
