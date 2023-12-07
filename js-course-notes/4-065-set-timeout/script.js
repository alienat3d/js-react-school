'use strict';

// * === setTimeout() - выполнение по таймеру (part 2) === * \\

// * Перейдём к практике с вёрсткой:
const button = document.querySelector('.btn');

let timer,
  iterator = 0;

// Реализуем для примера, как можно использовать setInterval() на странице, простенькую анимацию, которая так делалась давным-давно.
const myAnimation = () => {
  const element = document.querySelector('.box'); // наш синий квадрат, который будет анимироваться
  let position = 0; // переменная позиции с которой будет стартовать анимация
  // Также нужна функция, которая будет запускаться через определённый интервал времени.
  // Как определить, что анимация закончена? А сделаем мы это по переменной position, которая будет изменяться.
  const frame = () => {
    if (position === 300) {
      clearInterval(id);
    } else {
      position++;
      element.style.top = `${position}px`; // а для перемещения нам будет достаточно всего лишь пары инлайн-стилей.
      element.style.left = `${position}px`;
    }
  };

  // Также нам понадобится переменная для интервала, что будет двигать наш квадрат.
  const id = setInterval(frame, 5);
};

// Осталось лишь назначить обработчик события, запускающий нашу анимацию.
button.addEventListener('click', myAnimation);
// |===:===:===:===>
/** links:
 * https://learn.javascript.ru/js-animation
 * */
