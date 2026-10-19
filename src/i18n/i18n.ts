import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './locales/ar.json';
import en from './locales/en.json';

// Derive the initial language from the URL so the very first render
// is already in the right language (a later changeLanguage can land
// before eagerly-mounted components subscribe to i18n events).
const initialLang = window.location.pathname.startsWith('/en') ? 'en' : 'ar';

i18n.use(initReactI18next).init({
  resources: {
    ar: { translation: ar },
    en: { translation: en },
  },
  lng: initialLang,
  fallbackLng: 'ar',
  interpolation: { escapeValue: false },
  returnObjects: true,
});

export default i18n;
