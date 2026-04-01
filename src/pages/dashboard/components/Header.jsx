import React from 'react';
import '../../../styles/dashboard/Header.css';
import { SearchIcon, BellIcon } from './Icons';
import ThemeSwitch from '../../../components/theme/ThemeSwitch';
import { profile } from '../data/dashboardData';

export default function Header() {
  return (
    <header className="topbar">
      <div className="search-box">
        <SearchIcon />
        <input type="text" placeholder="Search tasks, team, or projects..." />
      </div>

      <div className="topbar-right">
        <ThemeSwitch />

        <button className="bell-button" type="button" aria-label="Notifications">
          <BellIcon />
          <span className="notif-dot" />
        </button>

        <div className="profile-box">
          <img src={profile.avatar} alt={profile.name} />
          <span>{profile.name}</span>
        </div>
      </div>
    </header>
  );
}
