import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu, Space } from 'antd';
import { RocketFilled, MessageFilled, UserOutlined } from '@ant-design/icons';
import Home from './component/Home';
import Login from './component/Login';
import Registration from './component/Registration';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from 'react';

const { Header, Content, Footer } = Layout;

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-quad',
      once: true
    });
  }, []);
  return (
    <Router>
      <Layout className="app-layout">
        <Header className="app-header">
          <div className="header-container">
            <Link to="/" className="logo">
              <Space>
                <RocketFilled className="logo-icon" />
                <span className="logo-text">Infi-Chat</span>
              </Space>
            </Link>
            <Menu theme="dark" mode="horizontal" className="nav-menu">
              <Menu.Item key="home" icon={<RocketFilled />}>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="features" icon={<MessageFilled />}>
                <Link to="/#features">Features</Link>
              </Menu.Item>
              <Menu.Item key="login" icon={<UserOutlined />}>
                <Link to="/login">Login</Link>
              </Menu.Item>
              <Menu.Item key="register">
                <Link to="/register" className="register-btn">
                  Register
                </Link>
              </Menu.Item>
            </Menu>
          </div>
        </Header>
        <Content className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </Content>
        <Footer className="app-footer">
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
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;