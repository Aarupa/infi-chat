import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Home from './component/Home';
import Login from './component/Login';
import About from './component/About';
import Registration from './component/Registration';
import FeaturePage from './component/FeaturePage';
import ContactUs from './component/ContactUs';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import VoiceLayout from './component/VoiceLayout';
import GmttBot from './component/GmttBot';

import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const { Header, Content, Footer: AntFooter } = Layout;

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-quad',
      once: true,
    });
  }, []);

  return (
    <Router>
      <Routes>
        {/* Voicebot route with isolated layout */}
        <Route
          path="/voicebot"
          element={
            <div className="voicebot-isolation-wrapper">
              <VoiceLayout />
            </div>
          }
        />
          <Route
          path="/gmtt"
          element={
            <div className="voicebot-isolation-wrapper">
              <VoiceLayout />
            </div>
          }
        />

        {/* Main layout for all other routes */}
        <Route
          path="*"
          element={
            <Layout className="app-layout">
              <Header className="app-header">
                <Navbar />
              </Header>

              <Content className="app-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/features" element={<FeaturePage />} />
                  <Route path="/register" element={<Registration />} />
                  <Route path="/contact" element={<ContactUs />} />
                </Routes>
              </Content>

              <AntFooter className="app-footer">
                <Footer />
              </AntFooter>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
