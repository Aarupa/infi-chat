import React from 'react';
import { Typography, Card, Row, Col, Divider, Button } from 'antd';
import { Typewriter } from 'react-simple-typewriter';
import {
  FaBrain, FaBook, FaHandsHelping,
  FaRobot, FaQuestionCircle, FaUserFriends, FaRegCommentDots, FaRegLightbulb,
  FaCogs, FaCloud, FaUserShield, FaRegFileAlt, FaSearch, FaRegEnvelope,
  FaRegCheckCircle, FaRegClock, FaRegBell, FaRegHandshake, FaRegComments, FaChartLine, FaDatabase
} from 'react-icons/fa';
import './Home.css'; // Uses your color palette and styles

const { Title, Paragraph } = Typography;

const floatingIcons = [
  FaRobot, FaBrain, FaQuestionCircle, FaBook, FaRegLightbulb, FaHandsHelping,
  FaDatabase, FaChartLine, FaUserFriends, FaRegCommentDots, FaRegFileAlt,
  FaCogs, FaCloud, FaUserShield, FaSearch, FaRegEnvelope,
  FaRegCheckCircle, FaRegClock, FaRegBell, FaRegHandshake, FaRegComments
];

const features = [
  {
    icon: <FaBrain className="feature-icon" />,
    title: 'Contextual Conversations using NLU',
    desc: 'Understands user intent and context, enabling natural, meaningful, and dynamic conversations using advanced Natural Language Understanding.'
  },
  {
    icon: <FaBook className="feature-icon" />,
    title: 'Pre-trained with FAQs and Internal Documents',
    desc: 'Instantly ready to answer common questions and reference your company’s knowledge base, reducing setup time and improving accuracy.'
  },
  {
    icon: <FaHandsHelping className="feature-icon" />,
    title: 'Fallback and Escalation to Human Support',
    desc: 'Seamlessly transfers complex or sensitive queries to human agents, ensuring users always get the help they need.'
  }
];

function Features() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section feature-hero">
        
        <Title level={1} className="main-title">
          <span className="accent-text">
            <Typewriter
              words={['Features']}
              loop={1}
              cursor
              cursorStyle="|"
              typeSpeed={120}
              deleteSpeed={0}
              delaySpeed={1000}
            />
          </span>
          {' '}of InFi-Chatbot
        </Title>
        <Paragraph className="hero-text">
          Discover the intelligent features that make InFi-Chatbot your best AI-powered assistant for business and support.
        </Paragraph>
        <Button
          type="primary"
          className="primary-btn"
          style={{ marginTop: 30 }}
          href="/register"
        >
          Try Now
        </Button>
      </div>

      {/* Features Section */}
      <Divider orientation="center" className="section-divider">Key Features</Divider>
      <Row gutter={[40, 40]} className="features-section">
        {features.map((feature, idx) => (
          <Col xs={24} md={8} key={idx}>
            <Card hoverable className="feature-card" data-aos="fade-up" data-aos-delay={idx * 100}>
              {feature.icon}
              <Title level={4} className="feature-title">{feature.title}</Title>
              <Paragraph className="feature-desc">{feature.desc}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Features;
