export const getCurrentTime = () => {
  const time = new Date;

  return time.toLocaleTimeString();
};

export const getRandom = (number) => {
  return Math.ceil(Math.random() * number);
};

export const createElement = (tag, className) => {
  const $tag = document.createElement(tag);

  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
};
