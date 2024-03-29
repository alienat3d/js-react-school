'use strict';

// * ===/ Для взаимодействия с элементами на страницы есть понятие события. /===
// ? *** Событие — это сигнал от браузера, что что-то произошло, будь то изменения на странице, или нажатие клавиш или кнопок пользователем, или что-то ещё.

// ? События в JS выполняются в порядке очереди. Как только новое событие поступило, то оно добавляется в очередь независимо от других событий.

// Список самых популярных событий в JS: https://oddler.ru/blog/i63
// Полный список всех событий в JS: https://developer.mozilla.org/en-US/docs/Web/Events

// * Чтобы использовать любое событие, нам сперва нужно назначить обработчик события. Обработчик события - это функция, которая срабатывает как только события произошло.
// Примеры: по нажатию на кнопку бургер-меню - открывается соответствующее меню. По клику на кнопку "вернуть наверх страницы" у нас произойдёт прокрутка страницы вверх, по клику отправить форму у нас отправятся заполненная форма на сервер и т.д.

// В JS у нас есть 3 способа назначить обработчик события:

// 1) Использовать HTML-аттрибут, который записывается в аттрибуты тега. (Такой способ сейчас уже почти используют и не рекомендуется его писать в новых проектах)
// Иногда его можно встретить например во всяких метриках или тестовых кусках кода. Тогда его используют в основном, чтобы плохо разбирающиеся в коде люди могли его подключать.
// <button onclick="alert('clicked!')">Click me</button>

// 2) Использовать свойство DOM-дерева для событий. (Такой способ тоже почти не используется, т.к. у него есть изъяны по сравнению)
// Для начала нам требуется какой-то элемент на который мы будем вешать обработчик события.
const button = document.querySelector('#btn');

// Далее просто используем свойство DOM-дерева.
// button.onclick = function () {
//   console.log('First click');
// };
// Данный метод плох сразу по двум причинами: 1) Если мы повесить на этот элемент ещё один обработчик события, то он перезапишет предыдущий. Т.е. мы сможем повесить лишь один обработчик. Так, если у нас будем много кода, мы можем случайно его перезаписать и потерять предыдущий функционал. 2) Иногда обработчик события требуется удалить. Например, если мы хотим, чтобы после того, как событие произошло, с этим элементом уже нельзя было взаимодействовать. И если мы назначит обработчик события подобным способом, то удалить мы его уже не сможем.
// button.onclick = function () {
//   console.log('Second click');
// };

// 3) Этот способ мы будем использовать повсеместно. addEventListener() & removeEventListener(). Первым аргументом указываем в кавычках название события, вторым callback-функцию.
/* btn.addEventListener('click', () => {
  console.log('It’s a first click!');
}); */
// Но теперь, если мы повесим второй клик, то он отработает тоже.
/* btn.addEventListener('click', () => {
  console.log('It’s a second click!');
}); */
// Также можно в аргумент записывать абсолютно любое действие из доступного списка. Например, если мы хотим вывести в консоль сообщение, когда мышка будет входить и уходить за границы кнопки.
/* btn.addEventListener('mouseenter', () => {
  console.log('Mouse hovered on button!');
});
btn.addEventListener('mouseout', () => {
  console.log('Mouse out from button!');
}); */

// * Помимо этого нам иногда необходимо получит какие-то данные о том элементе, с которым мы взаимодействуем. Например, что за событие произошло, или что за элемент используется или например координаты элемента и т.д. Для этого есть специальный объект event (лучше записывать сокращённо, как "evt") и как любой другой объект в JS у него есть свойства. Его мы и передаём как аргумент в callback-функцию. Причём он будет всегда первым, остальные данные, если нужно указываем после него через запятую.
// btn.addEventListener('click', (evt) => {
// Теперь мы можем уже обращаться к свойствам самого объекта событий, например target выведет нам сам объект, по которому собственно был "пойман" клик. И теперь мы можем с ним что-то сделать, например удалить со страницы.
// evt.target.remove();
// });

// * Иногда у нас стоит задача также удалять обработчик событий с некоторых элементов, для этого у нас есть .removeEventListener(). Но при этом нужно помнить, что необходимо использовать именно ту функцию, которую назначали. Помните задачку, где мы сравнивали два массива с одинаковыми внутренностями и они были неравны? Вот и с функциями такая же ситуация, поэтому если мы в коде просто второй раз продублируем такую же функцию, то JS воспримет её как совершенно другую функцию, которая делает тоже самое. Это нужно запомнить.
// ? Поэтому, чтобы удалить какую-то функцию, нам нужно сперва вынести её в какую-то переменную.
const deleteElement = (evt) => {
  console.log(evt.target);
  // evt.target.remove();
};
// Теперь, после того, как мы её объявили как Function Expression (Функциональное Выражение), мы можем передать просто название функции.
// btn.addEventListener('click', deleteElement);
// Теперь мы можем удалить обработчик событий, т.е. JS перестанет на него реагировать. Это удобно, например, когда какой-то скрипт нужно выполнить лишь первый раз или до определённого результата.
// btn.removeEventListener('click', deleteElement);

// ---- ==//== ---- ==//== ---- ==//== ----
// Рассмотрим ещё пример
/* let i = 0;
const deleteBtn = (evt) => {
  console.log(evt.target);
  i++;
  // Сделаем условие при котором укажем, что, когда i достигнет значения 1, то этот обработчик перестанет действовать.
  if (i === 1) {
    btn.removeEventListener('click', deleteBtn);
  }
}

btn.addEventListener('click', deleteBtn); */
// ---- ==//== ---- ==//== ---- ==//== ----

// * ===/ Всплытие событий (не путать с всплытием переменных) /=== *

// Для демонстрации напишем кнопкам в HTML какую-то вложенную структуру и каждому элементу назначим событие.
// Получим элемент overlay.
const overlay = document.querySelector('.overlay');

const examineElement = (evt) => {
  console.log(evt.currentTarget);
  console.log(evt.type);
};

// Такое действительно случается не так уж редко, когда у нас есть, например, два элемента и один из них является родительским другому. При этом на обоих назначен обработчик события, который обрабатывает одно и то же действие.
// При этом событие сперва сработало на вложенном\дочернем элементе, а уже после поднялось на уровень вверх и сработало на родительском "".overlay". Это и называется "всплытие событий". Причём в консоль по команде console.log(evt.target); у нас выводится элемент по которому изначально производится событие, но это мы можем изменить, заменив свойство "target" на "currentTarget". Теперь у нас выводится в консоль и сама обёртка-родитель.
btn.addEventListener('click', examineElement);
overlay.addEventListener('click', examineElement);

// ---- ==//== ---- ==//== ---- ==//== ----

// * ===/ Отмена стандартного поведения функции /=== *
// Давно использовали return false; в конце функции, но это уже устаревший формат и сейчас это давно уже никто не использует. Теперь у нас есть специальный метод, который существует у объекта события "evt" preventDefault(). Заметим, что он указывается в самом начале обработчика событий.
// Для этого получим ссылку.
const link = document.querySelector('a');

link.addEventListener('click', (evt) => {
  evt.preventDefault();

  console.log(evt.target);
});
// ? Такое поведение очень часто используется особенно в веб-приложениях. Потому, что там довольно много ссылок, но при этом, по клику на них, нам не нужно каждый раз переходить на какую-то другую страницу, либо перезагружать страничку. И каждый раз мы будем использовать evt.preventDefault();

// ---- ==//== ---- ==//== ---- ==//== ----

// * Распространённая ошибка на которую попадаются новички.

// Например нам нужно навесить один функционал на множество элементов. Многие новички думают, что могут просто получить все нужные элементы через document.querySelectorAll(); и затем обратится к нему.
const buttons = document.querySelectorAll('button');

/* buttons.addEventListener('click', (evt) => {
  evt.preventDefault();

  console.log(evt.target);
}); */
// ! Но такой код работать не будет.
// Дело в том, что к переменной buttons мы не можем применить обработчик событий, т.к. в ней сейчас лежит не какой-то элемент со страницы, а псевдо-массив. Поэтому, чтобы повесить на каждый из элементов псевдо-массива обработчик событий, нам следует сперва этот псевдо-массив перебрать. Можно использовать конечно и обычный цикл, но так как мы получили псевдо-массив при помощи метода querySelectorAll(), то удобнее будет использовать метод forEach().
// ? Кстати также можно использовать и forOf(), но чаще будем использовать forEach().
buttons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    evt.preventDefault();

    console.log(evt.target);
  });
});

// ---- ==//== ---- ==//== ---- ==//== ----

// * У addEventListener() есть ещё третий аргумент, это объект "опции события".
// Почитать про все можно здесь: https://developer.mozilla.org/ru/docs/Web/API/EventTarget/addEventListener
// Наверное самая интересная из опций это "once". Оно указывает, что обработчик должен быть вызван не более одного раза после добавления. Если true, обработчик автоматически удаляется при вызове.
// ? Это классная альтернатива removeEventListener(), т.к. в этом случае уже не нужно прописывать такую сложную конструкцию.
// Например можем переписать код вместо:
/* let i = 0;
const deleteBtn = (evt) => {
  console.log(evt.target);
  i++;
  if (i === 1) {
    btn.removeEventListener('click', deleteBtn);
  }
}

btn.addEventListener('click', deleteBtn); */
// ...в подобном, укороченном виде:
const deleteBtn = (evt) => console.log(evt.target);

btn.addEventListener('click', deleteBtn, { once: true });

// |===:===:===:===>
/** links:
 * (Документация про addEventListener): https://developer.mozilla.org/ru/docs/Web/API/EventTarget/addEventListener
 * (Документация про removeEventListener): https://developer.mozilla.org/ru/docs/Web/API/EventTarget/removeEventListener
 * (Документация про объект события): https://developer.mozilla.org/ru/docs/Web/API/Event
 * (Простой список событий): https://oddler.ru/blog/i63
*/