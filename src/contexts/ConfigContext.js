import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import config from '../models/config.js';

const ConfigContext = createContext();
const CONFIG_KEY = 'config';


export const ConfigProvider = ({ children }) => {

    const [items, setItems] = useState(() => {
        const localData = localStorage.getItem(CONFIG_KEY);
        return localData ? JSON.parse(localData) : {};
    });

    const realm = useRef(null);

    const applyStaffRealm = () => {
        console.log('Realm', 'staff')
        realm.current = 'staff';
    }

    const applyGuestRealm = () => {
        console.log('Realm', 'guest')
        realm.current = 'guest';
    }

    // const leaveRealm = () => {
    //     setRealm(null);
    // }

    const getConfig = (key, defaultValue = null) => {
        console.log('getConfig', realm, key)
        return items[key]
            ?? config[key]
            ?? (realm.current? config[realm.current][key]:null)
            ?? defaultValue;
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
        setItems({});
    }

    return (
        <ConfigContext.Provider value={{ getConfig, setConfig, toggleConfig, cleanupConfig, realm, applyStaffRealm, applyGuestRealm }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => useContext(ConfigContext);
