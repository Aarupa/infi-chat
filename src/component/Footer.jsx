import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-links">
        <Link to="/about">About</Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="copyright">
        Infi-Chat ©2025 | AI-Powered Chat Solutions
      </div>
    </div>
  );
}

export default Footer;
