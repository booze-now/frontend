import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const ApiContext = createContext();

export const useApi = () => useContext(ApiContext);

export const ApiProvider = ({ children }) => {
  const [baseURL, setBaseURL] = useState('http://your-default-api-baseurl.com');

  const api = axios.create({
    baseURL,
  });

  // Function to update the baseURL dynamically
  const updateBaseURL = (newURL) => {
    setBaseURL(newURL);
    api.defaults.baseURL = newURL;
  };

  // Axios request interceptor for token renewal
  api.interceptors.request.use(
    async (config) => {
      // Here you would fetch and attach the token from storage or state
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Axios response interceptor to handle token expiration
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const accessToken = localStorage.getItem('accessToken');

      if (error.response.status === 401 && !originalRequest._retry && accessToken) {
        originalRequest._retry = true;
        // Handle token renewal here, e.g., fetch a new token and set it
        const newToken = 'your_new_access_token';
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

        try {
            // Attempt to refresh the token
            console.log("Érvénytelen token, frissíjük ", `${baseURL}refresh`)
            console.log("lejárt token", accessToken)
            const response = await axios.get(`${baseURL}refresh`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            if (response.status === 200) {
                // Store new token and update the original request
                const token = response.data?.access_token;
                console.log('token #2', token)
                localStorage.setItem('accessToken', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                return api(originalRequest);
            } else {
                localStorage.removeItem('accessToken');
            }
        } catch (e) {
            console.log('Refresh token invalid', e);
            // Handle the case where the refresh token is also invalid (e.g., logout the user)
        }
      }
      return Promise.reject(error);
    }
  );

  const contextValue = {
    get: (url, config = {}) => api.get(url, config),
    post: (url, data, config = {}) => api.post(url, data, config),
    put: (url, data, config = {}) => api.put(url, data, config),
    delete: (url, config = {}) => api.delete(url, config),
    updateBaseURL,
  };

  return <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>;
};
