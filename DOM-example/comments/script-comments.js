'use strict';

let box = document.getElementById('box'),
  btns = document.getElementsByTagName('button'), // [1]
  circle = document.getElementsByClassName('circle'),
  hearts = document.querySelectorAll('.wrapper .heart'), // [2]
  heart = document.querySelector('.heart'); // [3]

// [1]: Мы получим все элементы такого типа псевдомассивом. Вспомним, что псевдомассив, синтаксически это такой же массив, но без свойственных обычному массиву методов.
// [2.1]: 1) Преимущество 'querySelectorAll', за что он стал таким популярным, что он получает вложенности. Например есть класс 'wrapper' и внутри него есть класс 'heart' с сердечком.
// [2.2]: 2) Преимущество, что псевдомассив, полученный через 'querySelectorAll' имеет один метод forEach(). Позволяет перебрать нашу коллекцию по отдельным элементам и с каждым что-то сделать. Например изменить стили, назначить функции и т.д.
// [3] Работает, как и 'querySelectorAll', но только получает не все элементы с данным селектором, а самый первый.
console.log(btns);
console.log(btns[2]);
console.log(circle);
console.log(circle[1]);
console.log(hearts);
console.log(hearts[2]);
console.log(heart);
