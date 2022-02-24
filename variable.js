import {attack, elHP, renderHP, changeHP} from './utils.js';

export const $arenas = document.querySelector('.arenas');
export const $formFight = document.querySelector('.control');

export const MAP_WITH_NAMES = {
    SCORPION: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    KITANA: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    LIUKANG: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    SONYA: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    SUBZERO: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif'
};

export const HIT = {
    head: 30,
    body: 25,
    foot: 20
};

export const ATTACK = ['head', 'body', 'foot'];

export const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: MAP_WITH_NAMES['SCORPION'],
    weapon: ['Sword', 'Kunai'],
    elHP,
    changeHP,
    renderHP,
    attack
};

export const player2 = {
    player: 2,
    name: 'SUB-ZERO',
    hp: 100,
    img: MAP_WITH_NAMES['SUBZERO'],
    weapon: ['Magic', 'Gloves'],
    elHP,
    changeHP,
    renderHP,
    attack
};