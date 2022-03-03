import Player from './Player.js';
import Api from './Api.js';
import { createElement } from '../utils/utils.js';
import { generateLogs } from '../utils/logs.js';

export default class Game {
  constructor() {
    this.$arenas = document.querySelector('.arenas');
    this.$formFight = document.querySelector('.control');
    this.api = new Api();
    this.firstPlayer = {};
    this.secondPlayer = {};
  }

  showResult = (name) => {
    const $resultTitle = createElement('div', 'resultTitle');

    if (name) {
      $resultTitle.innerText = name + ' wins';
    } else {
      $resultTitle.innerText = 'draw';
    }

    return $resultTitle;
  }

  fightResult = () => {
    if (this.firstPlayer.hp === 0 || this.secondPlayer.hp === 0) {
      this.createReloadButton();
      for (let item of this.$formFight) {
        item.disabled = true;
      }
    }

    if (this.firstPlayer.hp === 0 && this.firstPlayer.hp < this.secondPlayer.hp) {
      this.$arenas.appendChild(this.showResult(this.secondPlayer.name));
      generateLogs('end', this.secondPlayer, this.firstPlayer);
    } else if (this.secondPlayer.hp === 0 && this.secondPlayer.hp < this.firstPlayer.hp) {
      this.$arenas.appendChild(this.showResult(this.firstPlayer.name));
      generateLogs('end', this.firstPlayer, this.secondPlayer);
    } else if (this.firstPlayer.hp === 0 && this.secondPlayer.hp === 0) {
      this.$arenas.appendChild(this.showResult());
      generateLogs('draw');
    }
  }

  playerAttack = () => {
    const attack = {};

    for (let item of this.$formFight) {
      if (item.checked && item.name === 'hit') {
        attack.hit = item.value;
      }

      if (item.checked && item.name === 'defence') {
        attack.defence = item.value;
      }

      item.checked = false;
    }

    return attack;
  }

  createReloadButton = () => {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');

    $reloadButton.innerText = 'Restart';

    $reloadButton.addEventListener('click', function() {
      window.location.pathname = '../index.html';
    });

    $reloadWrap.appendChild($reloadButton);
    this.$arenas.appendChild($reloadWrap);
};

  addFormSubmit = () => {
    this.$formFight.addEventListener('submit', async (evt) => {
      evt.preventDefault();

      const playerAction = this.playerAttack();
      const res = await this.api.getFight(playerAction.hit, playerAction.defence);
      const enemy = res.player1;
      const player = res.player2;

      if (enemy.hit !== player.defence) {
        this.firstPlayer.changeHP(enemy.value);
        this.firstPlayer.renderHP();
        generateLogs('hit', this.secondPlayer, this.firstPlayer, enemy.value);
      } else {
        generateLogs('defence', this.firstPlayer, this.secondPlayer)
      }

      if (player.hit !== enemy.defence) {
        this.secondPlayer.changeHP(player.value);
        this.secondPlayer.renderHP();
        generateLogs('hit', this.firstPlayer, this.secondPlayer, player.value);
      } else {
        generateLogs('defence', this.secondPlayer, this.firstPlayer)
      }

      this.fightResult();
    });
  }

  start = async () => {
    const p1 = JSON.parse(localStorage.getItem('player1'));
    const p2 = await this.api.getRandomPlayer();

    this.firstPlayer = new Player({
      ...p1,
      player: 1,
      rootSelector: 'arenas',
    });
    this.secondPlayer = new Player({
      ...p2,
      player: 2,
      rootSelector: 'arenas',
    });

    this.firstPlayer.renderPlayer();
    this.secondPlayer.renderPlayer();
    this.addFormSubmit();
    generateLogs('start', this.firstPlayer, this.secondPlayer);
  }
}
