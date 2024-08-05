import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuthStatus } from '../api/api';

const useAuthVerification = (requiredRole = null) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const authenticatedUser = await checkAuthStatus();
        if (!authenticatedUser || (requiredRole && authenticatedUser.role !== requiredRole)) {
          navigate('/');
          return;
        }
        setUser(authenticatedUser);
      } catch (error) {
        console.error('Authentication failed:', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [navigate, requiredRole]);

  return { user, isLoading };
};

export default useAuthVerification;