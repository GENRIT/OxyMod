// Функция для получения результатов через JSONP
function getYandexResults(query, callback) {

  const url = `https://yandex.ru/search/jsonp?callback=${callback}&text=${query}`;

  // Генерация скрипта
  const script = document.createElement('script');
  script.src = url;

  document.body.appendChild(script);

}

// Обработчик callback 
function handleResults(results) {

  const parsedResults = results.map(result => ({
    title: result.title, 
    url: result.url
  }));

  displayResults(parsedResults.slice(0,10));

}

// Отображение результатов
function displayResults(results) {

  const container = document.getElementById('results');
  container.innerHTML = '';

  results.forEach(result => {

    const item = document.createElement('div');

    const title = document.createElement('a');
    title.href = result.url;
    title.textContent = result.title;

    item.appendChild(title);

    container.appendChild(item);

  });

}

// Инициализация
function init() {

  // Получение запроса
  const query = document.getElementById('query').value;
  
  // Вызов функции для получения результатов
  getYandexResults(query, 'handleResults');

}

// Запуск
init();