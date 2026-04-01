import React from 'react';
import '../../../styles/dashboard/QuickActions.css';
import { PlusIcon, InviteIcon } from './Icons';

export default function QuickActions() {
  return (
    <aside className="ui-card quick-actions">
      <div className="section-head">
        <h3>Quick Actions</h3>
      </div>

      <div className="quick-actions-list">
        <button className="action-btn primary" type="button">
          <PlusIcon />
          <span>Create Task</span>
        </button>

        <button className="action-btn success" type="button">
          <InviteIcon />
          <span>Invite Team</span>
        </button>
      </div>
    </aside>
  );
}
