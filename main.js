const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20
};

const ATTACK = ['head', 'body', 'foot'];

const firstPlayer = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Sword', 'Kunai'],
    elHP,
    changeHP,
    renderHP,
    attack
};

const secondPlayer = {
    player: 2,
    name: 'SUB-ZERO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Bow', 'Scepter'],
    elHP,
    changeHP,
    renderHP,
    attack
};

function createElement(tag, className) {
    const $tag = document.createElement(tag);

    if (className) {
        $tag.classList.add(className);
    }

    return $tag;
}

function attack() {
    console.log(`${this.name} Fight...`);
}

function elHP() {
    return document.querySelector('.player' + this.player + ' ' + '.life');
}

function changeHP(randomHP) {
    this.hp -= randomHP;

    if (this.hp <= 0) {
        this.hp = 0;
    }
}

function renderHP() {
    this.elHP().style.width = this.hp + '%';
}

function createPlayer(playerData) {
    const $player = createElement('div', 'player' + playerData.player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = playerData.hp + '%';
    $name.innerText = playerData.name;
    $img.src = playerData.img;

    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);

    return $player;
}

function getRandomHP(number) {
    return Math.ceil(Math.random() * number);
}

function showResult(name) {
    const $resultTitle = createElement('div', 'loseTitle');
    
    if (name) {
        $resultTitle.innerText = name + ' wins';
    } else {
        $resultTitle.innerText = 'draw';
    }

    return $resultTitle;
}

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');

    $reloadButton.innerText = 'Restart';

    $reloadButton.addEventListener('click', function() {
        window.location.reload();
    });

    $reloadWrap.appendChild($reloadButton);
    $arenas.appendChild($reloadWrap);
}

$arenas.appendChild(createPlayer(firstPlayer));
$arenas.appendChild(createPlayer(secondPlayer));

function enemyAttack() {
    const hit = ATTACK[getRandomHP(3) - 1];
    const defence = ATTACK[getRandomHP(3) - 1];

    return {
        value: getRandomHP(HIT[hit]),
        hit,
        defence
    };
}

function playerAttack() {
    const attack = {};

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandomHP(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }

    return attack;
}

function fightResult() {
    if (firstPlayer.hp === 0 || secondPlayer.hp === 0) {
        createReloadButton();
    }

    if (firstPlayer.hp === 0 && firstPlayer.hp < secondPlayer.hp) {
        $arenas.appendChild(showResult(secondPlayer.name));
    } else if (secondPlayer.hp === 0 && secondPlayer.hp < firstPlayer.hp) {
        $arenas.appendChild(showResult(firstPlayer.name));
    } else if (firstPlayer.hp === 0 && secondPlayer.hp === 0) {
        $arenas.appendChild(showResult());
    } else {
        console.log(new Error('Something went wrong...'));
    }
}

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();

    const enemy = enemyAttack();
    const player = playerAttack();

    if (enemy.hit !== player.defence) {
        firstPlayer.changeHP(enemy.value);
        firstPlayer.renderHP();
    }

    if (player.hit !== enemy.defence) {
        secondPlayer.changeHP(player.value);
        secondPlayer.renderHP();
    }

    fightResult();
});