import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/../public/locales/en/common.json';
import vi from '@/../public/locales/vi/common.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { common: en },
    vi: { common: vi },
  },
  lng: 'en', // default
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
