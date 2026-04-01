import React from 'react';
import { currentUser } from '../data/taskData';
import { SearchIcon } from './Icons';
import ThemeSwitch from '../../../components/theme/ThemeSwitch';

export default function Header() {
  return (
    <header className="header-shell glass-panel">
      <div className="header-searchbar">
        <SearchIcon />
        <input type="text" placeholder="Search tasks, team, or projects..." />
      </div>

      <div className="header-actions">
        <ThemeSwitch />

        <button type="button" className="profile-chip">
          <img src={currentUser.avatar} alt={currentUser.name} />
          <span>{currentUser.name}</span>
        </button>
      </div>
    </header>
  );
}
