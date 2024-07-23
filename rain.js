document.addEventListener('DOMContentLoaded', function() {
    const rainContainer = document.createElement('div');
    rainContainer.classList.add('rain-container');
    document.body.appendChild(rainContainer);

    function createRaindrop() {
        const raindrop = document.createElement('div');
        raindrop.classList.add('raindrop');
        raindrop.style.left = Math.random() * window.innerWidth + 'px';
        rainContainer.appendChild(raindrop);

        setTimeout(() => {
            raindrop.remove();
        }, 6000); // Удаляем каплю через 6 секунд
    }

    setInterval(createRaindrop, 100);
});

// Стили для дождя
const style = document.createElement('style');
style.textContent = `
    .rain-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        z-index: -1;
    }

    .raindrop {
        position: absolute;
        bottom: 100%;
        width: 2px;
        height: 15px;
        background: rgba(255, 255, 255, 0.6);
        animation: fall 6s linear infinite;
    }

    @keyframes fall {
        to {
            transform: translateY(100vh);
        }
    }
`;
document.head.appendChild(style);
