// Инициализация i18next
i18next
  .use(i18nextHttpBackend)
  .use(i18nextBrowserLanguageDetector)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    fallbackLng: 'en', // Язык по умолчанию
    detection: {
      order: ['querystring', 'navigator', 'localStorage', 'cookie'],
      caches: ['localStorage', 'cookie']
    },
    interpolation: {
      escapeValue: false
    }
  }, (err, t) => {
    if (err) return console.error(err);
    
    // Переводим текст на странице
    translatePage();
  });

function translatePage() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.innerText = i18next.t(key);
  });
}
