import React, { createContext, useContext, useMemo, useState } from 'react';
import { isRealApiConfigured } from '../config/env';
import { isPreviewModeEnabled, setPreviewModePreference } from '../lib/previewMode';

const PreviewModeContext = createContext(null);

export function PreviewModeProvider({ children }) {
  const [previewMode, setPreviewModeState] = useState(isPreviewModeEnabled);

  const setPreviewMode = (enabled) => {
    const nextValue = setPreviewModePreference(enabled);
    setPreviewModeState(nextValue);
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const value = useMemo(() => ({
    previewMode,
    isLiveMode: !previewMode,
    isApiConfigured: isRealApiConfigured,
    setPreviewMode,
    togglePreviewMode: () => setPreviewMode(!previewMode),
  }), [previewMode]);

  return <PreviewModeContext.Provider value={value}>{children}</PreviewModeContext.Provider>;
}

export function usePreviewMode() {
  const context = useContext(PreviewModeContext);
  if (!context) {
    throw new Error('usePreviewMode must be used within PreviewModeProvider');
  }
  return context;
}
