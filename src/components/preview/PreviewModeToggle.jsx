import React from 'react';
import { usePreviewMode } from '../../context/PreviewModeContext';
import './PreviewModeToggle.css';

export default function PreviewModeToggle() {
  const { previewMode, togglePreviewMode, isApiConfigured } = usePreviewMode();

  return (
    <div className="preview-mode-float" role="region" aria-label="Preview mode controls">
      <div className="preview-mode-copy">
        <span className={`preview-mode-badge ${previewMode ? 'preview' : 'live'}`}>
          {previewMode ? 'Preview mode' : 'Live API'}
        </span>
        <p>
          {previewMode
            ? 'Using local demo data so you can view every screen quickly.'
            : isApiConfigured
              ? 'Using the real backend API and real workspace data.'
              : 'Live API is off, but no backend URL is configured yet.'}
        </p>
      </div>

      <button
        type="button"
        className={`preview-mode-switch ${previewMode ? 'is-on' : ''}`}
        onClick={togglePreviewMode}
        aria-pressed={previewMode}
        aria-label={previewMode ? 'Switch to live API mode' : 'Switch to preview mode'}
      >
        <span className="preview-mode-track-labels">
          <span>Live</span>
          <span>Preview</span>
        </span>
        <span className="preview-mode-thumb" />
      </button>
    </div>
  );
}
