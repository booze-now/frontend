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
    async response => {
        const token = response.data?.access_token;
        if (token) {
            // console.log('token #1', token)
            localStorage.setItem('accessToken', token);
        }
        return response
    },
    async error => {
        const originalRequest = error.config;
        const accessToken = localStorage.getItem('accessToken');

        if (error.response.status === 401 && !originalRequest._retry && accessToken) {
            originalRequest._retry = true;
            // console.log(originalRequest)
            try {
                // Attempt to refresh the token
                // console.log("Érvénytelen token, frissíjük ", `${config.serverUrl}refresh`)
                // console.log("lejárt token", accessToken)
                const response = await axios.get(`${config.serverUrl}refresh`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                if (response.status === 200) {
                    // Store new token and update the original request
                    const token = response.data?.access_token;
                    // console.log('token #2', token)
                    localStorage.setItem('accessToken', token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                } else {
                    localStorage.removeItem('accessToken');
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
