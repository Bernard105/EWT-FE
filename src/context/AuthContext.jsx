import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { demoApi } from '../lib/demoApi';
import { usePreviewMode } from './PreviewModeContext';

const AuthContext = createContext(null);

function readInitialSession(previewModeEnabled) {
  if (previewModeEnabled) {
    return demoApi.getDefaultSession();
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.authSession);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const { previewMode } = usePreviewMode();
  const [session, setSession] = useState(() => readInitialSession(previewMode));
  const [hydrating, setHydrating] = useState(Boolean(!previewMode && readInitialSession(previewMode)));

  const persist = (nextSession) => {
    setSession(nextSession);
    try {
      if (nextSession) {
        localStorage.setItem(STORAGE_KEYS.authSession, JSON.stringify(nextSession));
      } else {
        localStorage.removeItem(STORAGE_KEYS.authSession);
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    let active = true;

    if (previewMode) {
      persist(demoApi.getDefaultSession());
      setHydrating(false);
      return undefined;
    }

    if (!session?.token) {
      setHydrating(false);
      return undefined;
    }

    authService
      .getProfile()
      .then((profile) => {
        if (!active) return;
        persist({ token: session.token, user: profile.user || session.user || profile });
      })
      .catch(() => {
        if (!active) return;
        persist(null);
      })
      .finally(() => {
        if (active) setHydrating(false);
      });

    return () => {
      active = false;
    };
  }, [previewMode]);

  const register = async (payload) => authService.register(payload);

  const login = async (email, password) => {
    const response = await authService.login({ email, password });
    persist({ token: response.token, user: response.user });
    return response;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // ignore API logout failure and clear client session anyway
    }
    persist(previewMode ? demoApi.getDefaultSession() : null);
  };

  const completeSession = (token, user) => persist({ token, user });

  const refreshProfile = async () => {
    const profile = await authService.getProfile();
    persist({ token: session?.token || 'demo-token', user: profile.user || profile });
    return profile;
  };

  const value = useMemo(
    () => ({
      user: session?.user || null,
      token: session?.token || '',
      isAuthenticated: Boolean(session?.token),
      hydrating,
      register,
      login,
      logout,
      completeSession,
      refreshProfile,
      isDemoMode: previewMode,
    }),
    [session, hydrating, previewMode]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
