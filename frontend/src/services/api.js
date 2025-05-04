import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
    baseURL: 'http://localhost:5000', // Update this to match your backend server URL
    headers: {
        'Content-Type': 'application/json',
    },
});
api.interceptors.request.use(
    (config) => {
        // Get the token from localStorage or other storage
        const token = localStorage.getItem('token');

        // If token exists, attach it to the headers
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Handle any error that occurred before the request was sent
        return Promise.reject(error);
    }
);
export default api;
