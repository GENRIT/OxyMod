async function fetchViaProxy(url) {

  const proxyUrl = 'http://localhost:3000/proxy';

  const response = await fetch(proxyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({url})
  });

  return await response.json();

}

async function getYandexResults(query) {

  const results = await fetchViaProxy(
    `https://yandex.ru/search?text=${query}`
  );

  return results.map(result => ({
    title: result.title,
    url: result.url  
  }));

}

async function displayResults() {

  const query = document.querySelector('input').value;

  const results = await getYandexResults(query);

  // отрисовка results...

}

document.querySelector('button').addEventListener('click', displayResults);