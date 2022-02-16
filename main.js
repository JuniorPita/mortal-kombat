// Первый вариант написания кода (c Task'ом #3)

// Task #0
// Создаём первый объект, у которого метод-функция реализована через контекст this
const playerOne = {
    name: 'SCORPION',
    hp: 50,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Sword', 'Kunai'],
    attack() {
        console.log(`${this.name} Fight...`);
    }
};

// Создаём второй объект, у которого метод-функция реализована не через контекст this
const playerTwo = {
    name: 'KITANA',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['Shield', 'Bow'],
    attack: function() {
        console.log(playerTwo.name + ' ' + 'Fight...');
    }
};

// Task #1 and #2
// Создаём функцию-конструктор блоков со взаимодействием с DOM
function createPlayer(playerClass, objectName) {
    const $player = document.createElement('div');
    $player.classList.add(playerClass);

    const $progressBar = document.createElement('div');
    $progressBar.classList.add('progressbar');
    const $character = document.createElement('div');
    $character.classList.add('character');
    $player.appendChild($progressBar);
    $player.appendChild($character);

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = objectName.hp + '%';
    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText = objectName.name;
    $progressBar.appendChild($life);
    $progressBar.appendChild($name);

    const $img = document.createElement('img');
    $img.src = objectName.img;
    $character.appendChild($img);

    const $arenas = document.querySelector('.arenas');
    $arenas.appendChild($player);
}

createPlayer('player1', playerOne);
createPlayer('player2', playerTwo);

// Второй вариант написания кода (Без Task'а #3)

// // Task #0
// // Создаём первый объект, у которого метод-функция реализована через контекст this
// const playerOne = {
//     name: 'Scorpion',
//     hp: 100,
//     img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
//     weapon: ['Sword', 'Kunai'],
//     attack() {
//         console.log(`${this.name} Fight...`);
//     }
// };

// // Создаём второй объект, у которого метод-функция реализована не через контекст this
// const playerTwo = {
//     name: 'Kitana',
//     hp: 100,
//     img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
//     weapon: ['Shield', 'Bow'],
//     attack: function() {
//         console.log(playerTwo.name + ' ' + 'Fight...');
//     }
// };

// // Task #1 and #2
// // Создаём функцию-конструктор блоков со взаимодействием с DOM
// function createPlayer(playerClass, playerName, playerHP, playerImage) {
//     const $player = document.createElement('div');
//     $player.classList.add(playerClass);

//     const $progressBar = document.createElement('div');
//     $progressBar.classList.add('progressbar');
//     const $character = document.createElement('div');
//     $character.classList.add('character');
//     $player.appendChild($progressBar);
//     $player.appendChild($character);

//     const $life = document.createElement('div');
//     $life.classList.add('life');
//     $life.style.width = `${playerHP}%`;
//     const $name = document.createElement('div');
//     $name.classList.add('name');
//     $name.innerText = playerName;
//     $progressBar.appendChild($life);
//     $progressBar.appendChild($name);

//     const $img = document.createElement('img');
//     $img.src = playerImage;
//     $character.appendChild($img);

//     const $arenas = document.querySelector('.arenas');
//     $arenas.appendChild($player);
// }

// createPlayer('player1', 'SCORPION', 50, playerOne.img);
// createPlayer('player2', 'SUB-ZERO', 80, playerTwo.img);