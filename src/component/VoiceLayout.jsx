import React from 'react';
import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';
import VoiceSidebar from './VoiceSidebar';
import Voicebot from './Voicebot';
import GmttBot from './GmttBot';

const { Sider, Content } = Layout;

const VoiceLayout = () => {
  const location = useLocation();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        style={{
          width: '200px',
          background: '#001529',
          minHeight: '100vh'
        }}
      >
        <VoiceSidebar style={{ height: '100%' }} />
      </Sider>
      <Layout>
        <Content>
          {location.pathname === '/gmtt' ? <GmttBot /> : <Voicebot />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default VoiceLayout;