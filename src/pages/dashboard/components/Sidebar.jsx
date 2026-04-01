import React from 'react';
import '../../../styles/dashboard/Sidebar.css';
import {
  DashboardIcon,
  TasksIcon,
  TeamIcon,
  SettingsIcon,
  DoubleChevronLeft,
  CollapseIcon,
} from './Icons';

export default function Sidebar() {
  const navItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, active: true },
    { label: 'Tasks', icon: <TasksIcon />, active: false },
    { label: 'Team', icon: <TeamIcon />, active: false },
    { label: 'Settings', icon: <SettingsIcon />, active: false },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="brand">EasyWorkTogether</div>

        <button className="collapse-trigger" type="button" aria-label="Collapse sidebar">
          <DoubleChevronLeft />
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`nav-item ${item.active ? 'active' : ''}`}
          >
            <span className="nav-item-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <button type="button" className="sidebar-bottom">
        <CollapseIcon />
        <span>Collapse Sidebar</span>
      </button>
    </aside>
  );
}
