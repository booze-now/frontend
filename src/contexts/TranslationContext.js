import React, { createContext, useContext } from 'react';
import { useConfig } from './ConfigContext.js';

const CONFIG_KEY_LANGUAGE = 'language'
const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
    //const [language, setLanguage] = useState('en');
    const {getConfig, setConfig} = useConfig();
    const language = getConfig(CONFIG_KEY_LANGUAGE, 'en');

    const languages = {
        "en": {name: "English", code: "gb"},
        "hu": {name: "Hungarian", code: "hu"}
    }

    const translations = {
        'hu': {
            'Context API Sample app with user, translation, and theme handling': 'Context API példa alkalmazás felhasználó-, fordítás és témakezeléssel',
            'Welcome :name!': 'Üdvözöllek, :name!',
            'Please log in.': 'Kérlek jelentkezz be.',
            'Login': 'Belépés',
            'Logout': 'Kilépés',
            'Change language to :lang': 'Váltás :lang nyelvre',
            'Toggle Theme': 'Téma váltása',
            'English': 'angol',
            'Hungarian': 'magyar',
            'Dashboard': 'Kezelőpult',
            'Log in': 'Belépés',
            'Register': 'Regisztrálás',
            'Email': 'Email',
            'Password': 'Jelszó',
            'You have already logged in.': 'Már bejelentkeztél.',
            'Search for...': 'Keresés...',
            'Password': 'Jelszó',
        }
    };

    function changeLanguage(newLang) {
        if (newLang === "en" || translations[newLang]) {
            setConfig(CONFIG_KEY_LANGUAGE, newLang);
        }
    }

    function __(text, replace = {}) {
        if (language !== 'en') {
            text = translations[language][text] ?? text
            // if (!translations[language][text]) {
            //     console.warn(`No translation for: "${text}"`)
            // }
        }
        if (replace) {
            return Object.keys(replace).reduce((carry, current) => carry.replace(new RegExp(`:${current}\\b`, 'g'), replace[current]), text);
        } else {
            return text;
        }
    }

    return (
        <TranslationContext.Provider value={{ language, languages, __, changeLanguage }}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslation = () => useContext(TranslationContext);
