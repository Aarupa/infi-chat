import React from 'react';
import { Button, Typography, Card, Row, Col, Divider } from 'antd';
import img from '../assets/chatbot.gif';
import {
  RocketOutlined,
  MessageOutlined,
  CodeOutlined,
  TeamOutlined,
  CustomerServiceOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
// import AnimatedBackground from './Animated';
import './Home.css';
import { Typewriter } from 'react-simple-typewriter';

const { Title, Paragraph } = Typography;

function Home() {
  const navigate = useNavigate();

  const services = [
    {
      title: 'AI/ML Powered Chatbots',
      icon: <RocketOutlined />,
      description: 'Advanced chatbots leveraging artificial intelligence and machine learning for intelligent conversations'
    },
    {
      title: 'Website Chatbots',
      icon: <CodeOutlined />,
      description: 'Custom chatbots integrated seamlessly into your website for 24/7 customer support'
    },
    {
      title: 'Interview Bots',
      icon: <TeamOutlined />,
      description: 'Smart interview assistants that can conduct preliminary screening and assessments'
    },
    {
      title: 'Indeed/Purshal Support',
      icon: <CustomerServiceOutlined />,
      description: 'Specialized chatbots for Indeed and Purshal platforms to handle queries and support'
    }
  ];

  return (
    <>
      {/* <AnimatedBackground /> */}
      <div className="home-container">
        {/* Hero Section */}



        <div className="hero-section" data-aos="fade-down">
  <Title level={1} className="main-title">
    Welcome to{' '}
    <span className="accent-text">
      <Typewriter
        words={['InFi-Chat']}
        loop={0} // 0 means infinite loop
        cursor
        cursorStyle="|"
        typeSpeed={100}
        deleteSpeed={80}
        delaySpeed={1200}
      />
    </span>
    bot
  </Title>
  <Paragraph className="hero-text">
    Infi-Chat is your AI-powered chatbot solution for Indeed and Purshal platforms,
    providing intelligent support, query resolution, and automated assistance.
    Our cutting-edge technology transforms how businesses interact with their users.
  </Paragraph>
  <img
    src={img}
    alt="AI animation"
    className="hero-gif"
    style={{ width: '200px', margin: '20px 0' }}
  />
  <div className="cta-buttons">
    <Button
      type="primary"
      className="primary-btn"
      onClick={() => navigate('/login')}
    >
      Get Started
    </Button>
    <Button
      className="secondary-btn"
      onClick={() => navigate('/register')}
    >
      Learn More
    </Button>
  </div>
</div>








        {/* Mission & Vision */}
        <Divider orientation="center" className="section-divider">Our Purpose</Divider>
        <Row gutter={[40, 40]} className="mission-vision-section">
          <Col xs={24} md={12}>
            <Card
              hoverable
              className="mission-card"
              data-aos="fade-right"
            >
              <Title level={3} className="section-title">Our Vision</Title>
              <Paragraph className="section-text">
                To revolutionize digital interactions through AI-powered conversational interfaces
                that understand, learn, and respond with human-like intelligence across all platforms.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card
              hoverable
              className="vision-card"
              data-aos="fade-left"
            >
              <Title level={3} className="section-title">Our Mission</Title>
              <Paragraph className="section-text">
                To develop intelligent chatbot solutions that enhance user experience on Indeed and Purshal platforms,
                providing instant, accurate support while continuously learning and improving through advanced ML algorithms.
              </Paragraph>
            </Card>
          </Col>
        </Row>

        {/* Services */}
        <Divider orientation="center" className="section-divider">Our Services</Divider>
        <Row gutter={[30, 30]} className="services-section">
          {services.map((service, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card
                hoverable
                className="service-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="service-icon">{service.icon}</div>
                <Title level={4} className="service-title">{service.title}</Title>
                <Paragraph className="service-desc">{service.description}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Testimonials */}
        <Divider orientation="center" className="section-divider">What Our Clients Say</Divider>
        <div className="testimonial-section" data-aos="zoom-in">
          <Card className="testimonial-card">
            <Paragraph className="testimonial-text">
              "Infi-Chat transformed our customer support with its intelligent chatbot solution.
              Our response times improved by 70% and customer satisfaction scores skyrocketed."
            </Paragraph>
            <Paragraph className="testimonial-author">
              - Sarah Johnson, CEO of TechSolutions
            </Paragraph>
          </Card>
        </div>

        {/* Final CTA */}
        <div className="final-cta" data-aos="fade-up">
          <Title level={2} className="cta-title">
            Ready to Transform Your Digital Interactions?
          </Title>
          <Button
            type="primary"
            size="large"
            className="cta-button"
            onClick={() => navigate('/voicebot')}
          >
            Start Free Trial
          </Button>
        </div>
      </div>
    </>
  );
}
 
export default Home;
