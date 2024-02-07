(function () {
    const evenUFO = document.getElementById('evenUFO');
    const oddUFO = document.getElementById('oddUFO');
    const evenLabel = document.createElement('div');
    const oddLabel = document.createElement('div');
    const fallingNumbersContainer = document.getElementById('fallingNumbers');
    const scoreElement = document.getElementById('scoreValue');
    const correctSound = document.getElementById('correctSound');
    const incorrectSound = document.getElementById('incorrectSound');
    const initialEvenUFOX = 'calc(15% - 100px)';
    const initialOddUFOX = 'calc(60% - 100px)';
    const initialUFOY = '45%';
    const oddUFOCorrection = 40;

    let isEvenUFOControlled = false;
    let isOddUFOControlled = false;
    let correctAnswers = 0;
    let mistakes = 0;
    let isGamePaused = false;

    evenUFO.appendChild(evenLabel);
    oddUFO.appendChild(oddLabel);

    evenUFO.style.left = 'calc(15% - 100px)';

    evenLabel.className = 'ufo-label even-label';
    oddLabel.className = 'ufo-label odd-label';

    evenLabel.innerText = 'Четные';
    oddLabel.innerText = 'Нечетные';

    evenUFO.addEventListener('click', toggleEvenUFOControl);
    oddUFO.addEventListener('click', toggleOddUFOControl);
    document.addEventListener('mousemove', moveControlledUFO);

    // Добавление текста перед началом игры
const startText = document.createElement('div');
startText.className = 'start-text';
startText.innerText = 'Начинаем!';
document.body.appendChild(startText);

startText.style.fontSize = '50px';

// Анимация входа и выхода текста
startText.style.left = '50%';
startText.style.top = '-50px'; // Половина высоты текста

// Запуск анимации
startText.animate(
    [
        { top: '-50px', opacity: 0 },
        { top: '50%', opacity: 1 },
        { top: '50%', opacity: 1 }, // Задержка в центре
        { top: '-50px', opacity: 0 },
    ],
    {
        duration: 2500, // Продолжительность анимации в миллисекундах (увеличено до 3000)
        easing: 'ease-in-out', // Замедление на входе и выходе
        fill: 'forwards', // Сохранение состояния после завершения
    }
).onfinish = () => {
    // Запуск игры после завершения анимации
    
};

    function toggleEvenUFOControl() {
        isEvenUFOControlled = !isEvenUFOControlled;
        evenUFO.classList.toggle('controlled', isEvenUFOControlled);
    }

    function toggleOddUFOControl() {
        isOddUFOControlled = !isOddUFOControlled;
        oddUFO.classList.toggle('controlled', isOddUFOControlled);
    }

    function moveControlledUFO(event) {
        if (!isGamePaused) {
            if (isEvenUFOControlled || isOddUFOControlled) {
                const mouseX = event.clientX;
                const mouseY = event.clientY;

                if (isEvenUFOControlled) {
                    moveUFO(evenUFO, mouseX, mouseY);
                }

                if (isOddUFOControlled) {
                    moveUFO(oddUFO, mouseX, mouseY);
                }
            } else {
                checkFallingNumbers();
            }
        }
    }

    function moveUFO(ufo, mouseX, mouseY) {
        const ufoRect = ufo.getBoundingClientRect();
        const offsetX = mouseX - ufoRect.width / 2;
        const offsetY = mouseY - ufoRect.height / 2;

        ufo.style.left = offsetX + 'px';
        ufo.style.top = offsetY + 'px';
        checkFallingNumbers();
    }

    function checkFallingNumbers() {
        if (!isGamePaused) {
            const ufo = isEvenUFOControlled ? evenUFO : oddUFO;
            const isUFOControlled = isEvenUFOControlled || isOddUFOControlled;

            const fallingNumbers = document.querySelectorAll('.falling-number');

            fallingNumbers.forEach((fallingNumber) => {
                if (isUFOControlled && isUFOHovered(fallingNumber, ufo)) {
                    catchNumber(fallingNumber);
                }
            });
        }
    }

    function isUFOHovered(fallingNumber, ufo) {
        const numberRect = fallingNumber.getBoundingClientRect();
        const ufoRect = ufo.getBoundingClientRect();

        return (
            numberRect.left < ufoRect.right &&
            numberRect.right > ufoRect.left &&
            numberRect.top < ufoRect.bottom &&
            numberRect.bottom > ufoRect.top
        );
    }

    function catchNumber(fallingNumber) {
        const number = parseInt(fallingNumber.innerText);
        const isEven = number % 2 === 0;

        if ((isEven && isEvenUFOControlled) || (!isEven && isOddUFOControlled)) {
            correctAnswers++;

            if (correctAnswers === 10) {
                showWinModal();
            }

            correctSound.play();
        } else {
            if (correctAnswers < 10) {
                handleMistake();
            }

            incorrectSound.play();
        }

        scoreElement.innerText = correctAnswers;
        fallingNumbersContainer.removeChild(fallingNumber);
        createFallingNumber();
    }

    function handleMistake() {
        mistakes++;
        if (mistakes === 3) {
            showLoseModal();
        }
    }

    function showWinModal() {
        toggleGamePause();
        document.getElementById('finalScoreWin').innerText = correctAnswers;
        document.getElementById('winModal').style.display = 'block';
    }

    function showLoseModal() {
        toggleGamePause();
        document.getElementById('finalScoreLose').innerText = correctAnswers;
        document.getElementById('loseModal').style.display = 'block';
    }

    function toggleGamePause() {
        isGamePaused = !isGamePaused;
    }

    window.resetGame = function () {
        toggleGamePause();
        correctAnswers = 0;
        mistakes = 0;
        scoreElement.innerText = correctAnswers;
        fallingNumbersContainer.innerHTML = '';
        resetUsedNumbers();
        isEvenUFOControlled = false;
        isOddUFOControlled = false;
        evenUFO.classList.remove('controlled', 'ufo-reset');
        oddUFO.classList.remove('controlled', 'ufo-reset');
        document.getElementById('winModal').style.display = 'none';
        document.getElementById('loseModal').style.display = 'none';

        evenUFO.style.left = initialEvenUFOX;
        oddUFO.style.left = `calc(60% - ${oddUFOCorrection}px + 40px)`;
        evenUFO.style.top = initialUFOY;
        oddUFO.style.top = initialUFOY;

        evenUFO.classList.add('ufo-reset');
        oddUFO.classList.add('ufo-reset');

        void evenUFO.offsetWidth;
        void oddUFO.offsetWidth;

        evenUFO.classList.remove('ufo-reset');
        oddUFO.classList.remove('ufo-reset');

        createFallingNumber();
    };

    window.returnToLevels = function () {
        window.location.href = "levels.html";
    };
    window.nextLevel = function () {
        window.location.href = "game4.html";
    };

    let usedNumbers = [];

    function createFallingNumber() {
        if (!isGamePaused) {
            const isEven = Math.random() < 0.5;
            let number;

            if (isEven) {
                number = getRandomEven();
            } else {
                number = getRandomOdd();
            }

            if (usedNumbers.includes(number)) {
                return createFallingNumber();
            }

            usedNumbers.push(number);

            const fallingNumber = document.createElement('div');
            fallingNumber.className = 'falling-number';
            fallingNumber.innerText = number;

            fallingNumbersContainer.appendChild(fallingNumber);

            const initialX = Math.random() * window.innerWidth;
            const initialY = -200;

            fallingNumber.style.transform = `translate(${initialX}px, ${initialY}px)`;
            fallingNumber.style.animationDelay = '-1s';
            fallingNumber.style.animationDuration = `${Math.random() * 2 + 6}s`;

            fallingNumber.addEventListener('animationend', () => {
                fallingNumbersContainer.removeChild(fallingNumber);
                createFallingNumber();
            });
        }
    }

    function resetUsedNumbers() {
        usedNumbers = [];
    }

    function getRandomEven() {
        return Math.floor(Math.random() * 10) * 2;
    }

    function getRandomOdd() {
        return Math.floor(Math.random() * 10) * 2 + 1;
    }

    createFallingNumber();
})();
