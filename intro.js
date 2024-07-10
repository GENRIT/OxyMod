document.getElementById('start-animation').addEventListener('click', () => {
    const head = document.getElementById('head');
    const nickname = document.getElementById('nickname');
    const nicknameInput = document.getElementById('nickname-input').value;
    
    nickname.textContent = nicknameInput;

    // Start the fall animation
    head.style.animation = 'fall 1s forwards';

    // After fall animation, start the bounce and explode animations
    head.addEventListener('animationend', () => {
        head.style.animation = 'bounce 0.5s infinite alternate';
        
        setTimeout(() => {
            head.style.animation = 'explode 0.5s forwards';
            
            // After explosion, move nickname into view
            head.addEventListener('animationend', () => {
                nickname.style.left = '50%';
                nickname.style.transform = 'translateX(-50%)';
            });
        }, 1000);
    });
});

// Handle skin upload
document.getElementById('skin-upload').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = 8;
                canvas.height = 8;
                context.drawImage(img, -8, -8);
                document.getElementById('head').style.backgroundImage = `url(${canvas.toDataURL()})`;
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});