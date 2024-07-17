// Массив доступных цветов
let colors = ["Red", "Green", "Blue", "Purple", "Pink", "Orange", "Yellow", "Black", "White"];

// Получаем элемент для рекомендаций
let recommended = document.querySelector(".recommended");

// Проходимся по массиву цветов
colors.forEach(color => {

  // Массив поддерживаемых размеров
  let sizes = [16, 32, 64, 128, 512];  

  // Генерируем рекомендации для каждого размера
  sizes.forEach(size => {

    // Создаем элемент ссылки
    let a = document.createElement('a');  

    // Устанавливаем ссылку
    a.href = `https://oxymod.netlify.app/${color.toLowerCase()}${size}x${color.toLowerCase()}vic`;

    // Добавляем класс
    a.classList.add('image-link');

    // Создаем элемент изображения
    let img = document.createElement('img');

    // Устанавливаем src и alt
    img.src = `https://graph.org/file/texture_pack_${size}x_${color}.jpg`;
    img.alt = `${color} ${size}x Texture Pack`;

    // Добавляем изображение в ссылку  
    a.appendChild(img);

    // Добавляем ссылку в раздел рекомендаций
    recommended.appendChild(a);

  });

});