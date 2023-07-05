import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  
  (error) => {
    if (error.response && error.response.status === 401 && error.response.data.error === 'token_expired') {
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default instance;
