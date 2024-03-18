import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { useConfig } from './ConfigContext.js';


const ApiContext = createContext();

export const useApi = () => useContext(ApiContext);

export const ApiProvider = ({ children }) => {

  const { realm, getConfig } = useConfig();
  console.log('realm', realm)
  const baseUrl = getConfig('serverURL');

  const api = axios.create({
    baseURL: baseUrl
  });

  // Axios request interceptor for token renewal
  api.interceptors.request.use(
    async (_config) => {
      // Here you would fetch and attach the token from storage or state
      console.log('realm', realm)
      const token = localStorage.getItem('accessToken');
      _config.baseURL = baseUrl;
      if (token) {
        _config.headers.Authorization = `Bearer ${token}`;
      }
      return _config;
    },
    (error) => Promise.reject(error)
  );

  // Axios response interceptor to handle token expiration
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log(error)
      const originalRequest = error.config;
      const accessToken = localStorage.getItem('accessToken');

      if (error.response.status === 401 && !originalRequest._retry && accessToken) {
        originalRequest._retry = true;
        // Handle token renewal here, e.g., fetch a new token and set it
        const newToken = 'your_new_access_token';
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

        try {
          // Attempt to refresh the token
          console.log("Érvénytelen token, frissíjük ", `${baseUrl}refresh`)
          console.log("lejárt token", accessToken)
          const response = await axios.get(`${baseUrl}refresh`, {
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
  };

  return <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>;
};
