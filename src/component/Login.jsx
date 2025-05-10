import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

function Login() {
  const [formData, setFormData] = useState({
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

  const handleSubmit = () => {
    setLoading(true);
    console.log('Login form submitted:', formData);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Add your actual login logic here
    }, 1500);
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
        bodyStyle={{ padding: '40px' }}
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
            label="Email" 
            name="email" 
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
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
    </div>
  );
}

export default Login;

// import React, { useState } from 'react';
// import { Form, Input, Button, Typography, Card, Divider, Space } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import { UserOutlined, LockOutlined, RobotOutlined } from '@ant-design/icons';

// const { Title, Text } = Typography;

// function Login() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     setLoading(true);
//     console.log('Login form submitted:', formData);
//     setTimeout(() => {
//       setLoading(false);
//     }, 1500);
//   };

//   return (
//     <div style={{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       minHeight: '100vh',
//       width: '100vw',
//       background: 'linear-gradient(135deg, #1a1a1a 0%, #6a0dad 100%)',
//       padding: '20px',
//     }}>
//       <Card
//         style={{
//           width: '100%',
//           maxWidth: '420px',
//           borderRadius: '12px',
//           boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
//           overflow: 'hidden',
//           border: 'none',
//           background: 'rgba(255, 255, 255, 0.9)',
//         }}
//         bodyStyle={{ padding: '30px' }}
//       >
//         <div style={{ textAlign: 'center', marginBottom: '20px' }}>
//           <Space direction="vertical" size="middle">
//             <RobotOutlined style={{ 
//               fontSize: '40px', 
//               color: '#6a0dad',
//             }} />
//             <Title level={3} style={{ 
//               color: '#6a0dad', 
//               margin: 0,
//               fontWeight: 600
//             }}>
//               Welcome Back
//             </Title>
//             <Text type="secondary" style={{ 
//               fontSize: '14px',
//               color: '#666'
//             }}>
//               Sign in to continue to Infi-Chat
//             </Text>
//           </Space>
//         </div>

//         <Form layout="vertical" onFinish={handleSubmit}>
//           <Form.Item 
//             label={<Text style={{ color: '#555' }}>Email</Text>}
//             name="email" 
//             rules={[
//               { required: true, message: 'Please input your email!' },
//               { type: 'email', message: 'Please enter a valid email!' }
//             ]}
//           >
//             <Input
//               prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               size="large"
//               placeholder="Enter your email"
//             />
//           </Form.Item>
          
//           <Form.Item 
//             label={<Text style={{ color: '#555' }}>Password</Text>}
//             name="password" 
//             rules={[
//               { required: true, message: 'Please input your password!' },
//               { min: 6, message: 'Password must be at least 6 characters!' }
//             ]}
//           >
//             <Input.Password
//               prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               size="large"
//               placeholder="Enter your password"
//             />
//           </Form.Item>

//           <Form.Item style={{ marginBottom: '10px', textAlign: 'right' }}>
//             <Button 
//               type="link" 
//               style={{ 
//                 padding: 0, 
//                 color: '#8a2be2',
//                 fontSize: '14px'
//               }}
//               onClick={() => console.log('Forgot password clicked')}
//             >
//               Forgot password?
//             </Button>
//           </Form.Item>

//           <Form.Item>
//             <Button 
//               type="primary" 
//               htmlType="submit" 
//               block 
//               size="large"
//               loading={loading}
//               style={{
//                 height: '42px',
//                 fontSize: '15px',
//                 background: 'linear-gradient(90deg, #6a0dad, #8a2be2)',
//                 border: 'none',
//                 borderRadius: '6px',
//                 fontWeight: 500,
//                 transition: 'all 0.3s',
//               }}
//               onMouseEnter={(e) => e.target.style.opacity = 0.9}
//               onMouseLeave={(e) => e.target.style.opacity = 1}
//             >
//               Sign In
//             </Button>
//           </Form.Item>

//           <Divider style={{ color: '#999', fontSize: '14px' }}>or</Divider>

//           <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
//             <Text style={{ fontSize: '14px', color: '#666' }}>Don't have an account? </Text>
//             <Button 
//               type="link" 
//               style={{ 
//                 padding: 0, 
//                 fontSize: '14px',
//                 color: '#8a2be2',
//                 fontWeight: '500'
//               }}
//               onClick={() => navigate('/register')}
//             >
//               Sign up now
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// }

// export default Login;