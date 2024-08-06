import { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { checkAuthStatus } from '../api/api'; 

const useAuthVerification = (requiredRole = null) => { // Define a custom hook useAuthVerification with an optional requiredRole parameter.
  const navigate = useNavigate(); // Initialize navigate function using useNavigate hook.
  const [user, setUser] = useState(null); // Define user state to store authenticated user information.
  const [isLoading, setIsLoading] = useState(true); // Define isLoading state to indicate loading status.

  useEffect(() => { // useEffect hook to perform side effects (like verifying authentication).
    const verifyAuth = async () => { // Define an asynchronous function to verify authentication.
      try {
        const authenticatedUser = await checkAuthStatus(); // Call checkAuthStatus to get the authenticated user.
        // If no authenticated user or user role does not match the required role, navigate to the home page.
        if (!authenticatedUser || (requiredRole && authenticatedUser.role !== requiredRole)) {
          navigate('/');
          return;
        }
        setUser(authenticatedUser); // Set the authenticated user in the state.
      } catch (error) {
        console.error('Authentication failed:', error); // Log any errors that occur during authentication.
        navigate('/'); // Navigate to the home page if authentication fails.
      } finally {
        setIsLoading(false); // Set isLoading to false after authentication check is complete.
      }
    };

    verifyAuth(); // Call the verifyAuth function.
  }, [navigate, requiredRole]); // Dependency array to re-run the effect if navigate or requiredRole changes.

  return { user, isLoading }; // Return the user and isLoading state values from the custom hook.
};

export default useAuthVerification; // Export the useAuthVerification hook as the default export.
