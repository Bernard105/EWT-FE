import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes";
import TopNav from "../components/enterpriseLanding/TopNav";
import HeroVisual from "../components/enterpriseLanding/HeroVisual";
import FeatureCard from "../components/enterpriseLanding/FeatureCard";
import Footer from "../components/enterpriseLanding/Footer";
import "../components/EnterpriseLogo.css";
import "../styles/enterpriseLanding/EnterpriseLandingPage.css";

const navItems = [
  { label: "Dashboard", to: ROUTES.dashboard },
  { label: "Tasks", to: ROUTES.tasks },
  { label: "Workspaces", to: ROUTES.workspaceSelector },
  { label: "Analytics", to: ROUTES.analytics },
  { label: "Members", to: ROUTES.members },
  { label: "Setup", to: ROUTES.workspaceSetup },
];

const featureCards = [
  {
    title: "Neural Project Mapping",
    description:
      "Automatically visualize dependencies and bottlenecks before they impact your delivery timeline.",
    badge1: "AI-POWERED",
    badge2: "REAL-TIME",
    variant: "large-left",
    icon: "✣",
  },
  {
    title: "Instant Sync",
    description:
      "Zero-latency updates across all global enterprise endpoints.",
    variant: "small",
    icon: "⚡",
  },
  {
    title: "Quantum Security",
    description:
      "End-to-end encryption built for the most sensitive data environments.",
    variant: "small",
    icon: "🛡",
  },
  {
    title: "Predictive Analytics",
    description:
      "Turn historical data into future foresight with our ML engine designed for high-density enterprise logic.",
    cta: "Explore analytics",
    ctaTo: ROUTES.workspaceInvitations,
    variant: "wide",
    icon: "◫",
  },
];

const metrics = [
  { value: "99.9%", label: "UPTIME SLA" },
  { value: "450k+", label: "ACTIVE USERS" },
  { value: "12ms", label: "GLOBAL LATENCY" },
  { value: "24/7", label: "EXPERT SUPPORT" },
];

const footerColumns = [
  {
    title: "PLATFORM",
    links: [
      { label: "Dashboard", to: ROUTES.home },
      { label: "Analytics", to: ROUTES.workspaceInvitations },
      { label: "Security", to: ROUTES.workspaceMembers },
      { label: "Integrations", to: ROUTES.workspaceSetup },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About Us", to: ROUTES.home },
      { label: "Careers", to: ROUTES.register },
      { label: "Blog", to: ROUTES.login },
      { label: "Press", to: ROUTES.workspaceSelector },
    ],
  },
  {
    title: "SUPPORT",
    links: [
      { label: "Help Center", to: ROUTES.forgotPassword },
      { label: "API Docs", to: ROUTES.workspaceSetup },
      { label: "Status", to: ROUTES.workspaceSelector },
      { label: "Contact", to: ROUTES.register },
    ],
  },
];

export default function EnterpriseLandingPage() {
  return (
    <div className="ewt-page">
      <div className="ewt-background-glow ewt-glow-left" />
      <div className="ewt-background-glow ewt-glow-right" />

      <TopNav navItems={navItems} />

      <main className="ewt-main">
        <section className="ewt-hero">
          <div className="ewt-version-pill">
            <span className="dot" />
            VERSION 4.0 NOW LIVE
          </div>

          <h1 className="ewt-hero-title">
            Operate at the
            <br />
            <span>Speed of Thought</span>
          </h1>

          <p className="ewt-hero-subtitle">
            The enterprise command center for high-performance teams. Unify your data, synchronize your
            workforce, and scale without boundaries.
          </p>

          <div className="ewt-hero-actions">
            <Link className="ewt-btn ewt-btn-primary" to={ROUTES.register}>
              Start for free
            </Link>
            <Link className="ewt-btn ewt-btn-secondary" to={ROUTES.login}>
              Watch Demo
            </Link>
          </div>

          <HeroVisual />
        </section>

        <section className="ewt-capabilities">
          <div className="ewt-section-heading">
            <div>
              <span className="ewt-section-kicker">CORE CAPABILITIES</span>
              <h2>Engineering Better Outcomes</h2>
            </div>

            <p>
              Integrated systems that bridge the gap between abstract strategy and tactical execution.
            </p>
          </div>

          <div className="ewt-feature-grid">
            {featureCards.map((item) => (
              <FeatureCard key={item.title} item={item} />
            ))}
          </div>
        </section>

        <section className="ewt-metrics">
          {metrics.map((metric) => (
            <div key={metric.label} className="ewt-metric-item">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </section>

        <section className="ewt-cta-section">
          <div className="ewt-cta-card">
            <h2>
              Ready to synchronize
              <br />
              your enterprise?
            </h2>
            <p>
              Join the world’s most innovative companies using EasyWorkTogether to streamline their complex
              workflows.
            </p>
            <Link className="ewt-btn ewt-btn-light" to={ROUTES.register}>
              Start for free
            </Link>
          </div>
        </section>
      </main>

      <Footer footerColumns={footerColumns} />
    </div>
  );
}
