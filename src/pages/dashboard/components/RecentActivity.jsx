import React from 'react';
import '../../../styles/dashboard/RecentActivity.css';
import { activities } from '../data/dashboardData';
import { CheckIcon, CommentIcon, CalendarIcon } from './Icons';

function ActivityLeading({ item }) {
  if (item.type === 'avatar') {
    return (
      <div className="activity-leading avatar">
        <img src={item.avatar} alt="" />
      </div>
    );
  }

  return (
    <div className="activity-leading">
      {item.type === 'check' && <CheckIcon />}
      {item.type === 'comment' && <CommentIcon />}
      {item.type === 'calendar' && <CalendarIcon />}
    </div>
  );
}

export default function RecentActivity() {
  return (
    <section className="ui-card recent-activity">
      <div className="section-head">
        <h3>Recent Activity</h3>
      </div>

      <div className="activity-list">
        {activities.map((item, index) => (
          <div className="activity-row" key={`${item.text}-${index}`}>
            <ActivityLeading item={item} />
            <p className="activity-text">{item.text}</p>
            <span className="activity-time">{item.time}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
