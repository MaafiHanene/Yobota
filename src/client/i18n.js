import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import commonEn from './translations/en/common.json';
import commonEs from './translations/es/common.json';
import commonFr from './translations/fr/common.json';
import apiEn from './translations/en/api.json';
import apiEs from './translations/es/api.json';
import apiFr from './translations/fr/api.json';

i18n
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false },
    lng: 'en',
    resources: { // make this more digestible
      en: {
        common: commonEn,
        api: apiEn,
      },
      es: {
        common: commonEs,
        api: apiEs,
      },
      fr: {
        common: commonFr,
        api: apiFr,
      },
    },
  });

export default i18n;
