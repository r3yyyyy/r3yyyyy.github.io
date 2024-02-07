const canvas = document.getElementById('constellationCanvas');
const ctx = canvas.getContext('2d');

let problems = [];
let currentProblemIndex = 0;
let mistakes = 0;
let constellationsDrawn = 0;
let stars = [];

// Функция для получения случайного целого числа в заданном диапазоне
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Генерация 7 случайных примеров
for (let i = 0; i < 7; i++) {
    const num1 = getRandomInt(1, 20);
    const num2 = getRandomInt(1, 20);

    let operator;
    if (num1 > num2) {
        operator = '>';
    } else if (num1 < num2) {
        operator = '<';
    } else {
        operator = '=';
    }

    let correctAnswer;
    if (operator === '>') {
        correctAnswer = true;
    } else if (operator === '<') {
        correctAnswer = false;
    } else {
        correctAnswer = Math.random() < 0.5;
    }

    problems.push({ num1, num2, operator, correctAnswer });
}

// Функция для отображения примера
function displayProblem() {
    const num1Container = document.getElementById('num1-container');
    const num2Container = document.getElementById('num2-container');
    num1Container.innerText = problems[currentProblemIndex].num1;
    num2Container.innerText = problems[currentProblemIndex].num2;
}

// Функция для проверки ответа
function checkAnswer(userAnswer) {
    const currentProblem = problems[currentProblemIndex];
    if ((userAnswer === '>' && currentProblem.num1 > currentProblem.num2) ||
        (userAnswer === '<' && currentProblem.num1 < currentProblem.num2) ||
        (userAnswer === '=' && currentProblem.num1 === currentProblem.num2)) {
        currentProblemIndex++;

        // Увеличиваем счетчик нарисованных созвездий
        constellationsDrawn++;

        if (currentProblemIndex < problems.length) {
            displayProblem();
        } else {
            showResults();
        }

        // Вызываем функцию отрисовки созвездий
        drawConstellations();
        document.getElementById('correctSound').play();;
    } else {
        // Массив с репликами
        const notifications = [
            'О нет, звезда не хочет проявлять себя. Попробуй другую!',
            'Звезда стесняется и решает остаться в тени. Попробуй другую!',
            'Увы, звезда пока не готова сверкнуть. Попробуй еще раз.'
        ];
        // Выбор случайной реплики из массива
        const randomIndex = Math.floor(Math.random() * notifications.length);
        const randomNotification = notifications[randomIndex];
        // Отображение уведомления
        showNotification(randomNotification);
        mistakes++;
        if (mistakes === 3) {
            showResults();
        }
        document.getElementById('incorrectSound').play();
    }
}

// Функция для отображения уведомления
function showNotification(message) {
    const messageContainer = document.querySelector('.message-container');
    const messageElement = document.getElementById('message');
    messageElement.innerText = message;
    messageContainer.style.display = 'block';
    setTimeout(() => {
        messageContainer.style.display = 'none';
    }, 2000);
}


const starNames = [
    'Сириус',
    'Альдебаран',
    'Вега',
    'Антарес',
    'Арктур',
    'Лунный Свет',
    'Алмазная Пыль',
    'Золотая Вспышка',
    'Сиреневый Бриллиант',
    'Танцующий Астероид',
    'Невидимый Лунный Перелив',
    'Мистическая Галактика',
    'Изумрудная Звезда',
    'Розовый Космос',
    'Гипнотизирующий Небесный Камень',
    'Летучая Радуга',
    'Мерцающая Черная Дыра',
    'Звездопад Сапфиров',
    'Черепашья Галактика',
    'Звездная Стрекоза',
    'Феерический Космос',
    'Сверкающий Созвездий',
    'Спиральная Вихревая Звезда',
    'Галактическая Симфония',
    'Туманный Небесный Хоровод',
    'Радужный Космос',
    'Сумеречный Странник',
    'Созвездие Вечной Весны',
    'Магический Стеллариум',
    'Огненная Звезда'
];

function getRandomStarName() {
    const randomIndex = Math.floor(Math.random() * starNames.length);
    return starNames[randomIndex];
}



// Функция для отображения результатов
function showResults() {
    const resultsContainer = document.getElementById('results');
    resultsContainer.style.display = 'block';
    const resultMessage = document.createElement('p');

    if (constellationsDrawn === 7) {
        const randomStarName = getRandomStarName();
        resultMessage.innerText = `Ура! Все созвездия зажглись! Твоя звезда: ${randomStarName}`;
    } else {
        resultMessage.innerText = 'Не все созвездия зажглись. Попробуй заново.';
    }

    resultsContainer.appendChild(resultMessage);
    const restartButton = document.createElement('button');
    restartButton.innerText = 'Заново';
    restartButton.addEventListener('click', () => {
        document.location.reload();
    });

    const levelsButton = document.createElement('button');
    levelsButton.innerText = 'Вернуться к уровням';
    levelsButton.addEventListener('click', () => {
        window.location.href = 'levels.html';
    });

    resultsContainer.appendChild(restartButton);
    resultsContainer.appendChild(levelsButton);
}

// Функция для отрисовки созвездий
function drawConstellations() {
    const constellationCanvas = document.getElementById('constellationCanvas');
    const ctx = constellationCanvas.getContext('2d');

    // Проверяем, нужно ли нарисовать новое созвездие
    if (constellationsDrawn <= 7) {
        // Генерируем новую звезду
        const star = generateRandomStar();
        stars.push(star);
        drawStar(star.x, star.y);

        // После второго правильного ответа рисуем линию к предыдущей звезде
        if (constellationsDrawn > 1) {
            const previousStar = stars[constellationsDrawn - 2];
            drawLine(previousStar.x, previousStar.y, star.x, star.y);
        }
    }
}

// Функция для отрисовки звезды
function drawStar(x, y) {
    ctx.imageSmoothingEnabled = false;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.closePath();
}
// Функция для отрисовки линии между звездами
function drawLine(x1, y1, x2, y2) {
    ctx.imageSmoothingEnabled = false;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = 'white';
    ctx.stroke();
    ctx.closePath();
}

// Функция для генерации случайной звезды
function generateRandomStar() {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const x = getRandomInt(20, canvasWidth - 20);
    const y = getRandomInt(20, canvasHeight - 20);
    return { x, y };
}

// Инициализация игры
function initializeGame() {
    // Отключение анти-алиасинга для линий
    ctx.imageSmoothingEnabled = false;
    displayProblem();
}

// Вызов функции инициализации при загрузке страницы
window.onload = initializeGame;
