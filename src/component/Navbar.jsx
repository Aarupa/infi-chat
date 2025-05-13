import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Space } from 'antd';
import { RocketFilled, MessageFilled, UserOutlined } from '@ant-design/icons';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  // Map paths to keys
  const getSelectedKey = () => {
    if (location.pathname === '/' && location.hash === '#features') return 'features';
    if (location.pathname === '/') return 'home';
    if (location.pathname === '/login') return 'login';
    if (location.pathname === '/register') return 'register';
    return '';
  };

  return (
    <div className="header-container">
      <Link to="/" className="logo">
        <Space>
          <RocketFilled className="logo-icon" />
          <span className="logo-text">Infi-Chat</span>
        </Space>
      </Link>
      <Menu
        theme="dark"
        mode="horizontal"
        className="nav-menu"
        selectedKeys={[getSelectedKey()]}
      >
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
  );
}

export default Navbar;
