
import React, { createContext, useContext } from 'react';
import { useConfig } from './ConfigContext.js';

const CONFIG_KEY_USER = 'user';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const { getConfig, setConfig, cleanupConfig } = useConfig();

    const user = getConfig(CONFIG_KEY_USER, null);

    const login = (userData) => {
        setConfig(CONFIG_KEY_USER, userData);
    };

    const logout = () => {
        cleanupConfig();
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
