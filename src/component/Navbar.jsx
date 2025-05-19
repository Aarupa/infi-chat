import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Space } from 'antd';
import { RocketFilled, MessageFilled, UserOutlined, InfoCircleFilled } from '@ant-design/icons';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  // Map paths to keys
  const getSelectedKey = () => {
    if (location.pathname === '/' && location.hash === '#features') return 'features';
    if (location.pathname === '/') return 'home';
    if (location.pathname === '/about') return 'about';
    if (location.pathname === '/login') return 'login';
    if (location.pathname === '/register') return 'register';
    if (location.pathname === '/features') return 'features';
    if (location.pathname === '/contact') return 'contactus';
    return '';
  };
  // Define menu items using the items prop
  const menuItems = [
    {
      key: 'home',
      icon: <RocketFilled />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: 'about',
      icon: <InfoCircleFilled />,
      label: <Link to="/about">About</Link>,
    },
    {
      key: 'features',
      icon: <MessageFilled />,
      label: <Link to="/features">Features</Link>,
    },
    {
      key: 'contactus',
      label: <Link to="/contact">Contact Us</Link>,
    },
    {
      key: 'login',
      icon: <UserOutlined />,
      label: <Link to="/login">Login</Link>,
    },
    {
      key: 'register',
      label: (
        <Link to="/register" className="register-btn">
          Register
        </Link>
      ),
    },
  ];
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
        items={menuItems}
      />
    </div>
  );
}

export default Navbar;
