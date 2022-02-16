const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Sword', 'Kunai'],
    attack,
    changeHP,
    elHP,
    renderHP
};

const player2 = {
    player: 2,
    name: 'KITANA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['Shield', 'Bow'],
    attack,
    changeHP,
    elHP,
    renderHP
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

function attack() {
    console.log(`${this.name} Fight...`);
}

function changeHP(randomNumber) {
    this.hp -= randomNumber;

    if (this.hp <= 0) {
        this.hp = 0;
    }
}

function elHP() {
    return document.querySelector('.player' + this.player + ' ' + '.life');
}

function renderHP() {
    this.elHP().style.width = this.hp + '%';
}

function showResultText(name) {
    const $winsTitle = createElement('div', 'winsTitle');
    
    if (name) {
        $winsTitle.innerText = name + ' ' + 'wins';
    } else {
        $winsTitle.innerText = 'draw';
    }

    return $winsTitle;
}

function getRandomNumber(num) {
    return Math.ceil(Math.random() * num);
}

function createReloadButton() {
    const $reloadButtonDiv = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');

    $reloadButton.innerText = 'Restart';

    $reloadButtonDiv.appendChild($reloadButton);

    $reloadButton.addEventListener('click', function() {
        window.location.reload();
    });

    $arenas.appendChild($reloadButtonDiv);
}

$randomButton.addEventListener('click', function() {
    player1.changeHP(getRandomNumber(20));
    player1.renderHP();

    player2.changeHP(getRandomNumber(20));
    player2.renderHP();

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        createReloadButton();
    }

    if (player1.hp === 0 && player2.hp > player1.hp) {
        $arenas.appendChild(showResultText(player2.name));
    } else if (player2.hp === 0 && player1.hp > player2.hp) {
        $arenas.appendChild(showResultText(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(showResultText());
    } else {
        console.log(new Error('Something went wrong!'));
    }
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));