async function performSearch() {
    const query = document.getElementById('searchQuery').value;
    const proxyUrl = 'https://cors.bridged.cc/';
    const yandexUrl = `https://yandex.ru/search/?text=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(proxyUrl + yandexUrl);
        const text = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        // Попробуем обновить селекторы
        const items = doc.querySelectorAll('.serp-item');
        const results = [];

        items.forEach(item => {
            const titleElement = item.querySelector('h2 a');
            const snippetElement = item.querySelector('.text-container .text');
            if (titleElement) {
                results.push({
                    title: titleElement.textContent,
                    url: titleElement.href,
                    snippet: snippetElement ? snippetElement.textContent : ''
                });
            }
        });

        displayResults(results.slice(0, 10)); // Возвращаем только первые 10 результатов
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('results').innerText = 'Ошибка при получении результатов';
    }
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';

        const title = document.createElement('a');
        title.href = result.url;
        title.textContent = result.title;
        resultItem.appendChild(title);

        if (result.snippet) {
            const snippet = document.createElement('p');
            snippet.textContent = result.snippet;
            resultItem.appendChild(snippet);
        }

        resultsDiv.appendChild(resultItem);
    });
}
