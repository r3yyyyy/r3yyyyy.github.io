// Функция для получения случайных целых чисел в заданном диапазоне
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для выбора 5 случайных примеров из массива problems
function getRandomProblems() {
    const selectedProblems = [];
    const allProblems = [
        { expression: '1 + 1', correctAnswer: '2', options: ['4', '0', '2'] },
        { expression: '2 + 3', correctAnswer: '5', options: ['6', '5', '8'] },
        { expression: '1 + 5', correctAnswer: '6', options: ['6', '4', '2'] },
        { expression: '6 + 7', correctAnswer: '13', options: ['12', '13', '10'] },
        { expression: '2 + 9', correctAnswer: '11', options: ['9', '10', '11'] },
        { expression: '5 + 8', correctAnswer: '13', options: ['15', '14', '13'] },
        { expression: '8 + 4', correctAnswer: '12', options: ['12', '11', '14'] },
        { expression: '9 + 7', correctAnswer: '16', options: ['18', '16', '21'] },
        { expression: '3 + 6', correctAnswer: '9', options: ['9', '8', '11'] },
        { expression: '9 - 2', correctAnswer: '7', options: ['7', '4', '12'] },
        { expression: '7 - 5', correctAnswer: '2', options: ['2', '4', '3'] },
        { expression: '8 - 6', correctAnswer: '2', options: ['3', '4', '2'] },
        { expression: '7 - 3', correctAnswer: '4', options: ['4', '10', '3'] },
        { expression: '6 - 1', correctAnswer: '5', options: ['7', '5', '6'] },
        { expression: '9 - 4', correctAnswer: '5', options: ['5', '2', '7'] },
        { expression: '4 - 2', correctAnswer: '2', options: ['3', '1', '2'] },
    ];

    while (selectedProblems.length < 5) {
        const randomIndex = getRandomInt(0, allProblems.length - 1);
        const randomProblem = allProblems.splice(randomIndex, 1)[0];
        selectedProblems.push(randomProblem);
    }

    return selectedProblems;
}

const problems = [
    { expression: '1 + 1', correctAnswer: '2', options: ['4', '0', '2'] },
    { expression: '2 + 3', correctAnswer: '5', options: ['6', '5', '8'] },
    { expression: '1 + 5', correctAnswer: '6', options: ['6', '4', '2'] },
    { expression: '6 + 7', correctAnswer: '13', options: ['12', '13', '10'] },
    { expression: '2 + 9', correctAnswer: '11', options: ['9', '10', '11'] },
    { expression: '5 + 8', correctAnswer: '13', options: ['15', '14', '13'] },
    { expression: '8 + 4', correctAnswer: '12', options: ['12', '11', '14'] },
    { expression: '9 + 7', correctAnswer: '16', options: ['18', '16', '21'] },
    { expression: '3 + 6', correctAnswer: '9', options: ['9', '8', '11'] },
    { expression: '9 - 2', correctAnswer: '7', options: ['7', '4', '12'] },
    { expression: '7 - 5', correctAnswer: '2', options: ['2', '4', '3'] },
    { expression: '8 - 6', correctAnswer: '2', options: ['3', '4', '2'] },
    { expression: '7 - 3', correctAnswer: '4', options: ['4', '10', '3'] },
    { expression: '6 - 1', correctAnswer: '5', options: ['7', '5', '6'] },
    { expression: '9 - 4', correctAnswer: '5', options: ['5', '2', '7'] },
    { expression: '4 - 2', correctAnswer: '2', options: ['3', '1', '2'] },
];

let currentProblemIndex = 0;
let correctAnswersCount = 0;
let canChangeProblem = true;
const selectedProblems = getRandomProblems();

const planets = [
    'картинки/planet1.png',
    'картинки/planet2.png',
    'картинки/planet3.png'
];

let correctAnswersCount1 = 0;
let shownPlanets = [];

function getRandomPlanetIndex() {
    return Math.floor(Math.random() * planets.length);
}

function showPlanet() {
    const planetImage = document.getElementById('planetImage');
    const planetImage2 = document.getElementById('planetImage2');
    const planetImage3 = document.getElementById('planetImage3');

    const randomPlanetIndex = getRandomPlanetIndex();
    const planetUrl = planets[randomPlanetIndex];

    // Проверяем, чтобы не показать одну и ту же планету дважды
    if (!shownPlanets.includes(planetUrl)) {
        shownPlanets.push(planetUrl);
        planetImage.src = planetUrl;
        planetImage2.src = planets[getRandomPlanetIndex()];
        planetImage3.src = planets[getRandomPlanetIndex()];
        planetImage.style.display = 'block';
        planetImage2.style.display = 'block';
        planetImage3.style.display = 'block';
    }
}


let asteroidSize = 1; // Начальный размер астероида

function showAsteroid() {
    const asteroidImage = document.getElementById('asteroidImage');
    asteroidImage.style.display = 'block';
}

function hideAsteroid() {
    const asteroidImage = document.getElementById('asteroidImage');
    asteroidImage.style.display = 'none';
}

function showAsteroidAnimation() {
    const asteroidImage = document.getElementById('asteroidImage');
    asteroidImage.style.opacity = 1;
    asteroidImage.style.transform = `translate(50%, -50%) scale(${asteroidSize})`;
}

function hideAsteroidAnimation() {
    const asteroidImage = document.getElementById('asteroidImage');
    asteroidImage.style.opacity = 0;
}

// Функция для обработки неправильного ответа
function handleWrongAnswer() {
    // Увеличиваем размер астероида
    asteroidSize += 0.45;

    // Покажем и анимируем астероид
    showAsteroid();
    showAsteroidAnimation();

    // Оповещение
    showNotification('ПОДУМАЙ ЛУЧШЕ! Мы приближаемся к астероиду.');
}
// Функция для сброса размера астероида
function resetAsteroidSize() {
    asteroidSize = 1;
    const asteroidImage = document.getElementById('asteroidImage');
    asteroidImage.style.transform = `translate(50%, -50%) scale(${asteroidSize})`;
}
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    if (sound) {
        sound.play();
    }
}

// Функция для проверки ответа
function checkAnswer(selectedIndex) {
    if (!canChangeProblem) return;

    const currentProblem = selectedProblems[currentProblemIndex];
    const correctAnswer = currentProblem.correctAnswer;

    const colorOverlay = document.getElementById('colorOverlay');
    const planetImage = document.getElementById('planetImage');

    if (currentProblem.options[selectedIndex] === correctAnswer) {
        colorOverlay.style.backgroundColor = 'rgba(0, 255, 0, 0.7)';
        correctAnswersCount++;

        const currentSize = parseInt(getComputedStyle(planetImage).width, 10);
        const newSize = currentSize + 20;
        planetImage.style.width = newSize + 'px';

        playSound('correctSound');
    } else {
        colorOverlay.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
        canChangeProblem = false;
        handleWrongAnswer(); // Обрабатываем неправильный ответ

        // Воспроизведение звука неверного ответа
        playSound('incorrectSound');
    }

    setTimeout(() => {
        colorOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        canChangeProblem = true;

        currentProblemIndex++;
        if (currentProblemIndex === selectedProblems.length) {
            setTimeout(() => {
                showResults();
            }, 1000);
            return;
        }

        showCurrentProblem();
    }, 1000);
}

function showCurrentProblem() {
    hideResults();
    const currentProblem = selectedProblems[currentProblemIndex];
    document.getElementById('problem').textContent = `Решите пример: ${currentProblem.expression}`;

    const options = document.getElementById('options');
    options.innerHTML = "";

    for (let i = 0; i < currentProblem.options.length; i++) {
        const button = document.createElement('button');
        button.textContent = currentProblem.options[i];
        button.addEventListener('click', () => checkAnswer(i));
        options.appendChild(button);
    }
}

function showResults() {
    const resultsOverlay = document.getElementById('resultsOverlay');
    const resultsText = document.getElementById('resultsText');
    const restartButton = document.getElementById('restartButton'); // Кнопка "Заново"

    // Показываем результаты
    if (correctAnswersCount >= 3) {
        resultsText.textContent = `Поздравляем! Ты добрался до планеты! Правильных ответов: ${correctAnswersCount}/${selectedProblems.length}`;
    } else {
        resultsText.textContent = `Корабль потерпел крушение, попробуй еще раз! Правильных ответов: ${correctAnswersCount}/${selectedProblems.length}`;
    }

    resultsOverlay.style.display = 'block';

    // Прячем примеры после показа результатов
    document.getElementById('gameContent').style.display = 'none';

    // Показываем кнопку "Заново"
    restartButton.style.display = 'block';
}


// Функция для показа оповещения
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';

    // Спрячем оповещение через некоторое время
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000); // Оповещение будет видимым 3 секунды
}


document.getElementById('restartButton').addEventListener('click', restartGame);

function restartGame() {
    currentProblemIndex = 0;
    correctAnswersCount = 0;
    canChangeProblem = true;
    shownPlanets = [];
    correctAnswersCount1 = 0;

    hideResults();

    const planetImage = document.getElementById('planetImage');
    planetImage.style.width = '150px';

    resetAsteroidSize(); // Сбрасываем размер астероида

    selectedProblems.length = 0;
    selectedProblems.push(...getRandomProblems());

    document.querySelectorAll('.hidden-planet').forEach(planet => {
        planet.style.display = 'none';
    });

    document.getElementById('gameContent').style.display = 'block';

    // Добавляем следующую строку, чтобы показать примеры после нажатия на кнопку "Заново"
    showCurrentProblem();
}
function hideResults() {
    const resultsOverlay = document.getElementById('resultsOverlay');
    resultsOverlay.style.display = 'none';
}

function continueToNextLevel() {
    window.location.href = "game2.html";
}

function returnToLevels() {
    window.location.href = "levels.html";
}

showPlanet(); // Показываем первую планету при загрузке страницы
showCurrentProblem(); // Показываем первый пример при загрузке страницы
