import React from 'react';

function IconBase({ children, size = 20, viewBox = '0 0 24 24', strokeWidth = 1.9, className = '' }) {
  return (
    <svg
      className={className}
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

export function GridIcon() {
  return (
    <IconBase>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
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
      <path d="M20 19a3.4 3.4 0 0 0-2.7-3.2" />
      <path d="M6.7 15.8A3.4 3.4 0 0 0 4 19" />
    </IconBase>
  );
}

export function SettingsIcon() {
  return (
    <IconBase>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.6 1.6 0 0 0 .34 1.86l.06.07a2 2 0 1 1-2.83 2.83l-.07-.06a1.6 1.6 0 0 0-1.86-.34 1.6 1.6 0 0 0-.98 1.47V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-.98-1.47 1.6 1.6 0 0 0-1.86.34l-.07.06a2 2 0 1 1-2.83-2.83l.06-.07A1.6 1.6 0 0 0 4.8 15a1.6 1.6 0 0 0-1.47-.98H3.2a2 2 0 1 1 0-4h.13A1.6 1.6 0 0 0 4.8 9.04a1.6 1.6 0 0 0-.34-1.86L4.4 7.1a2 2 0 1 1 2.83-2.83l.07.06a1.6 1.6 0 0 0 1.86.34h.01a1.6 1.6 0 0 0 .97-1.47V3.1a2 2 0 1 1 4 0v.13a1.6 1.6 0 0 0 .98 1.47 1.6 1.6 0 0 0 1.86-.34l.07-.06a2 2 0 1 1 2.83 2.83l-.06.07a1.6 1.6 0 0 0-.34 1.86v.01a1.6 1.6 0 0 0 1.47.97h.13a2 2 0 1 1 0 4h-.13A1.6 1.6 0 0 0 19.4 15Z" />
    </IconBase>
  );
}

export function ChevronDoubleLeftIcon() {
  return (
    <IconBase>
      <polyline points="14 6 8 12 14 18" />
      <polyline points="20 6 14 12 20 18" />
    </IconBase>
  );
}

export function LogoutArrowIcon() {
  return (
    <IconBase>
      <path d="M11 17H7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4" />
      <polyline points="13 15 17 12 13 9" />
      <line x1="17" y1="12" x2="9" y2="12" />
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

export function CheckSquareIcon() {
  return (
    <IconBase size={18}>
      <rect x="4.2" y="4.2" width="15.6" height="15.6" rx="3" />
      <polyline points="8.3 12.2 11.1 15 16 9.2" />
    </IconBase>
  );
}

export function SunMoonIcon() {
  return (
    <IconBase size={18}>
      <path d="M12 3v3" />
      <path d="M12 18v3" />
      <path d="m5.64 5.64 2.12 2.12" />
      <path d="m16.24 16.24 2.12 2.12" />
      <path d="M3 12h3" />
      <path d="M18 12h3" />
      <path d="m5.64 18.36 2.12-2.12" />
      <path d="m16.24 7.76 2.12-2.12" />
      <circle cx="12" cy="12" r="3.5" />
    </IconBase>
  );
}

export function BoldIcon() {
  return (
    <IconBase size={16}>
      <path d="M7 5h4a2 2 0 1 1 0 4H7z" />
      <path d="M7 9h5a2 2 0 1 1 0 4H7z" />
    </IconBase>
  );
}

export function ItalicIcon() {
  return (
    <IconBase size={16}>
      <line x1="10" y1="4.5" x2="15" y2="4.5" />
      <line x1="7" y1="15.5" x2="12" y2="15.5" />
      <line x1="13" y1="4.5" x2="9" y2="15.5" />
    </IconBase>
  );
}

export function UnderlineIcon() {
  return (
    <IconBase size={16}>
      <path d="M7 4.5v4a3 3 0 1 0 6 0v-4" />
      <line x1="5" y1="15.5" x2="15" y2="15.5" />
    </IconBase>
  );
}

export function LinkIcon() {
  return (
    <IconBase size={16}>
      <path d="M10.5 7.5 9 6a3 3 0 0 0-4.2 4.2l1.5 1.5" />
      <path d="m13.5 8.5 1.5 1.5a3 3 0 1 1-4.2 4.2L9.3 12.7" />
      <line x1="8.7" y1="11.3" x2="13.3" y2="6.7" />
    </IconBase>
  );
}

export function ListBulletsIcon() {
  return (
    <IconBase size={16}>
      <line x1="7" y1="5" x2="14" y2="5" />
      <line x1="7" y1="9" x2="14" y2="9" />
      <line x1="7" y1="13" x2="14" y2="13" />
      <circle cx="4.5" cy="5" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="9" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="13" r="0.8" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function ListNumbersIcon() {
  return (
    <IconBase size={16}>
      <line x1="7" y1="5" x2="14" y2="5" />
      <line x1="7" y1="9" x2="14" y2="9" />
      <line x1="7" y1="13" x2="14" y2="13" />
      <path d="M3.5 5h1V3.8l-1 .4" />
      <path d="M3.2 9h1.6c0-.8-1.2-.8-1.2-1.6 0-.5.4-.9.9-.9.5 0 .8.3.9.8" />
      <path d="M3.4 11.8h1c.7 0 1.1.4 1.1 1s-.4 1-1.1 1h-1" />
    </IconBase>
  );
}

export function ChevronDownIcon() {
  return (
    <IconBase size={18}>
      <polyline points="6 9 12 15 18 9" />
    </IconBase>
  );
}

export function PlusIcon() {
  return (
    <IconBase size={24}>
      <line x1="12" y1="6" x2="12" y2="18" />
      <line x1="6" y1="12" x2="18" y2="12" />
    </IconBase>
  );
}
