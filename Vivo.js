// Web Search using public API

const SEARCH_API_URL = 'https://api.duckduckgo.com/?format=json&pretty=1&q=';

async function performSearch() {
    const searchQuery = document.getElementById('searchInput').value;
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = 'Searching...';

    try {
        const response = await fetch(`${SEARCH_API_URL}${encodeURIComponent(searchQuery)}`);
        const data = await response.json();

        // Extract and display results
        const results = data.RelatedTopics.slice(0, 10);
        resultsContainer.innerHTML = '';
        
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.className = 'search-result';
            resultElement.innerHTML = `
                <h3><a href="${result.FirstURL}" target="_blank">${result.Text.split(' - ')[0]}</a></h3>
                <p>${result.Text.split(' - ')[1] || ''}</p>
            `;
            resultsContainer.appendChild(resultElement);
        });

        // Add some cool animations
        anime({
            targets: '.search-result',
            translateY: [50, 0],
            opacity: [0, 1],
            delay: anime.stagger(100)
        });

    } catch (error) {
        console.error('Error:', error);
        resultsContainer.innerHTML = 'An error occurred while searching. Please try again.';
    }
}

// Event listeners
document.getElementById('searchButton').addEventListener('click', performSearch);
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

// Cool background animation
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});