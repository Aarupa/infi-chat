import React from 'react';
import { Row, Col, Typography, Button, Card } from 'antd';
import {
  FaUser,
  FaEnvelope,
  FaCommentDots,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from 'react-icons/fa';
import './Home.css';
import './ContactUs.css';
import img from '../assets/contact.gif'; // Your chatbot image

const { Title, Paragraph } = Typography;

const socialLinks = [
  { icon: <FaFacebook />, url: 'https://www.facebook.com/prushal', label: 'Facebook' },
  { icon: <FaInstagram />, url: 'https://www.instagram.com/prushaltech/', label: 'Instagram' },
  { icon: <FaLinkedin />, url: 'https://www.linkedin.com/company/prushal-technology-pvt-ltd/', label: 'LinkedIn' },
  { icon: <FaYoutube />, url: 'https://www.youtube.com/@prushaltechnology8846', label: 'YouTube' },
  { icon: <FaWhatsapp />, url: 'https://wa.me/919850113269', label: 'WhatsApp' },
];

function ContactUs() {
  return (
    <div className="home-container contactus-narrow">
      <Row gutter={[32, 32]} align="middle" className="contact-hero-row">
        {/* Contact Form */}
        <Col xs={24} md={12}>
          <div className="contact-form-glass">
            <Title level={2} className="main-title" style={{ textAlign: 'left', marginBottom: 30 }}>
              Contact <span className="accent-text">Us</span>
            </Title>
            <form className="contact-form">
              <div className="form-group floating-label">
                <input type="text" required />
                <label><FaUser /> Name</label>
              </div>
              <div className="form-group floating-label">
                <input type="email" required />
                <label><FaEnvelope /> Email</label>
              </div>
              <div className="form-group floating-label">
                <textarea rows={4} required />
                <label><FaCommentDots /> Your Message</label>
              </div>
              <Button htmlType="submit" className="primary-btn" style={{ width: '100%', marginTop: 20 }}>
                Send Message
              </Button>
            </form>
          </div>
        </Col>

        {/* Social Media & Chatbot */}
        <Col xs={24} md={12} className="contact-hero-art">
          <div className="contact-art-box">
            <img
              src={img}
              alt="Chatbot Animation"
              className="contact-chatbot-img"
              style={{ width: '100%', maxWidth: 220, margin: '0 auto', display: 'block' }}
            />
            <div className="social-media-section">
              <Title level={4} style={{ color: 'var(--primary-color)', marginBottom: 12, fontWeight: 600, fontSize: '1.2rem' }}>Connect with us</Title>
              <div className="social-icons-row">
                {socialLinks.map(({ icon, url, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-link"
                    aria-label={label}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Info Section */}
      <div className="contact-info-section">
        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <Card className="contact-info-card" bordered={false}>
              <Title level={4} className="feature-title">Indeed Inspiring Infotech</Title>
              <Paragraph className="feature-desc">
                We resource Corporate Trainers on demand.<br />
                We impart professional Trainings in the domains that best fit for the corporates.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="contact-info-card" bordered={false}>
              <Title level={4} className="feature-title">Address</Title>
              <Paragraph className="feature-desc">
                Flat No 401<br />
                Vrindavan Society,<br />
                Near Samindradevi Market,<br />
                BAIF Road, Wagholi Pune MH - 412207
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="contact-info-card" bordered={false}>
              <Title level={4} className="feature-title">Contact</Title>
              <Paragraph className="feature-desc">
                info@indeedinspiring.com<br />
                (+91) 9850113269<br />
                (+91) 9850603269<br />
                (+91) 9850803269<br />
                (+91) 9762203269
              </Paragraph>
            </Card>
          </Col>
        </Row>
        <div className="contact-map-section">
          <iframe
            title="Company Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d682.6188161467643!2d73.98006358889943!3d18.574471260457578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c3fbd4314181%3A0x8dd7d41e1bdef971!2sSachin%20Wanis%20house!5e1!3m2!1sen!2sin!4v1743762710000!5m2!1sen!2sin"
            width="100%"
            height="280"
            style={{ border: 0, borderRadius: 12, marginTop: 30 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
