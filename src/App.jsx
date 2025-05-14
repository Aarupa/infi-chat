import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Home from './component/Home';
import Login from './component/Login';
import About from './component/About';  
import Registration from './component/Registration';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const { Header, Content, Footer: AntFooter } = Layout;

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
              <Menu.Item key="about" icon={<UserOutlined />}>
                <Link to="/about">About</Link>
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
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </Content>
        <AntFooter className="app-footer">
          <Footer />
        </AntFooter>
      </Layout>
    </Router>
  );
}

export default App;
