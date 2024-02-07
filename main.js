function startGame(level) {
    // Перенаправление на страницу с игрой и передача уровня
    window.location.href = "game.html?level=" + level;
}

// Функция для возврата на главную страницу
function goToMainPage() {
    window.location.href = "index.html";
}

// Добавим глобальную переменную для хранения состояния музыки
let isMusicEnabled = true;

// Функция для включения и выключения музыки
function toggleMusic() {
    const backgroundMusic = document.getElementById("backgroundMusic");

    if (isMusicEnabled) {
        backgroundMusic.pause();
    } else {
        backgroundMusic.play();
    }

    isMusicEnabled = !isMusicEnabled;
}

// Функция для обработки изменения состояния чекбокса
function handleCheckboxChange() {
    toggleMusic();
}

// Автоматически включаем музыку при загрузке страницы
toggleMusic();

function startGame() {
    // Перенаправление на страницу с уровнями игры
    window.location.href = "levels.html";
}

// Назначаем обработчик изменения состояния чекбокса
document.getElementById("musicCheckbox").addEventListener("change", handleCheckboxChange);


function startGame1() {
    // Перенаправление на страницу с уровнями игры
    window.location.href = "game1.html";
}
function startGame2() {
    // Перенаправление на страницу с уровнями игры
    window.location.href = "game2.html";
}
function startGame3() {
    // Перенаправление на страницу с уровнями игры
    window.location.href = "game3.html";
}
function startGame4() {
    // Перенаправление на страницу с уровнями игры
    window.location.href = "game4.html";
}
function pravila(){
    window.location.href = "pravila.html";
}
function nazad(){
    window.location.href = "levels.html";
}
