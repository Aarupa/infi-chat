import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'http://3.110.240.189:8000/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
