document.addEventListener('DOMContentLoaded', () => {
    const menuDots = document.querySelector('.menu-dots');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    menuDots.addEventListener('click', () => {
        dropdownMenu.classList.toggle('show');
    });

    dropdownMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            dropdownMenu.classList.remove('show');
        }
    });

    // Show images with animation
    const image1 = document.getElementById('headerImage1');
    const image2 = document.getElementById('headerImage2');

    image1.addEventListener('animationend', () => {
        image2.style.opacity = '1';
    });
});
