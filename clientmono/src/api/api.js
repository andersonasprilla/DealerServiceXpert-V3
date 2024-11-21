import axios from 'axios';

// Create an instance of axios with custom configuration
const api = axios.create({
    baseURL: 'http://localhost:5001/api',  // Base URL for API requests
    headers: {
        'Content-Type': 'application/json',  // Set content type for JSON
    },
    withCredentials: true,  // Enable sending cookies with requests for authentication
});


// Function to handle user login
const login = async (email, password) => {
    try {
        const res = await api.post('v1/users/login', { email, password });  
        return res.data;  
    } catch (error) {
        return error.response.data;  
    }
};

// Function to handle user logout
const logout = async () => {
    try {
        const res = await api.post('v1/users/logout');  
        return res.data;  
    } catch (error) {
        return error.response.data;  
    }
};

// Function to check authentication status
const checkAuthStatus = async () => {
    try {
        const res = await api.get('v1/users/me');  
        return res.data; 
    } catch (error) {
        throw error.response.data;  
    }
};

// Function to get repair orders with optional query parameters
const getRepairOrders = async (queryParams = {}) => {
    try {
        // Construct the query string from the query parameters
        const queryString = new URLSearchParams(queryParams).toString();
        // Make the GET request to the API endpoint with the query string
        const res = await api.get(`v1/repair-orders?${queryString}`);
        return res.data;  
    } catch (error) {
        console.error('Error fetching repair orders:', error);
        return error.response?.data || { error: 'Failed to fetch repair orders' };
    }
};

const getUsers = async (queryParams = {}) => {
    try {
      // Construct the query string from the query parameters
      const queryString = new URLSearchParams(queryParams).toString();
      // Make the GET request to the API endpoint with the query string
      const res = await api.get(`v1/users?${queryString}`);
      return res.data;  
    } catch (error) {
      console.error('Error fetching users:', error);
      return error.response?.data || { error: 'Failed to fetch users' };
    }
  };

  
   



export { api, login, logout, checkAuthStatus, getRepairOrders, getUsers };
