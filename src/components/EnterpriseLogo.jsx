import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';
import './EnterpriseLogo.css';

export default function EnterpriseLogo({ compact = false, subtitle = 'Enterprise HQ' }) {
  return (
    <div className={`elogo ${compact ? 'compact' : ''}`}>
      <Link to={ROUTES.home} className="elogo-wordmark">
        <span className="elogo-primary">EasyWork</span>
        <span className="elogo-accent">Together</span>
      </Link>
      {compact || !subtitle ? null : <span className="elogo-subtitle">{subtitle}</span>}
    </div>
  );
}
