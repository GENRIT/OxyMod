async function searchEcosia(query) {

  const response = await fetch(
    `https://www.ecosia.org/search?q=${query}`, 
    {mode: 'no-cors'}
  );

  const html = await response.text();

  const results = parseResults(html);

  return results;

}

function parseResults(html) {

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const items = doc.querySelectorAll('.result');

  return [...items].slice(0,10).map(item => {

    const title = item.querySelector('h3').textContent;
    const url = item.querySelector('h3 a').href;

    return {
      title,
      url
    }

  });

}

async function displayResults() {

  // Get query
  const query = document.querySelector('input').value;

  // Search
  const results = await searchEcosia(query);

  // Display results
  results.forEach(result => {

    const a = document.createElement('a');
    a.href = result.url;
    a.text = result.title;
    a.target = '_blank';

    document.body.appendChild(a);

  });

}

// Attach to button click
document.querySelector('button').onclick = displayResults;