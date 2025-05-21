// src/component/VoiceSidebar.jsx
import React from 'react';
import { Menu } from 'antd';
import { AudioOutlined, HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const VoiceSidebar = () => {
  return (
    <Menu mode="vertical" className="voice-sidebar">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="voice" icon={<AudioOutlined />}>
        <Link to="/voicebot">Voice Bot</Link>
      </Menu.Item>
    </Menu>
  );
};

export default VoiceSidebar;