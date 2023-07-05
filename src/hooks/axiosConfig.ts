import axios from 'axios';
import { Navigate } from 'react-router-dom';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 && error.response.data.error === 'token_expired') {
      return Promise.reject(new Error('Token expired'));
    }
    return Promise.reject(error);
  }
);

export default axios;
