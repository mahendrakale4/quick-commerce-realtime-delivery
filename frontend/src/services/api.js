// services/api.js
import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
    baseURL: 'http://localhost:5000', // Update this to match your backend server URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
