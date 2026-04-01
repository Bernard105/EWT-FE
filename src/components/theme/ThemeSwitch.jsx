import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeSwitch({ label = 'Light/Dark', className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={`theme-switch ${className}`.trim()}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
    >
      <span className="theme-switch-label">{label}</span>
      <span className={`theme-switch-track ${isDark ? 'is-on' : ''}`}>
        <span className="theme-switch-thumb" />
      </span>
    </button>
  );
}
