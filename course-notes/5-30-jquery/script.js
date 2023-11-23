'use strict';

// * === Библиотека jQuery === * \\

/* Если требуется лишь одна (или пара) какая-то анимация или манипуляция, то ради этого не стОит подключать jQuery. По следующим причинам:
1. Размер библиотеки, который часто даже больше, чем у react или VueJS, при том, что все фишки jQuery есть уже в нативном JS.
2. Использует императивный стиль (слишком конкретный) и совершенно не даёт "места для манёвров", делая код слишком зависимым от конкретной вёрстки. */

// ---- //

/* > Но не смотря на это она "жива".

Всё дело в реальном рынке, ведь до сих пор огромное количество веб-ресурсов, плагинов и технологий построено на jQuery. И мы скорее всего будем постоянно с ней сталкиваться. Ведь вряд ли кто-то будет тратить кучу денег и времени, чтобы переписывать старые проекты на нативный JS. */

// ---- //

// ? 1.0.0 Хотя jQuery можно подключить разными способами, например через CDN или скачав файл, но лучше всего установить его через NPM, к тому же у нас здесь настройки Webpack. Т.к. библиотека будет нужна для работы скрипта на продакшене, то укажем флаг "--save". (npm i jquery --save)
// ? 1.0.1 Теперь библиотека jQuery появилась в node_modules и мы можем использовать её у себя в скрипте:
import $ from 'jquery';

// * 1.1.0 Теперь мы можем использовать синтаксис jQuery. Для того, чтобы получить элемент со страницы, например кнопку:
// $('#btn');
// 1.1.1 Либо так:
const btn = $('#btn');
// todo 1.1.2 Получим ошибку "Uncaught ReferenceError: $ is not defined", но это абсолютно нормально. Ведь мы работаем с библиотекой. Но если мы будем импортировать не просто jquery, а сущность "$" из неё, то ошибка исчезнет.
console.log(btn);

// ---- //

// * 1.2.0 Итак, рассмотрим на практике.
// 1.2.1 Часто, если мы не ставим скрипту атрибут defer, то следует удостовериться, что DOM-структура загрузилась, прежде, чем применять к ней JS-код. В нативном JS используют событие DOMContentLoaded.
// ? JS
/* document.addEventListener('DOMContentLoaded', () => {
  // #code
}); */

// ? jQuery (вероятно уже устаревший, заменён на др. версию записи (см. ссылки))
// 1.2.2 Создадим такой функционал, что при наведении на первую кнопку у неё будет изменяться класс активности. Для этого в CSS-файле есть класс ".active" и его мы будем тогглить. И вот как это выглядит на jQuery:
// 1.2.3 Сперва мы обратимся к селектору-классу интересующей нас кнопки. И сообщить, что нам нужен именно первый элемент. Для этого в документации найдём, что нам нужно к классу дописать ":first".
// 1.2.4 Далее укажем, что будет использоваться событие hover, т.е. наведение на элемент.
// 1.2.5 Далее, с помощью this обращаемся к самому элементу, на котором произошло событие. Можно было бы сделать это также через объект события, но пока возьмём контекст вызова, чтобы вспомнить как он работает. А дальше мы будем тогглить класс (альтернатива нативному classList.toggle()).
// $(document).ready(function () {
/* $(function () {
  $('.list-item:first').hover(function () {
    $(this).toggleClass('active');
  });
}); */

// * 1.3.0 Ок, рассмотрим что-то посложнее. Когда мы кликаем на третью кнопку, то возьмём все чётные изображения по классу и скроем их с применением анимации из библиотеки jQuery.
// 1.3.1 Метод on() - аналог addEventListener, хотя есть и просто метод click(), аналог onClick() в нативном JS.
$(function () {
  $('.list-item:first').hover(function () {
    $(this).toggleClass('active');
  });
  // 1.3.1 Сделаем фильтр для обращения именно к третьей кнопке.
  // 1.3.2 Обратимся к изображениям через класс и чтобы взять только чётные изображения используем фильтр ":even". Причём "чётный" здесь имеется в виду индекс, а значит всё будет наоборот первое изображение - чётный индекс 0, второй нечётный - 1.
  // 1.3.3 А также добавим анимацию скрытия fadeToggle()
  $('.list-item:eq(2)').on('click', function () {
    $('.image:even').fadeToggle('fast');
  });
  // * 1.4.0 Пример, когда мы анимацию прописываем вручную, используя метод animate(). В объекте указываем настройки анимации, что прозрачность и высота будет переключаться от 0 до 100% и после запятой укажем длительность этой анимации (3 с).
  $('.list-item:eq(4)').on('click', function () {
    $('.image:odd').animate({
      opacity: 'toggle',
      height: 'toggle',
    }, 3000);
  });
});

// |===:===:===:===>
/** links:
 * https://cdnjs.com
 * https://jquery.page2page.ru
 * https://page2page.lohmach.info
 * https://youtu.be/ENGZC0bwjEM
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
 * https://api.jquery.com/ready/
 * */