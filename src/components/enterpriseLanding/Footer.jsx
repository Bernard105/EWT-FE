import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes";
import Logo from "./Logo";
import "../../styles/enterpriseLanding/Footer.css";

export default function Footer({ footerColumns }) {
  return (
    <footer className="ewt-footer">
      <div className="ewt-footer-top">
        <div className="ewt-footer-brand">
          <Link to={ROUTES.home}>
            <Logo />
          </Link>
          <p>
            Building the future of collaborative enterprise infrastructure. Designed for speed, built for
            scale.
          </p>

          <div className="ewt-socials">
            <Link to={ROUTES.workspaceSelector} aria-label="Workspace selector">
              ◔
            </Link>
            <Link to={ROUTES.login} aria-label="Login">
              ◎
            </Link>
          </div>
        </div>

        <div className="ewt-footer-links">
          {footerColumns.map((column) => (
            <div key={column.title} className="ewt-footer-column">
              <h4>{column.title}</h4>
              {column.links.map((link) => (
                <Link key={link.label} to={link.to}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="ewt-footer-bottom">
        <span>© 2026 EASYWORKTOGETHER ENTERPRISE HQ. ALL RIGHTS RESERVED.</span>

        <div className="ewt-footer-bottom-links">
          <Link to={ROUTES.forgotPassword}>PRIVACY POLICY</Link>
          <Link to={ROUTES.register}>TERMS OF SERVICE</Link>
          <Link to={ROUTES.login}>COOKIE SETTINGS</Link>
        </div>
      </div>
    </footer>
  );
}
