document.getElementById('start-animation').addEventListener('click', () => {
    const head = document.getElementById('head');
    const nickname = document.getElementById('nickname');
    const nicknameInput = document.getElementById('nickname-input').value;
    const glitchColor = document.getElementById('glitch-color').value;
    
    nickname.textContent = nicknameInput;
    nickname.style.color = glitchColor;

    // Start the fall animation
    head.style.animation = 'fall 1s forwards';

    // After fall animation, start the bounce and explode animations
    head.addEventListener('animationend', () => {
        head.style.animation = 'bounce 0.5s infinite alternate';
        
        setTimeout(() => {
            head.style.animation = 'explode 0.5s forwards';
            
            // After explosion, move nickname into view and start glitch effect
            head.addEventListener('animationend', () => {
                nickname.style.left = '50%';
                nickname.style.transform = 'translateX(-50%)';
                nickname.style.animation = 'glitch 1s infinite';
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
                canvas.width = 256;
                canvas.height = 256;
                context.drawImage(img, -8, -8, 64, 64, 0, 0, 256, 256); // Extract and upscale head
                document.getElementById('head').style.backgroundImage = `url(${canvas.toDataURL()})`;
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Handle video download
document.getElementById('download-video').addEventListener('click', async () => {
    const container = document.getElementById('animation-container');
    const frames = [];
    
    for (let i = 0; i < 120; i++) { // Capture 120 frames (4 seconds at 30 fps)
        const canvas = await html2canvas(container);
        frames.push(canvas);
    }

    const ffmpeg = FFmpeg.createFFmpeg({ log: true });
    await ffmpeg.load();
    
    frames.forEach((canvas, i) => {
        ffmpeg.FS('writeFile', `frame${i}.png`, new Uint8Array(canvas.toDataURL('image/png').split(',')[1].map(c => c.charCodeAt(0))));
    });

    await ffmpeg.run('-framerate', '30', '-i', 'frame%d.png', '-pix_fmt', 'yuv420p', 'intro.mp4');

    const data = ffmpeg.FS('readFile', 'intro.mp4');
    const video = document.createElement('a');
    video.href = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    video.download = 'intro.mp4';
    video.click();
});