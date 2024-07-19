async function getYandexResults(query) {

  const proxyUrl = 'https://cors.sh/';
  const yandexUrl = `https://yandex.ru/search/?text=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(proxyUrl + yandexUrl, {
      headers: {
        'x-cors-api-key': 'YOUR_API_KEY'  
      }
    });

    const html = await response.text();

    // Parse HTML and extract results

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const items = doc.querySelectorAll('.serp-item');

    return [...items].slice(0,10).map(item => {
      return {
        title: item.querySelector('h2 a').textContent,
        url: item.querySelector('h2 a').href  
      }
    });

  } catch(err) {
    console.error(err);
  }

}

// Usage
const results = await getYandexResults('query');