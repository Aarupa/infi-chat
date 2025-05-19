import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Layout } from 'antd';
import Home from './component/Home';
import Login from './component/Login';
import About from './component/About';  
import Registration from './component/Registration';
import FeaturePage from './component/FeaturePage';
import ContactUs from './component/ContactUs';
import Navbar from './component/Navbar';  // ✅ Using your custom Navbar
import Footer from './component/Footer';  // ✅ Using your custom Footer
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
// import Voicebot from './component/voicebot'; // Importing the Voicebot component

const { Header, Content, Footer: AntFooter } = Layout;

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-quad',
      once: true
    });
  }, []);

  return (
    <Router>
      <Layout className="app-layout">
        {/* ✅ Use Navbar component inside Header */}
        <Header className="app-header">
          <Navbar />
        </Header>

        {/* ✅ Main routed content */}
        <Content className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/features" element={<FeaturePage />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/contact" element={<ContactUs />} />
            {/* <Route path="/voicebot" element={<Voicebot />} /> */}
          </Routes>
        </Content>

        {/* ✅ Use Footer component inside AntFooter */}
        <AntFooter className="app-footer">
          <Footer />
        </AntFooter>
      </Layout>
    </Router>
  );
}

export default App;
