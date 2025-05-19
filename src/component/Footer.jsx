import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
} from 'react-icons/fa';
import './Footer.css';
import img from '../assets/foot.gif'; // Your chatbot GIF

const socialLinks = [
  { icon: <FaFacebook />, url: 'https://www.facebook.com/prushal', label: 'Facebook' },
  { icon: <FaInstagram />, url: 'https://www.instagram.com/prushaltech/', label: 'Instagram' },
  { icon: <FaLinkedin />, url: 'https://www.linkedin.com/company/prushal-technology-pvt-ltd/', label: 'LinkedIn' },
  { icon: <FaYoutube />, url: 'https://www.youtube.com/@prushaltechnology8846', label: 'YouTube' },
  { icon: <FaWhatsapp />, url: 'https://wa.me/919850113269', label: 'WhatsApp' },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-section footer-image">
          <img
            src={img}
            alt="AI Chatbot"
            className="footer-gif"
          />
        </div>
        <div className="footer-section footer-links">
          <h4>Quick Links</h4>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/login">Login</Link>
        </div>
        <div className="footer-section footer-contact">
          <h4>Contact</h4>
          <div><a href="mailto:info@indeedinspiring.com">info@indeedinspiring.com</a></div>
          <div><a href="tel:+919850113269">(+91) 9850113269</a></div>
          <div><a href="tel:+919850603269">(+91) 9850603269</a></div>
          <div><a href="tel:+919850803269">(+91) 9850803269</a></div>
          <div><a href="tel:+919762203269">(+91) 9762203269</a></div>
        </div>
      </div>
      <div className="footer-social">
        {socialLinks.map((item) => (
          <a
            key={item.label}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="footer-social-icon"
          >
            {item.icon}
          </a>
        ))}
      </div>
      <div className="footer-bottom">
        Infi-Chat ©{currentYear} | AI powered by <b>Indeed Inspiring Inotech</b>
      </div>
    </footer>
  );
}

export default Footer;
