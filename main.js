const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Sword', 'Kunai'],
    attack() {
        console.log(`${this.name} Fight...`);
    }
};

const player2 = {
    player: 2,
    name: 'KITANA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['Shield', 'Bow'],
    attack: function() {
        console.log(playerTwo.name + ' ' + 'Fight...');
    }
};

function createElement(tag, className) {
    const $tag = document.createElement(tag);

    if (className) {
        $tag.classList.add(className);
    }

    return $tag;
}

function createPlayer(objectName) {
    const $player = createElement('div', 'player' + objectName.player);
    const $progressBar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = objectName.hp + '%';
    $name.innerText = objectName.name;
    $img.src = objectName.img;

    $player.appendChild($progressBar);
    $player.appendChild($character);

    $progressBar.appendChild($life);
    $progressBar.appendChild($name);

    $character.appendChild($img);

    return $player;
}

function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' ' + '.life');
    player.hp -= getRandomNumber(20);

    if (player.hp <= 0) {
        player.hp = 0;
        $randomButton.disabled = true;

        if (player1.hp === 0 && player2.hp > 0) {
            $arenas.appendChild(playerWins(player2.name));
        } else {
            $arenas.appendChild(playerWins(player1.name));
        }
    }

    $playerLife.style.width = player.hp + '%';
}

function playerWins(name) {
    const $winsTitle = createElement('div', 'winsTitle');
    $winsTitle.innerText = name + ' ' + 'wins';

    return $winsTitle;
}

// function playerLose(name) {
//     const $loseTitle = createElement('div', 'loseTitle');
//     $loseTitle.innerText = name + ' ' + 'lose';

//     return $loseTitle;
// }

function getRandomNumber(number) {
    return Math.ceil(Math.random() * number);
}

$randomButton.addEventListener('click', function() {
    changeHP(player1);
    changeHP(player2);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));