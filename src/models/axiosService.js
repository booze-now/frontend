import axios from 'axios';
import config from './config.js';

const axiosInstance = axios.create({
    baseURL: config.serverUrl,
    // timeout: 5000,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
    }
});

// ha van tokenünk, elküldjük
axiosInstance.interceptors.request.use(request => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            try {
                // Attempt to refresh the token
                const response = await axios.post(`${config.serverUrl}/refresh`, { refreshToken });
                if (response.status === 200) {
                    // Store new token and update the original request
                    localStorage.setItem('accessToken', response.data.accessToken);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (e) {
                console.log('Refresh token invalid', e);
                // Handle the case where the refresh token is also invalid (e.g., logout the user)
            }
        }
        // Return any other errors not related to token expiration
        return Promise.reject(error);
    }
);

const axiosService = {
    get: (url, config = {}) => axiosInstance.get(url, config),
    post: (url, data, config = {}) => axiosInstance.post(url, data, config),
    put: (url, data, config = {}) => axiosInstance.put(url, data, config),
    delete: (url, config = {}) => axiosInstance.delete(url, config),
};

export default axiosService;
