import React from 'react';
import { Link } from 'react-router-dom';
import './AppButton.css';

export default function AppButton({
  children,
  to,
  variant = 'primary',
  block = false,
  icon = null,
  className = '',
  ...props
}) {
  const classes = ['app-btn', `is-${variant}`, block ? 'is-block' : '', className].filter(Boolean).join(' ');

  if (to) {
    return (
      <Link to={to} className={classes}>
        {icon ? <span className="app-btn-icon">{icon}</span> : null}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {icon ? <span className="app-btn-icon">{icon}</span> : null}
      <span>{children}</span>
    </button>
  );
}
