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

// Function to get customers data
const getRepairOrders = async () => {
    try {
        const res = await api.get('v1/repair-orders');  
        return res.data;  
    } catch (error) {
        return error.response.data;  
    }
};

const getUsers = async () => {
  try {
    const res = await api.get('v1/users');
    return res.data;  
  } catch (error) {
    return error.response.data;  
  }
};



export { api, login, logout, checkAuthStatus, getRepairOrders, getUsers };
