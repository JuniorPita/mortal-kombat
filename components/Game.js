import { firstPlayer, secondPlayer, createPlayer } from './Player.js';
import { HIT, ATTACK } from '../constants/constants.js';
import { getRandom, createElement } from '../utils/utils.js';
import { generateLogs } from '../utils/logs.js';

export default class Game {
  constructor() {
    this.$arenas = document.querySelector('.arenas');
    this.$formFight = document.querySelector('.control');
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
    if (firstPlayer.hp === 0 || secondPlayer.hp === 0) {
      this.createReloadButton();
      for (let item of this.$formFight) {
        item.disabled = true;
      }
    }

    if (firstPlayer.hp === 0 && firstPlayer.hp < secondPlayer.hp) {
      this.$arenas.appendChild(this.showResult(secondPlayer.name));
      generateLogs('end', secondPlayer, firstPlayer);
    } else if (secondPlayer.hp === 0 && secondPlayer.hp < firstPlayer.hp) {
      this.$arenas.appendChild(this.showResult(firstPlayer.name));
      generateLogs('end', firstPlayer, secondPlayer);
    } else if (firstPlayer.hp === 0 && secondPlayer.hp === 0) {
      this.$arenas.appendChild(this.showResult());
      generateLogs('draw');
    }
  }

  enemyAttack = () => {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
      value: getRandom(HIT[hit]),
      hit,
      defence,
    };
  }

  playerAttack = () => {
    const attack = {};

    for (let item of this.$formFight) {
      if (item.checked && item.name === 'hit') {
        attack.value = getRandom(HIT[item.value]);
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
      window.location.reload();
    });

    $reloadWrap.appendChild($reloadButton);
    this.$arenas.appendChild($reloadWrap);
};

  addPlayers = () => {
    this.$arenas.appendChild(createPlayer(firstPlayer));
    this.$arenas.appendChild(createPlayer(secondPlayer));
  }

  addFormSubmit = () => {
    this.$formFight.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const enemy = this.enemyAttack();
      const player = this.playerAttack();

      if (enemy.hit !== player.defence) {
        firstPlayer.changeHP(enemy.value);
        firstPlayer.renderHP();
        generateLogs('hit', secondPlayer, firstPlayer, enemy.value);
      } else {
        generateLogs('defence', firstPlayer, secondPlayer)
      }

      if (player.hit !== enemy.defence) {
        secondPlayer.changeHP(player.value);
        secondPlayer.renderHP();
        generateLogs('hit', firstPlayer, secondPlayer, player.value);
      } else {
        generateLogs('defence', secondPlayer, firstPlayer)
      }

      this.fightResult();
    });
  }

  start = () => {
    this.addPlayers();
    this.addFormSubmit();
    generateLogs('start', firstPlayer, secondPlayer);
  }
}
