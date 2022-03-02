import { createElement } from '../utils/utils.js';

export default class Player {
  constructor(props) {
    this.player = props.player;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
    this.rootSelector = props.rootSelector;
  }

  attack = () => {
    console.log(this.name + ' Fight...');
  }

  elHP = () => {
    return document.querySelector(`.player${this.player} .life`);
  }

  changeHP = (randomHP) => {
    this.hp -= randomHP;

    if (this.hp <= 0) {
      this.hp = 0;
    }
  }

  renderHP = () => {
    this.elHP().style.width = `${this.hp}%`;
  }

  renderPlayer = () => {
    const $root = document.querySelector(`.${this.rootSelector}`);
    const $player = createElement('div', `player${this.player}`);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = `${this.hp}%`;
    $name.innerText = this.name;
    $img.src = this.img;

    $root.appendChild($player);
    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);

    return $player;
  }
}
