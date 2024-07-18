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
    // Остальные данные из posts.json
];

// Функция для загрузки изображения
async function loadImage(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return createImageBitmap(blob);
}

// Функция для получения основных цветов изображения
async function getMainColors(imageUrl) {
    const img = await loadImage(imageUrl);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 64;
    ctx.drawImage(img, 0, 0, 64, 64);

    const imageData = ctx.getImageData(0, 0, 64, 64);
    const data = imageData.data;

    const pixels = [];
    for (let i = 0; i < data.length; i += 4) {
        pixels.push([data[i], data[i + 1], data[i + 2]]);
    }

    const kmeans = await tf.tidy(() => tf.clusterKMeans(tf.tensor(pixels), 5));
    const centroids = await kmeans.centroids.arraySync();
    return centroids;
}

// Функция для получения разрешения изображения
async function getImageResolution(imageUrl) {
    const img = await loadImage(imageUrl);
    return { width: img.width, height: img.height };
}

// Функция для вычисления расстояния между цветами
function colorDistance(color1, color2) {
    return Math.sqrt(
        Math.pow(color1[0] - color2[0], 2) +
        Math.pow(color1[1] - color2[1], 2) +
        Math.pow(color1[2] - color2[2], 2)
    );
}

// Функция для нахождения похожих постов
async function findSimilarPosts(post, allPosts) {
    const mainColors = await getMainColors(post.image);
    const resolution = await getImageResolution(post.image);

    const similarPosts = [];

    for (const otherPost of allPosts) {
        if (post.link === otherPost.link) continue;

        const otherMainColors = await getMainColors(otherPost.image);
        const otherResolution = await getImageResolution(otherPost.image);

        // Сравнение по цветам
        let colorSimilarity = 0;
        for (let i = 0; i < mainColors.length; i++) {
            colorSimilarity += colorDistance(mainColors[i], otherMainColors[i]);
        }

        // Сравнение по разрешению
        const resolutionSimilarity = Math.abs(
            resolution.width - otherResolution.width
        ) + Math.abs(resolution.height - otherResolution.height);

        // Добавление в список с показателем сходства
        similarPosts.push({ post: otherPost, similarity: colorSimilarity + resolutionSimilarity });
    }

    // Сортировка по показателю сходства и выбор двух наиболее похожих
    similarPosts.sort((a, b) => a.similarity - b.similarity);
    return similarPosts.slice(0, 2).map(item => item.post);
}

// Основная функция для запуска
async function main() {
    const postToRecommend = posts[0]; // Пост, для которого ищем рекомендации
    const similarPosts = await findSimilarPosts(postToRecommend, posts);
    const recommendationsDiv = document.getElementById('recommendations');

    similarPosts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.innerHTML = `<p>${post.title}</p><img src="${post.image}" alt="${post.title}" style="width: 100px;">`;
        recommendationsDiv.appendChild(postDiv);
    });
}

main();
