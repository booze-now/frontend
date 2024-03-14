const chooseLanguage = () => {
    const lang = (navigator.language || navigator.languages[0]).toLowerCase();

    if (['hu', 'en'].includes(lang)) {
        return lang;
    }

    if (['en-', 'en_'].includes(lang.substring(3))) {
        return lang.substring(2);
    }
    return null;
}
export {chooseLanguage};