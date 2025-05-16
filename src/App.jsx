import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { Layout } from 'antd';
import Home from './component/Home';
import Login from './component/Login';
import About from './component/About';  
import Registration from './component/Registration';
import FeaturePage from './component/FeaturePage';
import ContactUs from './component/ContactUs';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import AnimatedBackground from './component/Animated';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Voicebot from './component/Voicebot';

// Destructure layout components
const { Header, Content, Footer: AntFooter } = Layout;

// Create a wrapper component inside App.jsx for layout control
function AppLayout() {
  const location = useLocation();

  // Check if current path is "/Voicebot"
  const isVoicebotPage = location.pathname === '/Voicebot';

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-quad',
      once: true
    });
  }, []);

  return (
    <Layout className="app-layout">
      {/* Conditionally render Navbar */}
      {!isVoicebotPage && (
        <Header className="app-header">
          <Navbar />
        </Header>
      )}

      <Content className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/features" element={<FeaturePage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/Voicebot" element={<Voicebot />} />
        </Routes>
      </Content>

      {/* Conditionally render Footer */}
      {!isVoicebotPage && (
        <AntFooter className="app-footer">
          <Footer />
        </AntFooter>
      )}
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
