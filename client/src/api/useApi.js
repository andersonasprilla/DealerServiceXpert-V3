import { useNavigate } from 'react-router-dom';
import { api } from './api';

export function useApi() {
  const navigate = useNavigate();

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 404)) {
        navigate('/');
      }
      return Promise.reject(error);
    }
  );

  return api;
}