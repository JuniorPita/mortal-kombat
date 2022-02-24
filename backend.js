import {getRandomNumber, createHTMLElements} from "./utils.js";
import {ATTACK, HIT, $arenas, $formFight} from './variable.js';

export const enemyAttack = () => {
    const length = ATTACK.length - 1;

    const hit = ATTACK[getRandomNumber(0, length)];
    const defence = ATTACK[getRandomNumber(0, length)];

    return {
        value: getRandomNumber(0, HIT[hit]),
        hit,
        defence
    };
};

export const playerAttack = () => {
    const attack = {};

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandomNumber(0, HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }

    return attack;
};

export const renderPlayerWin = (name) => {
    const winnerName = name ? `${name} wins` : 'draw';

    const winTitle = createHTMLElements('div', 'loseTitle', winnerName);

    $arenas.appendChild(winTitle);
};