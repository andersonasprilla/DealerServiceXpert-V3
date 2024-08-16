import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/api';

// Define a mapping of roles to their respective dashboard routes
const ROLE_ROUTES = {
  Manager: (id) => `/manager/${id}/dashboard`,
  'Service Advisor': (id) => `/service-advisor/${id}/dashboard`,
  // Add more roles and their corresponding routes here
  // Technician: (id) => `/technician/${id}/dashboard`,
  // PartSpecialist: (id) => `/part-specialist/${id}/dashboard`,
};

// Default route if role is not found in the mapping
const DEFAULT_ROUTE = '/dashboard';

const LoginScreen = () => {
  // State variables for form inputs, error handling, and user data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Effect to handle navigation after successful login
  useEffect(() => {
    if (userData) {
      const getRouteForRole = ROLE_ROUTES[userData.role];
      const route = getRouteForRole 
        ? getRouteForRole(userData._id)
        : DEFAULT_ROUTE;
      navigate(route);
    }
  }, [userData, navigate]);

  // Handler for form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // Attempt to log in
      const result = await login(email, password);
      setUserData(result);
    } catch (err) {
      // Handle login errors
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Logo and title */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* ... (logo and title JSX) ... */}
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      {/* Login form */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form onSubmit={submitHandler} className="space-y-6">
            {/* Email input */}
            <div>
              {/* ... (email input JSX) ... */}
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            {/* Password input */}
            <div>
              {/* ... (password input JSX) ... */}
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  value={password}
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
             {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between">
              {/* ... (remember me and forgot password JSX) ... */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm leading-6">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            {/* Submit button */}
            <div>
              {/* ... (submit button JSX) ... */}
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
            {/* Error message display */}
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
