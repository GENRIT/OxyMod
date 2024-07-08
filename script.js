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



async function getResponse() {
    const userInput = document.getElementById('user-input').value;

    const url = "https://api.pawan.krd/cosmosrp/v1/chat/completions";
    const headers = {
        "Content-Type": "application/json"
    };
    const data = {
        "model": "cosmosrp",
        "messages": [
            {"role": "system", "content": "You are a fantasy world dungeon master."},
            {"role": "user", "content": userInput}
        ]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });
        const result = await response.json();
        document.getElementById('response-output').value = result.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error);
    }
}
