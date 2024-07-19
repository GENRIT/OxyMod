// Ecosia Web Scraping and Surfing

// CORS Anywhere proxy URL (replace with your own proxy if needed)
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

// Ecosia search URL
const ECOSIA_SEARCH_URL = 'https://www.ecosia.org/search?q=';

// Function to perform the search and display results
async function performSearch() {
    const searchQuery = document.getElementById('searchInput').value;
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = 'Searching...';

    try {
        const response = await fetch(`${CORS_PROXY}${ECOSIA_SEARCH_URL}${encodeURIComponent(searchQuery)}`);
        const html = await response.text();

        // Parse the HTML content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Extract search results
        const searchResults = doc.querySelectorAll('.result-body');
        const results = Array.from(searchResults).slice(0, 10).map(result => {
            const titleElement = result.querySelector('.result-title');
            const linkElement = result.querySelector('.result-url');
            return {
                title: titleElement ? titleElement.textContent : 'No title',
                url: linkElement ? linkElement.href : '#'
            };
        });

        // Display results
        resultsContainer.innerHTML = '';
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.className = 'search-result';
            resultElement.innerHTML = `
                <h3><a href="${result.url}" target="_blank">${result.title}</a></h3>
                <p>${result.url}</p>
            `;
            resultsContainer.appendChild(resultElement);
        });
    } catch (error) {
        console.error('Error:', error);
        resultsContainer.innerHTML = 'An error occurred while searching. Please try again.';
    }
}

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', performSearch);

// Event listener for the Enter key in the search input
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});