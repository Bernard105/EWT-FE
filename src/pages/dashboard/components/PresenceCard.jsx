import React from 'react';
import '../../../styles/dashboard/PresenceCard.css';
import { members } from '../data/dashboardData';

export default function PresenceCard() {
  return (
    <section className="ui-card presence-card">
      <div className="section-head presence-head">
        <h3>Team Presence</h3>

        <div className="presence-pills">
          {members.slice(0, 4).map((member) => (
            <div className="mini-pill" key={member.name}>
              <img src={member.avatar} alt={member.name} />
              <span>{member.name}</span>
            </div>
          ))}

          <div className="mini-pill ghost-pill">
            <span className="green-dot" />
          </div>

          <div className="circle-pill" />
        </div>
      </div>

      <div className="presence-track">
        {members.map((member) => (
          <div className="presence-user" key={member.name}>
            <div className="presence-avatar-ring">
              <img src={member.avatar} alt={member.name} />
              <span className="online-badge" />
            </div>

            <span className="presence-name">{member.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
