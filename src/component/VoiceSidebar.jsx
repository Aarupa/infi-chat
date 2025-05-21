// src/component/VoiceSidebar.jsx
import React from 'react';
import { Menu } from 'antd';
import { AudioOutlined, HomeOutlined, GlobalOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const VoiceSidebar = () => {
  return (
  <Menu
      mode="vertical"
      className="voice-sidebar"
      style={{
        paddingTop: 16,
        paddingBottom: 16,
        width: 220,
        borderRight: 0,
        background: '#fff',
        height: '100vh', // Make sidebar full height
        minHeight: '100vh', // Ensure minimum height is full viewport
      }}
    >
      <Menu.Item key="home" icon={<HomeOutlined style={{ color: 'black' }} />}>
        <Link to="/" style={{ color: 'black' }}>Home</Link>
      </Menu.Item>
      <Menu.Item key="voice" icon={<AudioOutlined style={{ color: 'black' }} />}>
        <Link to="/voicebot" style={{ color: 'black' }}>Voice Bot</Link>
      </Menu.Item>
      <Menu.Item key="gmtt" icon={<GlobalOutlined style={{ color: 'black' }} />}>
        <Link to="/gmtt" style={{ color: 'black' }}>GMTT</Link>
      </Menu.Item>
    </Menu>
  );
};

export default VoiceSidebar;