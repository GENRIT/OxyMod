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
