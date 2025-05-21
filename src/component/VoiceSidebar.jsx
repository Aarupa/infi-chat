import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeOutlined, 
  AudioOutlined,
  DownOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  ClusterOutlined
} from '@ant-design/icons';

const VoiceSidebar = () => {
  const location = useLocation();
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const selectedKey = (() => {
    if (location.pathname.startsWith('/voicebot')) return 'voice';
    if (location.pathname.startsWith('/gmtt')) return 'gmtt';
    return 'home';
  })();

  const sidebarStyle = {
    // width: '250px',
    height: '100vh',
    // background: 'linear-gradient(135deg, #1e3a8a 0%, #111827 100%)',
     background: 'linear-gradient(135deg, #5a189a 0%, #10002b 100%)',
    padding: '24px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    left: 0,
    top: 0,
  };

  const itemStyle = {
    fontSize: '15px',
    fontWeight: '500',
    color: '#ffffff',
    padding: '14px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    position: 'relative',
    transition: 'all 0.2s ease',
    borderRadius: '0 6px 6px 0',
    cursor: 'pointer',
    margin: '4px 0',
  };

  const activeItemStyle = {
    ...itemStyle,
    background: 'rgba(255, 255, 255, 0.15)',
  };

  const activeIndicator = {
    position: 'absolute',
    left: '0',
    top: '0',
    height: '100%',
    width: '4px',
    background: '#3b82f6',
    borderRadius: '0 4px 4px 0',
  };

  const linkStyle = {
    color: 'inherit',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    width: '100%',
  };

  const iconStyle = {
    fontSize: '18px',
    color: '#ffffff',
  };

  const profileSection = {
    marginTop: 'auto',
    padding: '16px 24px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const toggleSubmenu = (menu) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  return (
    <div style={sidebarStyle}>
      <div style={{ padding: '0 24px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          background: '#3b82f6', 
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '18px'
        }}>
          ∞
        </div>
        <h3 style={{ color: 'white', margin: 0, fontSize: '18px' }}>Infi Chat</h3>
      </div>

      {/* Main Menu Items */}
      <div
        style={selectedKey === 'home' ? activeItemStyle : itemStyle}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
        onMouseLeave={(e) => e.currentTarget.style.background = selectedKey === 'home' ? 'rgba(255, 255, 255, 0.15)' : 'transparent'}
      >
        {selectedKey === 'home' && <div style={activeIndicator} />}
        <Link to="/" style={linkStyle}>
          <HomeOutlined style={iconStyle} />
          <span>Home Dashboard</span>
        </Link>
      </div>

      <div
        style={selectedKey === 'voice' ? activeItemStyle : itemStyle}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
        onMouseLeave={(e) => e.currentTarget.style.background = selectedKey === 'voice' ? 'rgba(255, 255, 255, 0.15)' : 'transparent'}
      >
        {selectedKey === 'voice' && <div style={activeIndicator} />}
        <Link to="/voicebot" style={linkStyle}>
          <AudioOutlined style={iconStyle} />
          <span>Voice Bot</span>
        </Link>
      </div>

      <div
        style={selectedKey === 'gmtt' ? activeItemStyle : itemStyle}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
        onMouseLeave={(e) => e.currentTarget.style.background = selectedKey === 'gmtt' ? 'rgba(255, 255, 255, 0.15)' : 'transparent'}
      >
        {selectedKey === 'gmtt' && <div style={activeIndicator} />}
        <Link to="/gmtt" style={linkStyle}>
          <ClusterOutlined style={iconStyle} />
          <span>Give Me Tree</span>
        </Link>
      </div>

      {/* Profile Section */}
      <div style={profileSection}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
        }}>
          <UserOutlined />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: 'white', fontWeight: '500' }}>John Doe</div>
          <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px' }}>Admin</div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <SettingOutlined style={{ color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }} />
          <LogoutOutlined style={{ color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer' }} />
        </div>
      </div>
    </div>
  );
};

export default VoiceSidebar;