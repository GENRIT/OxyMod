document.getElementById('start-animation').addEventListener('click', () => {
    const head = document.getElementById('head');
    const leftArm = document.getElementById('left-arm');
    const rightArm = document.getElementById('right-arm');
    const nickname = document.getElementById('nickname');
    const nicknameInput = document.getElementById('nickname-input').value;
    const glitchColor = document.getElementById('glitch-color').value;
    
    nickname.textContent = nicknameInput;
    nickname.style.color = glitchColor;

    // Start the fall animation
    head.style.animation = 'fall 1s forwards';
    leftArm.style.animation = 'fall 1s forwards';
    rightArm.style.animation = 'fall 1s forwards';

    // After fall animation, start the bounce and explode animations
    head.addEventListener('animationend', () => {
        head.style.animation = 'bounce 0.5s infinite alternate';
        leftArm.style.animation = 'bounce 0.5s infinite alternate';
        rightArm.style.animation = 'bounce 0.5s infinite alternate';
        
        setTimeout(() => {
            head.style.animation = 'explode 0.5s forwards';
            leftArm.style.animation = 'explode 0.5s forwards';
            rightArm.style.animation = 'explode 0.5s forwards';
            
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
                canvas.width = 64;
                canvas.height = 64;
                context.drawImage(img, 0, 0, 64, 64);

                // Extract and upscale head
                const headCanvas = document.createElement('canvas');
                const headContext = headCanvas.getContext('2d');
                headCanvas.width = 256;
                headCanvas.height = 256;
                headContext.drawImage(canvas, 8, 8, 8, 8, 0, 0, 256, 256);
                document.getElementById('head').style.backgroundImage = `url(${headCanvas.toDataURL()})`;

                // Extract and upscale left arm
                const leftArmCanvas = document.createElement('canvas');
                const leftArmContext = leftArmCanvas.getContext('2d');
                leftArmCanvas.width = 128;
                leftArmCanvas.height = 128;
                leftArmContext.drawImage(canvas, 44, 20, 4, 12, 0, 0, 128, 128);
                document.getElementById('left-arm').style.backgroundImage = `url(${leftArmCanvas.toDataURL()})`;

                // Extract and upscale right arm
                const rightArmCanvas = document.createElement('canvas');
                const rightArmContext = rightArmCanvas.getContext('2d');
                rightArmCanvas.width = 128;
                rightArmCanvas.height = 128;
                rightArmContext.drawImage(canvas, 36, 52, 4, 12, 0, 0, 128, 128);
                document.getElementById('right-arm').style.backgroundImage = `url(${rightArmCanvas.toDataURL()})`;
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

    // Write frames to FFmpeg filesystem
    for (let i = 0; i < frames.length; i++) {
        const dataURL = frames[i].toDataURL('image/png');
        const byteString = atob(dataURL.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(arrayBuffer);
        for (let j = 0; j < byteString.length; j++) {
            uintArray[j] = byteString.charCodeAt(j);
        }
        await ffmpeg.FS('writeFile', `frame${i}.png`, uintArray);
    }

    // Convert frames to video
    await ffmpeg.run('-framerate', '30', '-i', 'frame%d.png', '-pix_fmt', 'yuv420p', 'intro.mp4');

    const data = ffmpeg.FS('readFile', 'intro.mp4');
    const video = document.createElement('a');
    video.href = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    video.download = 'intro.mp4';
    video.click();
});