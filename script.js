document.addEventListener('DOMContentLoaded', (event) => {
    const image = document.getElementById('animatedImage');

    image.addEventListener('click', () => {
        // Disappear animation
        image.style.animation = 'disappear 1s forwards';
        
        // Wait 1 second then return the image to its original position
        setTimeout(() => {
            image.style.animation = 'none';
            void image.offsetWidth; // Trigger reflow to restart the animation
            image.style.animation = 'appear 1s forwards';
        }, 1000);
    });
});

window.addEventListener('load', () => {
    const bottomBar = document.querySelector('.bottom-bar');
    setTimeout(() => {
        bottomBar.style.opacity = '1';
        bottomBar.style.transform = 'translateY(0)';
    }, 500);
});
