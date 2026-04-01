import React from "react";
import "../../styles/enterpriseLanding/HeroVisual.css";

export default function HeroVisual() {
  return (
    <div className="ewt-hero-visual">
      <div className="ewt-hero-window-top">
        <div className="ewt-window-title">EasyWorkTogether v4 - Dashboard</div>
        <div className="ewt-traffic-lights">
          <span aria-label="Minimize" />
          <span aria-label="Maximize" />
          <span aria-label="Close" />
        </div>
      </div>

      <div className="ewt-hero-window-body">
        <aside className="ewt-sidebar-mock">
          <div className="ewt-efficiency-card">
            <div className="ewt-mock-line short purple" />
            <div className="ewt-mock-line medium" />
            <div className="ewt-efficiency-row">
              <strong>84%</strong>
              <span>EFFICIENCY</span>
            </div>
          </div>

          <div className="ewt-list-card">
            <div className="ewt-mock-line cyan" />
            <div className="ewt-mock-line cyan" />
            <div className="ewt-mock-line cyan" />
            <div className="ewt-mock-line cyan short" />
          </div>
        </aside>

        <div className="ewt-canvas-mock">
          <div className="ewt-canvas-grid">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="ewt-canvas-col">
                <div className="ewt-mock-line tiny" />
                <div className="ewt-mock-line tiny" />
                <div className="ewt-mock-line tiny short" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
