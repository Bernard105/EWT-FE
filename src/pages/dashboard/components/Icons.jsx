import React from 'react';

function IconBase({ children, size = 22, viewBox = '0 0 24 24', strokeWidth = 1.9 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function DashboardIcon() {
  return (
    <IconBase>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
    </IconBase>
  );
}

export function TasksIcon() {
  return (
    <IconBase>
      <line x1="10" y1="6" x2="20" y2="6" />
      <line x1="10" y1="12" x2="20" y2="12" />
      <line x1="10" y1="18" x2="20" y2="18" />
      <circle cx="5.2" cy="6" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="5.2" cy="12" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="5.2" cy="18" r="1.1" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function TeamIcon() {
  return (
    <IconBase>
      <path d="M16 19a4 4 0 0 0-8 0" />
      <circle cx="12" cy="10" r="3.2" />
      <path d="M20 19a3.5 3.5 0 0 0-2.8-3.2" />
      <path d="M6.8 15.8A3.5 3.5 0 0 0 4 19" />
    </IconBase>
  );
}

export function SettingsIcon() {
  return (
    <IconBase>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.54V21a2 2 0 0 1-4 0v-.09a1.7 1.7 0 0 0-1-1.54 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.54-1H3a2 2 0 0 1 0-4h.09a1.7 1.7 0 0 0 1.54-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.7 1.7 0 0 0 1.87.34h.01A1.7 1.7 0 0 0 10 3.09V3a2 2 0 0 1 4 0v.09a1.7 1.7 0 0 0 1 1.54 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.01a1.7 1.7 0 0 0 1.54 1H21a2 2 0 0 1 0 4h-.09a1.7 1.7 0 0 0-1.54 1Z" />
    </IconBase>
  );
}

export function SearchIcon() {
  return (
    <IconBase>
      <circle cx="11" cy="11" r="6.5" />
      <line x1="16" y1="16" x2="20.5" y2="20.5" />
    </IconBase>
  );
}

export function BellIcon() {
  return (
    <IconBase>
      <path d="M15.5 18H5.6a1 1 0 0 1-.9-1.45c1.3-2.32 1.9-4.18 1.9-7.05A5.4 5.4 0 0 1 12 4a5.4 5.4 0 0 1 5.4 5.4c0 2.87.6 4.73 1.9 7.05A1 1 0 0 1 18.4 18h-2.9Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </IconBase>
  );
}

export function DoubleChevronLeft() {
  return (
    <IconBase>
      <polyline points="14 6 8 12 14 18" />
      <polyline points="20 6 14 12 20 18" />
    </IconBase>
  );
}

export function CollapseIcon() {
  return (
    <IconBase>
      <path d="M11 17H7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4" />
      <polyline points="13 15 17 12 13 9" />
      <line x1="17" y1="12" x2="9" y2="12" />
    </IconBase>
  );
}

export function ClipboardIcon() {
  return (
    <IconBase size={18}>
      <rect x="6" y="5" width="12" height="15" rx="2" />
      <path d="M9 5.2h6a1 1 0 0 0-1-1.2h-4A1 1 0 0 0 9 5.2Z" />
    </IconBase>
  );
}

export function ClockIcon() {
  return (
    <IconBase size={18}>
      <circle cx="12" cy="12" r="7.5" />
      <path d="M12 8v4l2.8 1.8" />
    </IconBase>
  );
}

export function CheckSquareIcon() {
  return (
    <IconBase size={18}>
      <rect x="4.2" y="4.2" width="15.6" height="15.6" rx="3" />
      <polyline points="8.3 12.2 11.1 15 16 9.2" />
    </IconBase>
  );
}

export function BarsIcon() {
  return (
    <IconBase size={18}>
      <line x1="6" y1="18" x2="6" y2="10" />
      <line x1="12" y1="18" x2="12" y2="6" />
      <line x1="18" y1="18" x2="18" y2="12" />
    </IconBase>
  );
}

export function PlusIcon() {
  return (
    <IconBase size={18}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </IconBase>
  );
}

export function InviteIcon() {
  return (
    <IconBase size={18}>
      <path d="M16.5 17a3.5 3.5 0 0 0-7 0" />
      <circle cx="13" cy="9" r="3" />
      <line x1="4" y1="10" x2="8" y2="10" />
      <line x1="6" y1="8" x2="6" y2="12" />
    </IconBase>
  );
}

export function CheckIcon() {
  return (
    <IconBase size={16}>
      <polyline points="4.5 8.5 7.2 11.2 11.8 6.2" />
    </IconBase>
  );
}

export function CommentIcon() {
  return (
    <IconBase size={16}>
      <path d="M5 5.5h8a2 2 0 0 1 2 2v3.8a2 2 0 0 1-2 2H9l-3.5 3v-3H5a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2Z" />
    </IconBase>
  );
}

export function CalendarIcon() {
  return (
    <IconBase size={16}>
      <rect x="3.5" y="5.5" width="13" height="11" rx="2" />
      <line x1="3.5" y1="8.5" x2="16.5" y2="8.5" />
      <line x1="7" y1="3.5" x2="7" y2="6.5" />
      <line x1="13" y1="3.5" x2="13" y2="6.5" />
    </IconBase>
  );
}
