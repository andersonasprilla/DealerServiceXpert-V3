import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';

export function useApi() {
  const navigate = useNavigate();

  // Set up an interceptor for all API responses
  api.interceptors.response.use(
    // For successful responses, just return the response as is
    (response) => response,
    
    // For errors, check if we need to redirect
    (error) => {
      // Check if the error has a response and if the status is 401 (Unauthorized) or 404 (Not Found)
      if (error.response && (error.response.status === 401 || error.response.status === 404)) {
        // If so, navigate to the home page 
        navigate('/');
      }
      // Regardless, reject the promise with the error to allow further error handling
      return Promise.reject(error);
    }
  );

  // Return the api instance with the interceptor attached
  return api;
}