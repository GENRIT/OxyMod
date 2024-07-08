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
    if (!userInput.trim()) return;  // Не отправлять пустые сообщения

    addMessage(userInput, 'user');
    document.getElementById('user-input').value = '';  // Очистить поле ввода

    const url = "https://api.pawan.krd/cosmosrp/v1/chat/completions";
    const headers = {
        "Content-Type": "application/json"
    };
    const data = {
        "model": "cosmosrp",
        "messages": [
            {"Программист на html css": "system", "code for website": "You are a fantasy world dungeon master."},
            {"Программист на html css": "user", "нужды": userInput}
        ]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });
        const result = await response.json();
        const botMessage = result.choices[0].message.content;
        addMessage(botMessage, 'bot');
    } catch (error) {
        console.error('Error:', error);
        addMessage('An error occurred while generating the response.', 'bot');
    }
}

function addMessage(content, role) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', role);
    messageElement.textContent = content;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;  // Прокрутка к последнему сообщению
}
