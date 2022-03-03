import {$arenas, $formFight, player1, player2} from './variable.js';
import {renderPlayerWin, enemyAttack, playerAttack} from './backend.js';
import {createHTMLElements, changeHP, renderHP} from './utils.js';
import {generateLogs} from './logs.js';

export const createPlayerMarkup = (playerName, name, hp, pathToImg) => {
    const lifeEl = createHTMLElements('div', 'life');
    const nameEl = createHTMLElements('div', 'name', name);
    const imgEl = createHTMLElements('img');

    lifeEl.style.width = `${hp}%`;
    imgEl.src = pathToImg;

    const progressBarEl = createHTMLElements('div', 'progressbar', [lifeEl, nameEl]);
    const characterEl = createHTMLElements('div', 'character', [imgEl]);

    return createHTMLElements('div', playerName, [progressBarEl, characterEl]);
};

export const createPlayer = (playerID, {name, hp, img}) => {
    const player = createPlayerMarkup(playerID, name, hp, img);

    $arenas.appendChild(player);
};

export const showResult = () => {
    const reloadButton = createReloadButton();

    reloadButton.addEventListener('click', () => {
        window.location.reload();
    });

    if (player1.hp === 0 || player2.hp === 0) {
        for (let item of $formFight) {
            item.disabled = true;
        }
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        renderPlayerWin(player2.name);
        generateLogs('end', player1, player2);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        renderPlayerWin(player1.name);
        generateLogs('end', player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
        renderPlayerWin();
        generateLogs('draw');
    } else {
        console.log(new Error('Something went wrong!'));
    }
};

export const createReloadButton = () => {
    const reloadButton = createHTMLElements('button', 'button', 'Reload');
    const reloadButtonWrap = createHTMLElements('div', 'reloadWrap', [reloadButton]);

    $arenas.appendChild(reloadButtonWrap);

    return reloadButton;
};

$formFight.addEventListener('submit', (e) => {
    e.preventDefault();

    const enemy = enemyAttack();
    const attack = playerAttack();

    let damagePlayer1 = 0;
    let damagePlayer2 = 0;

    if (enemy.hit === attack.defence) {
        generateLogs('defence', player2, player1, damagePlayer1);
    } else {
        damagePlayer1 = enemy.value;

        player1.changeHP(damagePlayer1);
        player1.renderHP();

        generateLogs('hit', player2, player1, damagePlayer1);
    }

    if (attack.hit === enemy.defence) {
        generateLogs('defence', player1, player2, damagePlayer1);
    } else {
        damagePlayer2 = attack.value;

        player2.changeHP(damagePlayer2);
        player2.renderHP();

        generateLogs('hit', player1, player2, damagePlayer2);
    }

    showResult();
});

createPlayer('player1', player1);
createPlayer('player2', player2);
generateLogs('start', player1, player2);