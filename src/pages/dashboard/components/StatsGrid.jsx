import React from 'react';
import '../../../styles/dashboard/StatsGrid.css';
import { stats } from '../data/dashboardData';
import { ClipboardIcon, ClockIcon, CheckSquareIcon, BarsIcon } from './Icons';

function Sparkline({ points, id }) {
  const gradientId = `spark-fill-${id}`;

  return (
    <svg className="sparkline" viewBox="0 0 140 56" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7b84d8" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#7b84d8" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d={`M ${points} L 132 56 L 8 56 Z`} fill={`url(#${gradientId})`} />

      <polyline
        points={points}
        fill="none"
        stroke="#7480c9"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatIcon({ type }) {
  if (type === 'blue') return <ClipboardIcon />;
  if (type === 'yellow') return <ClockIcon />;
  if (type === 'green') return <CheckSquareIcon />;
  return <BarsIcon />;
}

function StatCard({ item }) {
  return (
    <article className="ui-card stat-card">
      <div className="stat-card-top">
        <div className={`stat-badge ${item.color}`}>
          <StatIcon type={item.color} />
        </div>
        <h3>{item.title}</h3>
      </div>

      <div className="stat-card-bottom">
        <div className="stat-copy">
          <div className="stat-value">{item.value}</div>
          <div className={`stat-note ${item.noteType}`}>{item.note}</div>
        </div>

        <Sparkline points={item.points} id={item.id} />
      </div>
    </article>
  );
}

export default function StatsGrid() {
  return (
    <div className="stats-grid">
      {stats.map((item) => (
        <StatCard key={item.id} item={item} />
      ))}
    </div>
  );
}
