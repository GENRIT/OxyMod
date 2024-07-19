async function performSearch() {
    const query = document.getElementById('searchQuery').value;
    const proxyUrl = 'https://cors.bridged.cc/';
    const yandexUrl = `https://yandex.ru/search/?text=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(proxyUrl + yandexUrl);
        const text = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        const items = doc.querySelectorAll('.serp-item');
        const results = [];

        items.forEach(item => {
            const titleElement = item.querySelector('a.link');
            if (titleElement) {
                results.push({
                    title: titleElement.innerText,
                    url: titleElement.href
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

        resultsDiv.appendChild(resultItem);
    });
}
