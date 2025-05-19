import axios from 'axios';

// Create an instance of axios with a base URL and default headers
const axiosInstance = axios.create({
  baseURL: 'http://3.110.240.189:8000//', // Replace with your actual base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
