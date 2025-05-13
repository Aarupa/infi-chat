import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Home from './component/Home';
import Login from './component/Login';
import Registration from './component/Registration';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
        <Header className="app-header">
          <Navbar />
        </Header>
        <Content className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </Content>
        <AntFooter className="app-footer">
          <Footer />
        </AntFooter>
      </Layout>
    </Router>
  );
}

export default App;
