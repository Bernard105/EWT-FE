import React from 'react';

function IconBase({ children, size = 18, strokeWidth = 1.8, viewBox = '0 0 24 24' }) {
  return (
    <svg width={size} height={size} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

export function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.8 12.2c0-.7-.1-1.3-.2-1.9H12v3.6h5.5c-.2 1.2-.9 2.2-1.9 2.9v2.4h3.1c1.8-1.6 3.1-4 3.1-7Z" fill="#4285F4"/>
      <path d="M12 22c2.7 0 5-.9 6.7-2.5l-3.1-2.4c-.9.6-2.1 1-3.6 1-2.8 0-5.2-1.9-6.1-4.5H2.7V16c1.7 3.5 5.3 6 9.3 6Z" fill="#34A853"/>
      <path d="M5.9 13.6c-.2-.6-.3-1.2-.3-1.8s.1-1.2.3-1.8V7.6H2.7C2.2 8.7 2 10 2 11.8c0 1.8.4 3.1.7 4.2l3.2-2.4Z" fill="#FBBC05"/>
      <path d="M12 5.5c1.5 0 2.8.5 3.9 1.5l2.9-2.9C17 2.5 14.7 1.5 12 1.5c-4 0-7.6 2.5-9.3 6.1L5.9 10c.9-2.6 3.3-4.5 6.1-4.5Z" fill="#EA4335"/>
    </svg>
  );
}

export function MailIcon() {
  return <IconBase><path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" /></IconBase>;
}

export function LockIcon() {
  return <IconBase><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 1 1 8 0v3" /></IconBase>;
}

export function UserIcon() {
  return <IconBase><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></IconBase>;
}
