import React, { createContext, useContext, useEffect, useState } from 'react';
import config from '../models/config.js';

const ConfigContext = createContext();
const CONFIG_KEY = 'config';

export const ConfigProvider = ({ children }) => {

    const [items, setItems] = useState(() => {
        const localData = localStorage.getItem(CONFIG_KEY);
        return localData ? JSON.parse(localData) : config;
    });

    const getConfig = (key, defaultValue = null) => {
        console.log('getConfig', key)
        return items[key] ?? defaultValue;
    }

    const setConfig = (key, newValue) => {
        setItems({ ...items, [key]: newValue });
    }

    console.log('config', items);

    useEffect(() => {
        localStorage.setItem(CONFIG_KEY, JSON.stringify(items));
    }, [items]);

    const toggleConfig = (key) => {
        const value = !(items[key] ?? false)
        console.log('toggle', key, value);
        setConfig(key, value);
    }

    const cleanupConfig = () => {
        localStorage.removeItem(CONFIG_KEY);
        setItems(config);
    }

    return (
        <ConfigContext.Provider value={{ getConfig, setConfig, toggleConfig, cleanupConfig }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => useContext(ConfigContext);
