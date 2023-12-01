'use strict';

// * === Библиотека jQuery === * \\

// * 1.0.0 Первая и всеми любимая функция jQuery это функция $. Внутрь можно поместить любой селектор, по нему получить коллекцию элементов и применить какую-то операцию к каждому из этих элементов.
// ? jQuery
$('.my-container').css('border', '1px solid red');
// 1.0.1 На это нативный JS отвечает следующими методами:
// ? JS
document.querySelector('.my-container');
document.querySelectorAll('.my-container');

const myButtons = document.querySelectorAll('.button');
// 1.0.2 И здесь мы уже видим преимущества нативного JS, благодаря дополнительным атрибутам callback-функции index & array, она становится куда более гибкой, чем "функция $" от jQuery.
myButtons.forEach((button, index, array) => {
  button.style.color = 'red';
  console.log(`Номер элемента по порядку: ${index}`);
  console.log(`Внутри массива: ${array}`);
});

// * |=======> //

// * 1.1 Назначение обработчика события.
// ? jQuery
$('.button').on('click', () => {
  console.log('Hello world!');
});

// ? JS
const button = document.querySelector('.button');

button.addEventListener('click', () => { console.log('Hello world!'); });

// * |=======> //
// * 1.2 Работа с классами.
// ? jQuery
$('.button').addClass('active');
$('.button').removeClass('active');
$('.button').toggleClass('active');

// ? JS
const btn = document.querySelector('.button');

btn.classList.add('active');
btn.classList.remove('active');
btn.classList.toggle('active');
btn.classList.contains('active');

// * |=======> //
// * 1.3.0 Работа с анимацией.
// ? jQuery
$('.button').on('click', () => { 
  $('.box').slideToggle('slow');
});

// 1.3.1 Раньше jQuery будоражила умы разработчиков, позволяя создавать быстро симпатичную анимацию. Но CSS, как и JS тоже не стоял на месте и создание анимаций сильно упростилось. Не говоря уже о том, что в JS появился собственный метод для анимаций — animate().

// * |=======> //
// * 1.4 Другие мелкие операции, аналоги которых появились в JS.
// ? jQuery
const elements = $('.elements');

elements.each();
elements.map();
elements.closest();
elements[0].clone();
// и т.д. ...

// ? JS
const elems = document.querySelectorAll('.elements');

elems.each();
elems.map();
elems.closest();
elems[0].cloneNode(true);
// и т.д. ...

// * |=======> //
// * 1.5.0 Работа с AJAX
// ? jQuery
$.ajax({
  type: 'GET',
  url: 'server.php',
  success: function (msg) {
    alert('Получены данные: ' + msg);
  }
});

// ? JS
// 1.5.1 Когда-то в нативном JS был для этой задачи только объект XhtmlRequest(). Хорошая конструкция, но не слишком удобная. Поэтому jQuery долго выглядел более удобным со своим методом ajax(). Но потом в нативном JS появился метод fetch(), работающий на промисах, который стал ничуть не менее удобен, чем ajax().
fetch('server.php')
  .then(resp => resp.json())
  .then(resp => console.log(resp))
  .catch(err => console.log(err));