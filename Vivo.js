    async function getYandexResults(query) {

      const response = await fetch(
        `https://yandex.ru/search?text=${query}`,
        {mode: 'no-cors'}  
      );

      return parseHTML(await response.text());

    }

    function parseHTML(text) {

      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
    
      const items = doc.querySelectorAll('.serp-item');

      return [...items].map(item => {
        return {
          title: item.querySelector('h2 a').text,
          url: item.querySelector('h2 a').href
        }  
      });

    }

  </script>
</head>
<body>

  <input id="query">
  <button onclick="search()">Search</button>

  <div id="results"></div>

  <script>

    async function search() {

      const query = document.getElementById('query').value;
      const results = await getYandexResults(query);

      displayResults(results);

    }

    function displayResults(results) {

      const container = document.getElementById('results');

      results.forEach(result => {

        const item = document.createElement('div');
        // добавить результат

        container.appendChild(item);

      });

    }