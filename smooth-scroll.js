// smooth-scroll.js
document.addEventListener("DOMContentLoaded", function() {
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Функция для переключения меню
    window.toggleMenu = function() {
        const dropdownMenu = document.querySelector('.dropdown-menu');
        if (dropdownMenu.classList.contains('show')) {
            dropdownMenu.classList.remove('show');
            dropdownMenu.classList.add('hide');
            setTimeout(() => {
                dropdownMenu.style.display = 'none';
                dropdownMenu.classList.remove('hide');
            }, 500);
        } else {
            dropdownMenu.style.display = 'block';
            dropdownMenu.classList.add('show');
        }
    };
});
