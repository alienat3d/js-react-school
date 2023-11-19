'use strict';

// * === Модульный Javascript === * \\

// ? Разбитие кода на отдельные логические части с каким-то своим функционалом называется модульностью.

// * Зачем это делается?
/*  1) Удобство чтение и понимания кода;
    2) Удобство нахождения функционала для его дальнейшей отладки;
    3) Модули самодостаточны и независимы, их можно перетаскивать из проекта в проект.
    4) Обеспечивают "чистоту глобального пространства". Когда мы объявляем переменные они заносятся в глобальную область видимости. Делать это не рекомендуется и глобальных переменных должно быть как можно меньше.
    5) Помогают избегать конфликтных ситуаций с одинаковыми именами переменных и функций. Ведь все сущности модуля существует только в его личной области видимости. 
*/
// * 1.0 Существует несколько способов сделать JS модульным. Сейчас на практике пользуются классами, как мы видели в предыдущем уроке про инкапсуляцию. Но приём модульности был придуман ещё до создания классов, да и мы помним, что внутри там обычная функция. Для общего понимания и для возможных вопросах на собеседованиях рассмотрим два основных способа создания модулей через нативную реализацию.

// * 1.1.0 == Анонимная самовызывающаяся функция ==
const number = 1;
// ? Это интересный приём, позволяющий сразу же запустить написанную функцию и получить локальную область видимости. Внешние круглые скобки обязательно нужны, ведь без них мы бы получили function declaration, а такая функция не может быть анонимной. А в круглых скобках эта конструкция превращается в function expression и такое функциональное выражение может быть безымянным.
// 1.1.1 Здесь мы имеем дело с локальной переменной number внутри анонимной самовызывающейся функции и глобальной одноимённой переменной. Они друг о друге ничего не знают и ошибки тоже не будет. Выведутся обе. Это микро-пример модуля со своей областью видимости. При этом, когда внутри ведутся какие-то расчёты, то они доступны в любой части нашего скрипта.
(function () {
  let number = 2;
  console.log(number);
  console.log(number + 3);
} ());

console.log(number);

// * 1.2.0 == Создание объектного интерфейса ==
// 1.2.1 Здесь мы запишем модуль в переменную и в неё возвращаем методы доступные снаружи.
// 1.2.3 Внутри будет переменная, к которой доступа снаружи не будет. В неё поместим function expression. Она в локальной области видимости. Но можно использовать объектный интерфейс. Это когда мы из этой анонимной функции возвращаем объект. 
// ? Кстати, у нас была похожая структура в таймере. 
// 1.2.4 Когда мы возвращаем объект в него пропишем ссылку на нашу приватную функцию.
// * 1.2.5 Подытожим что тут происходит: Наша анонимная самовызывающаяся функция создала объект и с помощью этого объекта экспортирует только те методы и свойства, которые нам действительно нужны снаружи. Этот объект записывается в переменную user. И теперь снаружи мы можем обращаться к этим свойствам или методам. И с классами работает всё примерно также.
// ? Конечно, каждый раз прописывать такие конструкции не придётся, за нас это будет делать Webpack.
const user = (function () {
  const privat = function () {
    console.log('I’m private!');
  };

  return {
    sayHello: privat
  };
} ());

user.sayHello();
// |===:===:===:===>
/** links:
 * https://thecode.media/iife/
 * */
