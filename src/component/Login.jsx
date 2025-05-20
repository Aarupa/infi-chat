import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axiosInstance from '../utils/axiosIntance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import img from '../assets/login.gif'; // Your chatbot image

const { Title, Text } = Typography;

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/login/', formData);
      if (response.status === 200 && response.data.message) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast.error('Login failed. Please try again.');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Login failed! Please check your credentials.';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <Card className="login-card fade-in">
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <Title level={2} style={{ color: '#6a0dad', marginBottom: '10px', fontFamily: 'Poppins, sans-serif' }}>
              Welcome Back
            </Title>
            <Text type="secondary" style={{ fontSize: '16px', fontFamily: 'Poppins, sans-serif' }}>
              Sign in to your account to continue
            </Text>
          </div>
          <Form layout="vertical" onFinish={handleSubmit} className="animated-form">
            <div className="form-group cut-label">
  <label>
    <span className="label-icon"><UserOutlined /></span>
    Username
  </label>
  <input
    type="text"
    name="username"
    value={formData.username}
    onChange={handleChange}
    required
    autoComplete="username"
  />
</div>

<div className="form-group cut-label">
  <label>
    <span className="label-icon"><LockOutlined /></span>
    Password
  </label>
  <input
    type="password"
    name="password"
    value={formData.password}
    onChange={handleChange}
    required
    autoComplete="current-password"
  />
</div>

            <Form.Item style={{ marginBottom: '10px', textAlign: 'right' }}>
              <Button
                type="link"
                style={{ padding: 0, color: '#6a0dad', fontFamily: 'Poppins, sans-serif' }}
                onClick={() => console.log('Forgot password clicked')}
              >
                Forgot password?
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loading}
                className="primary-btn"
                style={{
                  height: '48px',
                  fontSize: '16px',
                  background: 'linear-gradient(135deg, #6a0dad 0%, #8a2be2 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                Sign In
              </Button>
            </Form.Item>
            <Divider style={{ color: '#888' }}>or</Divider>
            <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
              <Text style={{ fontSize: '16px', fontFamily: 'Poppins, sans-serif' }}>Don't have an account? </Text>
              <Button
                type="link"
                style={{
                  padding: 0,
                  fontSize: '16px',
                  color: '#6a0dad',
                  fontWeight: '500',
                  fontFamily: 'Poppins, sans-serif'
                }}
                onClick={() => navigate('/register')}
              >
                Sign up now
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <div className="login-image-container">
          <img
            src={img}
            alt="Login Visual"
            className="login-image"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
