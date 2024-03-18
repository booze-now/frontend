import React, { createContext, useContext, useEffect, useState } from 'react';
import config from '../models/config.js';

const ConfigContext = createContext();
const CONFIG_KEYS = {
    'guest': 'config',
    'staff': 'config-staff'
};

export const ConfigProvider = ({ children }) => {

    const [realm, setRealm] = useState(null);

    const configKey = CONFIG_KEYS[realm] ?? '';
    console.log('configKey', configKey)

    const [items, setItems] = useState(() => {
        // LOAD
        let items = {};
        Object.keys(CONFIG_KEYS).forEach((key) => {
            const lsKey = CONFIG_KEYS[key];
            const lsItems = localStorage.getItem(lsKey);
            if (lsItems != null) {
                items[key] = JSON.parse(lsItems)
            }
        });
        console.log('items', items)
        return items ?? {};
    });

    console.log('items', items)

    const applyStaffRealm = () => {
        console.log('applyRealm', 'staff')
        setRealm('staff')
    }

    const applyGuestRealm = () => {
        console.log('applyRealm', 'guest')
        setRealm('guest')
    }


    const getConfig = (key, defaultValue = null) => {
        const ret = (realm ? (items.hasOwnProperty(realm) ? (items[realm][key] ?? null) : null) : null)
            ?? (realm ? (config.hasOwnProperty(realm) ? (config[realm][key] ?? null) : null) : null)
            ?? defaultValue;

        if (!realm) {
            console.warn('getConfig: no realm', key, ret)
        // } else {
        //     console.log('getConfig', realm, key, ret)
        }
        return ret;
    }

    const setConfig = (key, newValue) => {
        let newItems = { ...items };

        if (realm) {
            if (!newItems.hasOwnProperty(realm)) {
                newItems[realm] = {};
            }
            newItems[realm][key] = newValue;
            // console.log('setConfig', newItems);
        } else {
            console.warn('setConfig: no realm', key, newValue);
        }
        setItems(newItems);
    }

    useEffect(() => {
        console.log('saving to localStorage', items);
        Object.keys(CONFIG_KEYS).forEach((key) => {
            const lsKey = CONFIG_KEYS[key];
            const lsItems = items[key];
            if (lsItems != null) {
                console.log("writing", lsKey, lsItems);
                localStorage.setItem(lsKey, JSON.stringify(lsItems));
            } else {
                localStorage.removeItem(lsKey);
                console.log("writing?", key, items);
            }
        });
    }, [configKey, items]);

    const toggleConfig = (key) => {
        const value = !getConfig(key)
        console.log('toggle', key, value);
        setConfig(key, value);
    }

    const cleanupConfig = () => {
        let newItems = { ...items }
        delete newItems[realm]
        console.log('cleanup #3', newItems)
        setItems(newItems);
        console.log('cleanup', realm, configKey)
    }

    const runMode = () => {
        return 'DEV';
    }
    return (
        <ConfigContext.Provider value={{ getConfig, setConfig, toggleConfig, cleanupConfig, realm, applyStaffRealm, applyGuestRealm, runMode }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => useContext(ConfigContext);
