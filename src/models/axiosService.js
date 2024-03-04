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

const axiosService = {
    get: (url, config = {}) => axiosInstance.get(url, config),
    post: (url, data, config = {}) => axiosInstance.post(url, data, config),
    put: (url, data, config = {}) => axiosInstance.put(url, data, config),
    delete: (url, config = {}) => axiosInstance.delete(url, config),
};

export default axiosService;
