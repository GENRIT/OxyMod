const posts = [
    {
        "image": "https://graph.org/file/e9276b0fd82eb5075b878.jpg",
        "link": "Core16xRedPost.html",
        "title": "Core 16x [Red]"
    },
    {
        "image": "https://graph.org/file/cc1047ed477bde4e137e9.jpg",
        "link": "https://oxymod.netlify.app/rod16xredpost",
        "title": "Rod 16x [Red]"
    },
    {
        "image": "https://graph.org/file/f3ee1621e73d6eb63a7cc.jpg",
        "link": "https://oxymod.netlify.app/uny16xgreenpost",
        "title": "Uny 16x [Green]"
    },
    {
        "image": "https://graph.org/file/8263980d2d68e37d60637.jpg",
        "link": "https://oxymod.netlify.app/trump16xredpost",
        "title": "Trump 16x [Red]"
    },
    {
        "image": "https://graph.org/file/4b12f26c9cc8baec77cf8.jpg",
        "link": "https://oxymod.netlify.app/redi32xbluepost",
        "title": "Redi 32x [Blue]"
    },
    {
        "image": "https://graph.org/file/861c5fb88724006f3a7d0.jpg",
        "link": "https://oxymod.netlify.app/redi32xredpost",
        "title": "Redi 32x [Red]"
    },
    {
        "image": "https://graph.org/file/3e7a1ec81295f4004759e.jpg",
        "link": "Core16xPurplePost.html",
        "title": "Core 16x [Purple]"
    },
    {
        "image": "https://graph.org/file/76d7325ee73bc48ee559d.jpg",
        "link": "Decker16xBluePost.html",
        "title": "Decker 16x [Blue]"
    },
    {
        "image": "https://graph.org/file/411eb46cdde67963355ef.jpg",
        "link": "https://oxymod.netlify.app/fy16xpinkpost",
        "title": "Fy 16x [Purple]"
    },
    {
        "image": "https://graph.org/file/ebf8a842d93d12b5f8b10.jpg",
        "link": "https://oxymod.netlify.app/rod16xbluepost",
        "title": "Rod 16x [Blue]"
    },
    {
        "image": "https://graph.org/file/6e2d7ad68c64f3ab6fff3.jpg",
        "link": "https://oxymod.netlify.app/kotori16xredpost",
        "title": "Kotori 16x [Red]"
    },
    {
        "image": "https://graph.org/file/14f3183591e8d14a17e99.jpg",
        "link": "https://oxymod.netlify.app/chika32xpinkpost",
        "title": "CHIKA 16x [Pink]"
    },
    {
        "image": "https://graph.org/file/c7ff0123bce14337feb0d.jpg",
        "link": "https://oxymod.netlify.app/sexynut32xblackpost",
        "title": "SexyNut 32x [Black]"
    },
    {
        "image": "https://graph.org/file/7526e2ac7034a038afdab.jpg",
        "link": "https://oxymod.netlify.app/uny16xpinkpost",
        "title": "Uny 16x [Pink]"
    },
    {
        "image": "https://graph.org/file/8bc285355aee6e8136bbd.jpg",
        "link": "https://oxymod.netlify.app/july16xredpost",
        "title": "July 16x [Red]"
    },
    {
        "image": "https://graph.org/file/522df164a26a5390e1266.jpg",
        "link": "ICE16xRedPost.html",
        "title": "ICE 16x [Red]"
    },
    {
        "image": "https://graph.org/file/e2cff71c9a4ffd27c1a09.jpg",
        "link": "Yumeno32xWhitePost.html",
        "title": "Yumeno 32x [White]"
    }
];

function findSimilarPosts(targetPost, allPosts) {
    const targetTitle = targetPost.title;
    const targetColor = targetTitle.match(/\[(.*?)\]/)[1].toLowerCase();
    const targetPixel = targetTitle.match(/(\d+x)/)[0];
    
    return allPosts
        .filter(post => {
            const postColor = post.title.match(/\[(.*?)\]/)[1].toLowerCase();
            const postPixel = post.title.match(/(\d+x)/)[0];
            return post !== targetPost && postColor === targetColor && postPixel === targetPixel;
        })
        .slice(0, 2);
}

function main() {
    const currentPageTitle = document.title;
    const postToRecommend = posts.find(post => post.title === currentPageTitle);
    
    if (!postToRecommend) {
        console.error('Post not found for the current page title:', currentPageTitle);
        return;
    }

    const similarPosts = findSimilarPosts(postToRecommend, posts);

    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = '';

    if (similarPosts.length === 0) {
        console.log('No similar posts found.');
        return;
    }

    similarPosts.forEach(similarPost => {
        const postElement = document.createElement('div');
        postElement.className = 'recommendation';
        postElement.innerHTML = `
            <a href="${similarPost.link}">
                <img src="${similarPost.image}" alt="${similarPost.title}">
                <h2>${similarPost.title}</h2>
            </a>
        `;
        recommendationsDiv.appendChild(postElement);
    });
}

document.addEventListener("DOMContentLoaded", main);






document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('particle-container');
    const particleCount = 100; // Number of particles
    const particleSize = 8; // Size of particles (width and height)

    // Function to create particles at a specific position
    function createParticles(x, y) {
        for (let i = 0; i < particleCount; i++) {
            createParticle(container, x, y, particleSize);
        }
    }

    // Function to create a single particle
    function createParticle(container, x, y, size) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Set initial position
        particle.style.left = `${x - size / 2}px`;
        particle.style.top = `${y - size / 2}px`;

        // Append particle to the container
        container.appendChild(particle);

        // Trigger animation
        requestAnimationFrame(() => {
            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * 50 + 10;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;

            particle.style.transform = `translate(${dx}px, ${dy}px)`;
            particle.style.opacity = 0;

            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, 2000);
        });
    }

    // Add event listener for click events
    document.addEventListener('click', (event) => {
        const x = event.clientX;
        const y = event.clientY;
        createParticles(x, y);
    });
});
