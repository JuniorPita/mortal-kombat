import Api from './components/Api.js';
import { $parent, $player } from './constants/constants.js';
import { createElement } from './utils/utils.js';

function createEmptyPlayerBlock() {
  const el = createElement('div', ['character', 'div11', 'disabled']);
  const img = createElement('img');

  img.src = 'http://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png';

  el.appendChild(img);
  $parent.appendChild(el);
}

async function init() {
  localStorage.removeItem('player1');

  const api = new Api();
  const players = await api.getPlayers();

  let imgSrc = null;
  createEmptyPlayerBlock();

  players.forEach(item => {
    const el = createElement('div', ['character', `div${item.id}`]);
    const img = createElement('img');

    el.addEventListener('mousemove', () => {
      if (imgSrc === null) {
        imgSrc = item.img;
        const $img = createElement('img');
        $img.src = imgSrc;
        $player.appendChild($img);
      }
    });

    el.addEventListener('mouseout', () => {
      if (imgSrc) {
        imgSrc = null;
        $player.innerHTML = '';
      }
    });

    el.addEventListener('click', () => {
      localStorage.setItem('player1', JSON.stringify(item));

      el.classList.add('active');

      setTimeout(() => {
        window.location.pathname = './arena.html'
      }, 1000);
    });

    img.src = item.avatar;
    img.alt = item.name;

    el.appendChild(img);
    $parent.appendChild(el);
  });
}

init();
