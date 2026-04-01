import React from "react";
import { Link } from "react-router-dom";
import "../../styles/enterpriseLanding/FeatureCard.css";

export default function FeatureCard({ item }) {
  return (
    <article className={`ewt-feature-card ${item.variant}`}>
      <div className="ewt-feature-content">
        <div className="ewt-feature-icon">{item.icon}</div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>

        {item.badge1 && (
          <div className="ewt-badges">
            <span>{item.badge1}</span>
            <span>{item.badge2}</span>
          </div>
        )}

        {item.cta && item.ctaTo && (
          <Link to={item.ctaTo} className="ewt-feature-link">
            {item.cta} →
          </Link>
        )}
      </div>

      {(item.variant === "large-left" || item.variant === "wide") && (
        <div className="ewt-feature-visual">
          {item.variant === "large-left" ? (
            <div className="ewt-network-visual">
              {Array.from({ length: 7 }).map((_, idx) => (
                <span key={idx} className={`node node-${idx + 1}`} />
              ))}
              <div className="line line-1" />
              <div className="line line-2" />
              <div className="line line-3" />
              <div className="line line-4" />
              <div className="line line-5" />
            </div>
          ) : (
            <div className="ewt-chart-visual">
              <div className="ewt-chart-header">
                <span />
                <small>+ 12.4%</small>
              </div>
              <div className="ewt-chart-body" />
            </div>
          )}
        </div>
      )}
    </article>
  );
}
