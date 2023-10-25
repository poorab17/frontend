import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/',
    // Set your API base URL
});

// Add an interceptor to include the JWT token with each request
api.interceptors.request.use((config) => {
    const token = String(localStorage.getItem('jwtToken'))
    console.log("local storage tokens", token);
    if (token) {
        console.log("check token is coming", token)
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => {
        // Modify the response data here (e.g., parse, transform)

        return response;
    },
    (error) => {
        // Handle response errors here

        return Promise.reject(error);
    }
);

export default api;
