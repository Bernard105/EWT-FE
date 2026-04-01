import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ROUTES } from "../../routes";
import Logo from "./Logo";
import { usePreviewMode } from '../../context/PreviewModeContext';
import "../../styles/enterpriseLanding/TopNav.css";

export default function TopNav({ navItems }) {
  const { previewMode } = usePreviewMode();

  return (
    <header className="ewt-header">
      <div className="ewt-header-inner">
        <Link to={ROUTES.home} aria-label="EasyWorkTogether home">
          <Logo />
        </Link>

        <nav className="ewt-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `ewt-nav-link ${isActive ? "active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ewt-header-actions">
          <span className={`ewt-preview-chip ${previewMode ? 'preview' : 'live'}`}>
            {previewMode ? 'Preview mode' : 'Live API'}
          </span>
          <button className="ewt-icon-btn" aria-label="Notifications" type="button">
            🔔
          </button>
          <button className="ewt-icon-btn" aria-label="Settings" type="button">
            ⚙
          </button>
          <button className="ewt-icon-btn" aria-label="Help" type="button">
            ?
          </button>
          <Link className="ewt-avatar-btn" aria-label="Go to login" to={ROUTES.login} />
        </div>
      </div>
    </header>
  );
}
