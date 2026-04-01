import React from 'react';
import { sidebarItems } from '../data/taskData';
import {
  ChevronDoubleLeftIcon,
  GridIcon,
  LogoutArrowIcon,
  SettingsIcon,
  TasksIcon,
  TeamIcon,
} from './Icons';

const iconMap = {
  grid: GridIcon,
  tasks: TasksIcon,
  team: TeamIcon,
  settings: SettingsIcon,
};

export default function Sidebar() {
  return (
    <aside className="sidebar-shell">
      <div className="sidebar-topbar">
        <div className="sidebar-brand">EasyWorkTogether</div>
        <button className="sidebar-chevron" type="button" aria-label="Collapse sidebar">
          <ChevronDoubleLeftIcon />
        </button>
      </div>

      <nav className="sidebar-navlist">
        {sidebarItems.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <button
              key={item.id}
              type="button"
              className={`sidebar-navitem ${item.active ? 'is-active' : ''}`}
            >
              <span className="sidebar-navicon">
                <Icon />
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <button type="button" className="sidebar-footerlink">
        <LogoutArrowIcon />
        <span>Collapse Sidebar</span>
      </button>
    </aside>
  );
}
