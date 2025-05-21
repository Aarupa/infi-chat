import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card, Divider, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosIntance'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Registration.css'; // Import the custom CSS (see below)

const { Title, Text } = Typography;

function Registration() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
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
  console.log('Registration form submitted:', formData);

  try {
    const response = await axiosInstance.post('/api/register/', formData);
    console.log(response.data);

    if (response.status === 201 && response.data.message) {
      console.log('Registration successful:', response.data.message);
     toast.success(response.data.message);
      setTimeout(() => {
        navigate('/login');
      }, 2000);  // wait 2 seconds before navigating

    } else {
      toast.error('Registration failed. Please try again.');
    }
  } catch (error) {
    console.error('Registration failed:', error.response ? error.response : error.message);

    if (error.response) {
      const backendMessage = 
        error.response.data.message ||
        error.response.data.detail || 
        JSON.stringify(error.response.data);

      toast.error(`Error: ${backendMessage}`);
    } else {
      toast.error('An error occurred during registration.');
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      // background: 'linear-gradient(135deg, #6a0dad 0%, #8a2be2 100%)',
      background: 'rgba(255, 255, 255, 0.8)', // Add this
      backdropFilter: 'blur(10px)',    
      padding: '20px'
    }}>
      <Card
        style={{
          width: '100%',
          maxWidth: '480px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          marginTop: '-40px',
        }}
        bodyStyle={{ padding: '40px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Title level={2} style={{ color: '#6a0dad', marginBottom: '10px' }}>
            Create Account
          </Title>
          <Text type="secondary" style={{ fontSize: '16px' }}>
            Join us to get started
          </Text>
        </div>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item 
            label="Username" 
            name="username" 
            rules={[
              { required: true, message: 'Please input your username!' },
              { min: 3, message: 'Username must be at least 3 characters!' }
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              size="large"
              placeholder="Enter your username"
            />
          </Form.Item>

          <Form.Item 
            label="Email" 
            name="email" 
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              size="large"
              placeholder="Enter your email"
            />
          </Form.Item>
          
          <Form.Item 
            label="Password" 
            name="password" 
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              name="password"
              value={formData.password}
              onChange={handleChange}
              size="large"
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              size="large"
              loading={loading}
              style={{
                height: '48px',
                fontSize: '16px',
                background: 'linear-gradient(135deg, #6a0dad 0%, #8a2be2 100%)',
                border: 'none',
                borderRadius: '8px',
                marginTop: '10px'
              }}
            >
              Register
            </Button>
          </Form.Item>

          <Divider style={{ color: '#888' }}>Already have an account?</Divider>

          <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
            <Text style={{ fontSize: '16px' }}>Sign in to your account </Text>
            <Button 
              type="link" 
              style={{ 
                padding: 0, 
                fontSize: '16px',
                color: '#6a0dad',
                fontWeight: '500'
              }}
              onClick={() => navigate('/login')}
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Toast Container for Toastify */}
      <ToastContainer />
    </div>
  );
}

export default Registration;
