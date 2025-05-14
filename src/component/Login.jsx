import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axiosInstance from '../utils/axiosIntance'; // Ensure axios instance is imported correctly
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify for notifications

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
  console.log('Login form submitted:', formData);

  try {
    const response = await axiosInstance.post('/api/login/', formData);
    console.log(response.data);

    if (response.status === 200 && response.data.message) {
    console.log('Login successful:', response.data.message);
    toast.success(response.data.message);
      setTimeout(() => {
        navigate('/');
      }, 2000);  // wait 2 seconds before navigating

    } else {
      toast.error('Login failed. Please try again.');
    }
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);

    // Show error message using Toastify (use message from API response if available)
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
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      maxWidth: '100vw',
      background: 'linear-gradient(135deg, #6a0dad 0%, #8a2be2 100%)',
      padding: '20px'
    }}>
      <Card
        style={{
          width: '100%',
          maxWidth: '480px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Title level={2} style={{ color: '#6a0dad', marginBottom: '10px' }}>
            Welcome Back
          </Title>
          <Text type="secondary" style={{ fontSize: '16px' }}>
            Sign in to your account to continue
          </Text>
        </div>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
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

          <Form.Item style={{ marginBottom: '10px', textAlign: 'right' }}>
            <Button
              type="link"
              style={{ padding: 0, color: '#6a0dad' }}
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
              style={{
                height: '48px',
                fontSize: '16px',
                background: 'linear-gradient(135deg, #6a0dad 0%, #8a2be2 100%)',
                border: 'none',
                borderRadius: '8px'
              }}
            >
              Sign In
            </Button>
          </Form.Item>

          <Divider style={{ color: '#888' }}>or</Divider>

          <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
            <Text style={{ fontSize: '16px' }}>Don't have an account? </Text>
            <Button
              type="link"
              style={{
                padding: 0,
                fontSize: '16px',
                color: '#6a0dad',
                fontWeight: '500'
              }}
              onClick={() => navigate('/register')}
            >
              Sign up now
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <ToastContainer />
    </div>
  );
}

export default Login;
