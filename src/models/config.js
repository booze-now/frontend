/**
 * Alapbeállítások
 */

import { chooseLanguage } from "./MiscHelper.js";

const baseURL = 'http://localhost:8000/api/';

const config = {
    lang: chooseLanguage() ?? 'hu',
    baseURL: baseURL,
    user: null,
    guest: {
        serverUrl: baseURL + 'guest/', // a záró / jel kell a végére
        theme: 0, // 0 sötét, 1 világos
    },
    staff: {
        serverUrl: baseURL + 'staff/', // a záró / jel kell a végére
        sidebarOpened: true,
        theme: 1, // 0 sötét, 1 világos
    }
};

export default config;