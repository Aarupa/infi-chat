
import React from 'react';
import { Layout } from 'antd';
import VoiceSidebar from './VoiceSidebar';
import Voicebot from './Voicebot';

const { Sider, Content } = Layout;

const VoiceLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}> {/* Ensures full viewport height */}
      <Sider 
        style={{ 
          width: '200px', 
          background: '#001529', 
          minHeight: '100vh' /* Ensures full height */ 
        }}
      >
        <VoiceSidebar style={{ height: '100%' }} /> {/* Takes full height of Sider */}
      </Sider>
      <Layout>
        <Content>
          <Voicebot />
        </Content>
      </Layout>
    </Layout>
  );
};

export default VoiceLayout;