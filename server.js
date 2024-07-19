const express = require('express');
const proxy = require('express-http-proxy');

const app = express();

app.use(express.json());

app.post('/proxy', (req, res) => {

  proxy.proxyRequest(req, res, {
    target: req.body.url
  });

});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});











const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // Доступ к статическим файлам

app.get('/increment-view', (req, res) => {
    const postName = req.query.post;

    fs.readFile('posts.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading posts.json');
            return;
        }

        const posts = JSON.parse(data);
        const post = posts.find(p => p.link.includes(postName));

        if (post) {
            post.views += 1;
            fs.writeFile('posts.json', JSON.stringify(posts, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error writing posts.json');
                    return;
                }

                res.json({ views: post.views });
            });
        } else {
            res.status(404).send('Post not found');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
