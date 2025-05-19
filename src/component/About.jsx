import React from 'react';
import { Typography, Card, Divider, Carousel } from 'antd';
import './Home.css';

const { Title, Paragraph } = Typography;

const About = () => {
    return (
        <div className="home-container">
            <div className="hero-section" data-aos="fade-down">
                <Title level={1} className="main-title">
                    About <span className="accent-text">Infi-Chat</span>
                </Title>
                <Paragraph className="hero-text">
                    Welcome to Infi-Chat! We are dedicated to providing seamless and efficient communication solutions for everyone. 
                    Our platform is designed to connect people and foster collaboration in real-time.
                </Paragraph>
                <Paragraph className="hero-text">
                    Whether you're chatting with friends, collaborating with colleagues, or building communities, 
                    Infi-Chat is here to make your experience smooth and enjoyable.
                </Paragraph>
            </div>

            {/* Testimonials Section */}
            <Divider orientation="center" className="section-divider">What Our Teams Say</Divider>
            <div className="testimonial-section" data-aos="zoom-in">
                <Carousel autoplay>
                    <div>
                        <Card className="testimonial-card">
                            <Paragraph className="testimonial-text">
                                "Infi-Chat has completely transformed the way we communicate as a team. 
                                It's fast, reliable, and easy to use!"
                            </Paragraph>
                            <Paragraph className="testimonial-author">
                                - Aarti, UI Developer
                            </Paragraph>
                        </Card>
                    </div>
                    <div>
                        <Card className="testimonial-card">
                            <Paragraph className="testimonial-text">
                                "Deploying Infi-Chat was smooth and effortless. The system runs flawlessly even at scale!"
                            </Paragraph>
                            <Paragraph className="testimonial-author">
                                - Ashish, DevOps & Deployment Lead
                            </Paragraph>
                        </Card>
                    </div>
                    <div>
                        <Card className="testimonial-card">
                            <Paragraph className="testimonial-text">
                                "We loved working on the chatbot logic. It’s exciting to see it engaging users so effectively!"
                            </Paragraph>
                            <Paragraph className="testimonial-author">
                                - Nikita & Akanksha, Chatbot Creators
                            </Paragraph>
                        </Card>
                    </div>
                </Carousel>
            </div>
        </div>
    );
};

export default About;
