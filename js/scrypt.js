document.addEventListener("DOMContentLoaded", function() {
    /* Скрипт для экрана загрузки */
    const preload = document.querySelector('.preload');
    const container = document.querySelector('.container');
    const firstScreen = document.querySelector('.firstScreen');
    const preloadContent = document.querySelector('.preload__content');
    const playerName1 = document.querySelector('.preload__playerName1');
    const playerName2 = document.querySelector('.preload__playerName2');
    const playerIcon1 = document.querySelector('.preload__playerIcon1');
    const playerIcon2 = document.querySelector('.preload__playerIcon2');
    const preloadStartBtn = document.querySelector('.preload__startBtn');
    const preloadChangeBtn = document.querySelector('.preload__changeBtn');
    
    // скрываем текущий экран с загрузкой
    function showContent() {
        preload.style.display = 'none';
        container.style.display = 'block';
        firstScreen.style.display = 'block';
    }
    if (sessionStorage.getItem('Игрок 1') && sessionStorage.getItem('Игрок 2')) {
        playerName1.innerHTML = sessionStorage.getItem('Игрок 1');
        playerName2.innerHTML = sessionStorage.getItem('Игрок 2');
        playerIcon1.insertAdjacentHTML('beforeend', sessionStorage.getItem('Игрок 1 icon'));
        playerIcon2.insertAdjacentHTML('beforeend', sessionStorage.getItem('Игрок 2 icon'));

        preloadStartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            firstPlayerName.innerHTML = sessionStorage.getItem('Игрок 1');
            secondPlayerName.innerHTML = sessionStorage.getItem('Игрок 2');
            fisrtPlayerIcon.insertAdjacentHTML('beforeend', sessionStorage.getItem('Игрок 1 icon'));
            secondPlayerIcon.insertAdjacentHTML('beforeend', sessionStorage.getItem('Игрок 2 icon'));

            preload.style.display = 'none';
            container.style.display = 'block';
            gameScreen.style.display = 'block';
        });
        preloadChangeBtn.addEventListener('click', function() {
            showContent();
        });
    } else {
        preloadContent.style.display = 'none';
        setTimeout(showContent, 5000);
    }

    /* Скрипт для приветственного экрана (1 экран) */
    let player = document.querySelector('.firstScreen__greeting-player');
    const playerSex = document.querySelectorAll('.firstScreen__form-radio');
    let icons = document.querySelectorAll('.firstScreen__icon');
    const iconBoys = document.querySelectorAll('.firstScreen__icon-boys');
    const iconGirls = document.querySelectorAll('.firstScreen__icon-girls');
    let playerName = document.querySelector('#name');
    const formBtn = document.querySelector('.firstScreen__formBtn');
    let playerIcon;
    let playerNum = 1;
    const nameTextRequire = document.querySelector('.firstScreen__form-name-require');
    const iconTextRequire = document.querySelector('.firstScreen__icon-require');
    const gameScreen = document.querySelector('.game');

    // функция смены иконки в зависимости от радио кнопки
    function changeIcons(item) {
        if (item.hasAttribute('checked')) {
            iconGirls.forEach((person) => {
                person.style.display = 'none';
            });
            iconBoys.forEach((person) => {
                person.style.display = 'block';
            });
        } else {
            iconGirls.forEach((person) => {
                person.style.display = 'block';
            });
            iconBoys.forEach((person) => {
                person.style.display = 'none';
            });
        }
    }
    // вывод иконок по умолчанию
    changeIcons(playerSex[0]);
    // обработка переключения радио кнопок
    playerSex.forEach(function(item) {
        item.addEventListener('click', function() {
            changeIcons(item);
        });
    });
    function removeClass(array, thisClass) {
        array.forEach(function(icon) {
            icon.classList.remove(thisClass);
        });
    }
    icons.forEach(function(icon) {
        icon.addEventListener('click', function() {
            removeClass(icons, 'checked');
            icon.classList.add('checked');
            // записываем в переменную выбранную иконку
            playerIcon = (icon.classList.contains('checked')) ? icon.firstChild.nextSibling : '';
            if (player.innerHTML === "Игрок 1") {
                if (fisrtPlayerIcon.firstChild) {
                    fisrtPlayerIcon.removeChild(fisrtPlayerIcon.firstChild);
                    sessionStorage.removeItem(player.innerHTML+' icon');
                }
                fisrtPlayerIcon.append(playerIcon.cloneNode(true));
                sessionStorage.setItem(player.innerHTML+' icon', playerIcon.outerHTML);
            }
            if (player.innerHTML === "Игрок 2") {
                if (secondPlayerIcon.firstChild) {
                    secondPlayerIcon.removeChild(secondPlayerIcon.firstChild);
                    sessionStorage.removeItem(player.innerHTML+' icon');
                }
                secondPlayerIcon.append(playerIcon.cloneNode(true));
                sessionStorage.setItem(player.innerHTML+' icon', playerIcon.outerHTML);
            }
        });
    });
    // функция для валидации введенного имени
    function nameValidate () {
        if (playerName.value === '') {
            nameTextRequire.style.display = 'block';
            nameTextRequire.innerHTML = 'Пусто и грустно. Тебе следует ввести ник или имя правильно.';
        }
        else if (playerName.value.length < 2) {
            nameTextRequire.style.display = 'block';
            nameTextRequire.innerHTML = 'Краткость - сестра таланта! Но лучше не так коротко';
        }
        else if (playerName.value.match(/[\d\s]/gi)) {
            nameTextRequire.style.display = 'block';
            nameTextRequire.innerHTML = 'Неплохо! Но может уберем цифры?';
        }
    }
    function clearRequire() {
        nameTextRequire.style.display = 'none';
        iconTextRequire.style.display = 'none';
    }
    // нажатие на кнопку "готово"
    formBtn.addEventListener('click', function(e) {
        e.preventDefault();
        clearRequire();
        if (playerName.value !== '' && playerName.value.match(/[a-zA-Zа-яА-Я]/gmi) && playerName.value.length > 2 && !playerName.value.match(/[\d\s]/gi) && sessionStorage.getItem(player.innerHTML+' icon') !== null) {
            sessionStorage.setItem(player.innerHTML, playerName.value);
            playerNum++;
            player.innerHTML = "Игрок "+playerNum;
            if (player.innerHTML === 'Игрок 3') {
                firstScreen.style.display = 'none';
                gameScreen.style.display = 'block';
                if (sessionStorage.getItem('Игрок 1')) {
                    firstPlayerName.innerHTML = sessionStorage.getItem('Игрок 1');
                }
                if (sessionStorage.getItem('Игрок 2')) {
                    secondPlayerName.innerHTML = sessionStorage.getItem('Игрок 2');
                }
            }
        }
        else if (sessionStorage.getItem(player.innerHTML+' icon') === null || (sessionStorage.getItem(player.innerHTML+' icon') === null && (playerName.value === '' || playerName.value.length < 2 || playerName.value.match(/[\d\s]/gi)))) {
            nameValidate ();
            iconTextRequire.style.display = 'block';
        }
        else {
            nameValidate ();
        }
    });

    /* Скрипт для самой игры (2 экран) */
    const background = document.querySelector('.container_back');
    const startBtn = document.querySelector('.game__startBtn');
    // выбор первого хода
    const playerChoice = document.querySelector('.game__choice');
    const playerChoiceField = document.querySelector('.game__playerChoice');
    const crossChoice = document.querySelector('.game__playerChoice_cross');
    const nullChoice = document.querySelector('.game__playerChoice_null');
    // кастомизация игроков
    let firstPlayerName = document.querySelector('.game__playerName1');
    let fisrtPlayerIcon = document.querySelector('.game__playerIcon1');
    let secondPlayerName = document.querySelector('.game__playerName2');
    let secondPlayerIcon = document.querySelector('.game__playerIcon2');
    const winCounterFirst = document.querySelector('.game__playerWins_player1');
    const winCounterSecond = document.querySelector('.game__playerWins_player2');
    
    const round = document.querySelector('.game__roundCount');
    const gameCell = document.querySelectorAll('.game__playingField-cell');
    const roundTime = document.querySelector('.game__roundTime');
    const iconX = '<svg class="game__playerRole-icon game__cellIcon"><use xlink:href="icons/XO.svg#X"></use></svg>';
    const iconO = '<svg class="game__playerRole-icon game__cellIcon"><use xlink:href="icons/XO.svg#O"></use></svg>';
    const result = document.querySelector('.game__result');
    
    // переменные для игры
    let icon;
    let iconName;
    let turn;
    let roundCounter = 0;
    let playerFirstWins = sessionStorage.getItem('Побед у 1 игрока') ? sessionStorage.getItem('Побед у 1 игрока') : 0;
    let playerSecondWins = sessionStorage.getItem('Побед у 2 игрока') ? sessionStorage.getItem('Побед у 2 игрока') : 0;
    winCounterFirst.innerHTML = playerFirstWins;
    winCounterSecond.innerHTML = playerSecondWins;
    let nonEmptyCell = 0;
    // переменные для работы со временем
    let firstSec;
    let Sec;
    let firstMin;
    let Min;
    let start; // переменная для осуществления установки и сброса счетчика времени

    // обработка кнопки начало игры
    startBtn.addEventListener('click', function () {
        resetAll();
        if (!startBtn.classList.contains('disabled')) {
             // делаем поле доступным 
        gameCell.forEach(function(element) {
            element.classList.remove('disabled');
            element.classList.add('ready');
        });
        // сбрасываем таймер
        firstSec = 0;
        firstMin = 0;
        Sec = 0;
        Min = 0;
        // прибавляем 1 к раундам
        roundCounter++;
        round.innerHTML = roundCounter;
        // проверка первого хода
        turn = (turn == undefined) ? 'cross' : turn;
        clearInterval(start);
        start = setInterval(startTimer, 1000);
        //startBtn.classList.add('disabled');
        startBtn.innerHTML = 'Начать заново';
        }
    });
    // Обработка кнопки для выбора того, кто первый начинает
    playerChoice.addEventListener('click', function() {
        playerChoiceField.style.display = 'flex';
        background.style.display = 'block';
        crossChoice.addEventListener('click', function(e) {
            e.preventDefault();
            turn = 'cross';
            resetAll();
        });
        nullChoice.addEventListener('click', function(e) {
            e.preventDefault();
            turn = 'nul';
            resetAll();
        });
    });
    // сброс текущей игры
    function resetAll() {
        playerChoiceField.style.display = 'none';
        background.style.display = 'none';
        //startBtn.classList.remove('disabled');
        clearInterval(start);
        // очистка поля при начале новой игры
        gameCell.forEach(function(element) {
            element.classList.remove('active', 'nul', 'cross', 'ready', 'game__playingField-cell_win');
            element.classList.add('disabled');
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        });
        result.innerHTML = '';
        nonEmptyCell = 0;
    }
    // функция для таймера
    function startTimer() {
        roundTime.innerHTML = Min+''+firstMin+':'+Sec+firstSec;
        firstSec++;
        if (firstSec >= 10) {
            Sec++;
            firstSec = 0;
        }
        if (Sec >= 6) {
            firstMin++;
            Sec = 0;
        }
        if (firstMin >= 10) {
            Min++;
            firstMin = 0;
        }
    }
    // функция проверяет текущий ход для установки иконки хода
    function checkTurn() {
        icon = (turn == 'nul') ? iconO : iconX;
        iconName = (turn == 'nul') ? 'nul' : 'cross';
    }
    // обработка хода игрока
    gameCell.forEach(function(elem, i) {
        elem.addEventListener('click', function (e) {
            if (elem.classList.contains('ready')) {
                e.preventDefault();
                if (!this.classList.contains('active') && !this.childNodes.length) {
                    checkTurn();
                    this.classList.add('active', iconName);
                    this.innerHTML = icon;
                    // проверяем победу или ничью
                    checkNobodyWin();
                    checkWinCondition(turn);
                    // делаем смену хода
                    turn = (turn == 'nul') ? 'cross' : 'nul';
                }
            }
        });
    });
    // функция для определения победителя
    function whoIsWin(step) {
        if (step == 'nul') {
            playerSecondWins++;
            winCounterSecond.innerHTML = playerSecondWins;
            result.innerHTML = 'Поздравляю, '+secondPlayerName.innerHTML+'. Победа за тобой!';
            sessionStorage.setItem('Побед у 1 игрока', playerSecondWins);
        } else {
            playerFirstWins++;
            winCounterFirst.innerHTML = playerFirstWins;
            result.innerHTML = 'Поздравляю, '+firstPlayerName.innerHTML+'. Победа за тобой!';
            sessionStorage.setItem('Побед у 2 игрока', playerFirstWins);
        }
        
        setTimeout(resetAll, 2000);
        setTimeout(() => {startBtn.innerHTML = 'Начать!';}, 2000);
    }
    // создадим массив с комбинациями (ячейками игрового поля)
    const cells = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    // функция для проверки условий победы и выделения выигрышной комбинации
    function checkWinCondition(step) {
        // делаем перебор всех возможных комбинаций
        cells.forEach((cell) => {
            if (gameCell[cell[0]].classList.contains(step) && gameCell[cell[1]].classList.contains(step) && gameCell[cell[2]].classList.contains(step)) {
                whoIsWin(step);
                // проверка какую комбинацию выделить
                for (let i = 0; i < 3; i++) {
                    gameCell[cell[i]].classList.add('game__playingField-cell_win');
                }
            }
        });        
    }
    function checkNobodyWin() {
        nonEmptyCell++;
        if (nonEmptyCell === 9) {
            setTimeout(resetAll, 2000);
            setTimeout(() => {startBtn.innerHTML = 'Начать!';}, 2000);
            result.innerHTML = 'Кажется у нас тут ничья.';
        }
    }

});