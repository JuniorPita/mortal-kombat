export function attack() {
    console.log(`${this.name} Fight...`);
};

export function elHP() {
    return document.querySelector(`.player${this.player} .life`);
};

export function renderHP() {
    this.elHP().style.width = `${this.hp}%`;
};

export function changeHP(randomHP) {
    this.hp -= randomHP;

    if (this.hp <= 0) {
        this.hp = 0;
    }
};

export const getRandomNumber = (min = 1, max = 20) => {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    );
};

export const createHTMLElements = (tag = 'div', className, content) => {
    const el = document.createElement(tag);

    if (className) {
        el.classList.add(className);
    }

    if (typeof content === 'string') {
        el.innerHTML = content;
    }

    if (Array.isArray(content)) {
        content.forEach((item) => el.appendChild(item));
    }

    return el;
};