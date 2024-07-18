// Пример данных posts.json
const posts = [
    {
        "image": "https://graph.org/file/e9276b0fd82eb5075b878.jpg",
        "link": "Core16xRedPost.html",
        "avatar": "https://graph.org/file/0a0634d2613432450c901.jpg",
        "author": "clayni",
        "type": "Texture Pack",
        "title": "Core 16x [Red]",
        "views": 500
    },
    {
        "image": "https://graph.org/file/3e7a1ec81295f4004759e.jpg",
        "link": "Core16xPurplePost.html",
        "avatar": "https://graph.org/file/0a0634d2613432450c901.jpg",
        "author": "clayni",
        "type": "Texture Pack",
        "title": "Core 16x [Purple]",
        "views": 400
    },
    {
        "image": "https://graph.org/file/76d7325ee73bc48ee559d.jpg",
        "link": "Decker16xBluePost.html",
        "avatar": "https://graph.org/file/0a0634d2613432450c901.jpg",
        "author": "clayni",
        "type": "Texture Pack",
        "title": "Decker 16x [Blue]",
        "views": 300
    },
    {
        "image": "https://graph.org/file/411eb46cdde67963355ef.jpg",
        "link": "https://oxymod.netlify.app/fy16xpinkpost",
        "avatar": "https://graph.org/file/0a0634d2613432450c901.jpg",
        "author": "clayni",
        "type": "Texture Pack",
        "title": "Fy 16x [Purple]",
        "views": 11000
    },
    {
       "image": "https://graph.org/file/ebf8a842d93d12b5f8b10.jpg",
        "link": "https://oxymod.netlify.app/rod16xbluepost",
        "avatar": "https://graph.org/file/0a0634d2613432450c901.jpg",
        "author": "clayni",
        "type": "Texture Pack",
        "title": "Rod 16x [Blue]",
        "views": 14333
    },
    {
       "image": "https://graph.org/file/6e2d7ad68c64f3ab6fff3.jpg",
        "link": "https://oxymod.netlify.app/kotori16xredpost",
        "avatar": "https://graph.org/file/0a0634d2613432450c901.jpg",
        "author": "clayni",
        "type": "Texture Pack",
        "title": "Kotori 16x [Red]",
        "views": 12433
    },
    {
       "image": "https://graph.org/file/14f3183591e8d14a17e99.jpg",
        "link": "https://oxymod.netlify.app/chika32xpinkpost",
        "avatar": "https://graph.org/file/0a0634d2613432450c901.jpg",
        "author": "clayni",
        "type": "Texture Pack",
        "title": "CHIKA 16x [Pink]",
        "views": 13433
    },
    {
        "image": "https://graph.org/file/c7ff0123bce14337feb0d.jpg",
        "link": "https://oxymod.netlify.app/sexynut32xblackpost",
        "avatar": "https://graph.org/file/0a0634d2613432450c901.jpg",
        "author": "clayni",
        "type": "Texture Pack",
        "title": "SexyNut 32x [Black]",
        "views": 12000
    },
    {
        "image": "https://graph.org/file/7526e2ac7034a038afdab.jpg",
        "link": "https://oxymod.netlify.app/uny16xpinkpost",
        "avatar": "https://graph.org/file/0a0634d2613432450c901.jpg",
        "author": "clayni",
        "type": "Texture Pack",
        "title": "Uny 16x [Pink]",
        "views": 12201
    },
    {
        "image": "https://graph.org/file/8bc285355aee6e8136bbd.jpg",
        "link": "https://oxymod.netlify.app/july16xredpost",
        "avatar": "https://graph.org/file/0a0634d2613432450c901.jpg",
        "author": "clayni",
        "type": "Texture Pack",
        "title": "July 16x [Red]",
        "views": 12200
    },
    {
        "image": "https://graph.org/file/522df164a26a5390e1266.jpg",
        "link": "ICE16xRedPost.html",
        "avatar": "https://graph.org/file/0a0634d2613432450c901.jpg",
        "author": "clayni",
        "type": "Texture Pack",
        "title": "ICE 16x [Red]",
        "views": 560
    },
    {
        "image": "https://graph.org/file/e2cff71c9a4ffd27c1a09.jpg",
        "link": "Yumeno32xWhitePost.html",
        "avatar": "https://graph.org/file/0a0634d2613432450c901.jpg",
        "author": "clayni",
        "type": "Texture Pack",
        "title": "Yumeno 32x [White]",
        "views": 566
    }
];

// Функция для извлечения разрешения и цвета из заголовка
function extractResolutionAndColor(title) {
    const resolutionMatch = title.match(/\d+x/);
    const colorMatch = title.match(/\[(.*?)\]/);

    const resolution = resolutionMatch ? resolutionMatch[0] : null;
    const color = colorMatch ? colorMatch[1] : null;

    return { resolution, color };
}

// Функция для нахождения похожих постов
function findSimilarPosts(post, allPosts) {
    const { resolution: targetResolution, color: targetColor } = extractResolutionAndColor(post.title);
    const similarPosts = [];

    for (const otherPost of allPosts) {
        if (post.link === otherPost.link) continue;

        const { resolution, color } = extractResolutionAndColor(otherPost.title);

        let score = 0;
        if (resolution === targetResolution) score += 1;
        if (color === targetColor) score += 1;

        if (score > 0) {
            similarPosts.push({ post: otherPost, score });
        }
    }

    similarPosts.sort((a, b) => b.score - a.score);
    return similarPosts.slice(0, 2).map(item => item.post);
}

// Основная функция для запуска
function main() {
    const postToRecommend = posts[5]; // Выберите пост, для которого хотите рекомендации
    const similarPosts = findSimilarPosts(postToRecommend, posts);

    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = '';

    similarPosts.forEach(similarPost => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
            <h2>${similarPost.title}</h2>
            <p>Author: ${similarPost.author}</p>
            <p>Type: ${similarPost.type}</p>
            <p>Views: ${similarPost.views}</p>
            <a href="${similarPost.link}">View Post</a>
        `;
        recommendationsDiv.appendChild(postElement);
    });
}

main();
