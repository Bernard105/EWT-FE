import React from 'react';

export default function AuthNotice({ type = 'error', children }) {
  if (!children) return null;
  return <div className={`suite-inline-notice ${type}`}>{children}</div>;
}
