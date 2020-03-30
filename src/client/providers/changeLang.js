import i18n from '../i18n';

const SUPPORTED_LANGS = ['fr', 'en', 'es'];

const changeLang = (url) => {
  const index = url.indexOf('lang=');
  const lang = url.substr(index + 5, 2);
  if (SUPPORTED_LANGS.indexOf(lang) !== -1) i18n.changeLanguage(lang);
};

export default changeLang;
