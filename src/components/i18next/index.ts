import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from '../../constant/locales/en.json';
// import plTranslation from '../../constant/locales/pl.json';
// import ptTranslation from '../../constant/locales/pt.json';


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      // pl: {
      //   translation: plTranslation,
      // },
      // pt:{
      //     translation: ptTranslation,
      // }
    },
    fallbackLng: 'en',
    debug: true,
  });

export default i18n;
