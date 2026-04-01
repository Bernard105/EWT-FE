import { env, isRealApiConfigured } from '../config/env';
import { getCookie, setCookie } from './cookies';

const PREVIEW_MODE_COOKIE = 'easywork_preview_mode';
const PREVIEW_MODE_STORAGE_KEY = 'easywork_preview_mode';

function readStoredPreference() {
  const cookieValue = getCookie(PREVIEW_MODE_COOKIE);
  if (cookieValue === 'true') return true;
  if (cookieValue === 'false') return false;

  if (typeof window !== 'undefined') {
    try {
      const raw = window.localStorage.getItem(PREVIEW_MODE_STORAGE_KEY);
      if (raw === 'true') return true;
      if (raw === 'false') return false;
    } catch {
      // ignore storage issues
    }
  }

  return null;
}

export function getDefaultPreviewMode() {
  return env.enableDemoAuth || !isRealApiConfigured;
}

export function isPreviewModeEnabled() {
  const stored = readStoredPreference();
  return stored ?? getDefaultPreviewMode();
}

export function setPreviewModePreference(enabled) {
  const normalized = Boolean(enabled);
  setCookie(PREVIEW_MODE_COOKIE, String(normalized));

  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(PREVIEW_MODE_STORAGE_KEY, String(normalized));
    } catch {
      // ignore storage issues
    }
  }

  return normalized;
}

export function clearPreviewModePreference() {
  setCookie(PREVIEW_MODE_COOKIE, '', { days: -1 });
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(PREVIEW_MODE_STORAGE_KEY);
    } catch {
      // ignore storage issues
    }
  }
}

export { PREVIEW_MODE_COOKIE, PREVIEW_MODE_STORAGE_KEY };
