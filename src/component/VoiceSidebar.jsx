import React from 'react';
import { Menu } from 'antd';
import { AudioOutlined, HomeOutlined, GlobalOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const VoiceSidebar = () => {
  const location = useLocation();

  const selectedKey = (() => {
    if (location.pathname.startsWith('/voicebot')) return 'voice';
    if (location.pathname.startsWith('/gmtt')) return 'gmtt';
    return 'home';
  })();

  const sidebarStyle = {
    width: 300,
    height: '100vh',
    borderRight: 'none',
    background: 'linear-gradient(135deg, var(--secondary-color) 0%, var(--dark-color) 100%)',
    paddingTop: 24,
    paddingBottom: 24,
  };

  const itemStyle = {
    fontSize: 16,
    fontWeight: 500,
    color: '#ffffff',
    marginBottom: 15,
  };

  const linkStyle = {
    color: 'inherit',
    textDecoration: 'none',
    WebkitTextDecoration: 'none',
  };

  const iconStyle = {
    fontSize: 18,
    color: '#ffffff',
  };

  return (
    <Menu
      mode="vertical"
      selectedKeys={[selectedKey]}
      style={sidebarStyle}
      theme="dark" // makes sure AntD won't override our colors with default light theme
    >
      <Menu.Item
  key="home"
  icon={<HomeOutlined style={iconStyle} />}
  style={{
    ...itemStyle,
    borderLeft: selectedKey === 'home' ? 'none' : undefined,
  }}
>
  <Link to="/" style={linkStyle}>Home</Link>
</Menu.Item>

<Menu.Item
  key="voice"
  icon={<AudioOutlined style={iconStyle} />}
  style={{
    ...itemStyle,
    borderLeft: selectedKey === 'voice' ? 'none' : undefined,
  }}
>
  <Link to="/voicebot" style={{linkStyle, textDecoration: 'none'}}>Voice Bot</Link>
</Menu.Item>

<Menu.Item
  key="gmtt"
  icon={<GlobalOutlined style={iconStyle} />}
  style={{
    ...itemStyle,
    borderLeft: selectedKey === 'gmtt' ? 'none' : undefined,
  }}
>
  <Link to="/gmtt" style={linkStyle}>GMTT</Link>
</Menu.Item>

    </Menu>
  );
};

export default VoiceSidebar;
