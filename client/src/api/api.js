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
        const res = await api.post('/users/login', { email, password });  
        return res.data;  
    } catch (error) {
        return error.response.data;  
    }
};

// Function to handle user logout
const logout = async () => {
    try {
        const res = await api.post('/users/logout');  
        return res.data;  
    } catch (error) {
        return error.response.data;  
    }
};

// Function to check authentication status
const checkAuthStatus = async () => {
    try {
        const res = await api.get('/users/me');  
        return res.data; 
    } catch (error) {
        throw error.response.data;  
    }
};

// Function to get customers data
const getCustomers = async () => {
    try {
        const res = await api.get('/customers');  
        return res.data;  
    } catch (error) {
        return error.response.data;  
    }
};

const getUsers = async () => {
  try {
    const res = await api.get('/users');
    return res.data;  
  } catch (error) {
    return error.response.data;  
  }
};



export { api, login, logout, checkAuthStatus, getCustomers, getUsers };
