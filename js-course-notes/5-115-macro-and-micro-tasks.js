'use strict';

// * === Макро- и микро-задачи (Macro- & Microtasks) === * \\

// todo [продолжение предыдущей темы из 5-114-event-loop.js]

// ? Макро-задачами называют задачи из очереди коллбэков (Callback queue).
// ? Микро-задачу лучше рассмотреть на задачке, которую могут дать на собеседованиях: «В каком порядке выполнятся нижеследующие команды?»
// * 1.0.0 Итак, у нас есть конструкция таймер с коллбэк-функцией выводящей в консоль сообщение. Второй аргумент с временем таймера мы не передаём, а только говорим какую функцию нужно выполнить.
setTimeout(() => console.log('timeout'));

// 1.0.1 Дальше обратимся к промису, который будет выполнятся с методом resolve(). Это способ записи, когда мы хотим чётко сообщить, что наш промис должен выполняться в положительную сторону.
// 1.0.2 Далее мы используем метод then() и выполняем команду вывода сообщения в консоль
Promise.resolve().then(() => console.log('promise'));

queueMicrotask(() => console.log('something in-between')); // ? за счёт команды queueMicrotask попадает в очередь микро-задач.

Promise.resolve().then(() => console.log('promise2'));

console.log('code');

// 1.0.3 Итак, рассмотрим подробнее пример сверху: здесь у нас есть две асинхронные операции и одна синхронная. И по схеме Event loop мы уже знаем, что setTimeout и Promise попадут сперва в Web API, а синхронный код выполнится сразу и первым. Но с первыми двумя происходит более интересная вещь: не смотря на то, что Promise стоит в очереди вторым, но его сообщение отобразится перед seTimeout(). И суть этой задачи в том, что методы промиса then(), catch(), finally() и await относятся к микро-задачам
// ? 1.0.4 И дело в том, что после каждой макро-задачи, будь то асинхронных или синхронный код, браузер исполняет все задачи из очереди микро-задач перед тем, как выполнить следующую макро-задачу (или сделать что-то ещё, например, отобразить изменения на странице).
// 1.0.5 Получается у нас формируются очереди из макро-задач и из микро-задач.

// * 1.1.0 Схематично можно представить это следующим образом:
/* 
  1) Выполнение какой-то макро-задачи.
  2) Выполнение всех микро-задачи из then/catch/finally/await*.
* Обратим внимание, что выполняются все запланированные микро-задачи перед переходом к следующему шагу цикла событий. Это гарантирует, что общее окружение страницы остаётся одним и тем же между микро-задачами (не изменены координаты мыши, не получены новые данные и т.п.).
  3) Рендеринг страницы.
  4) Следующая макро-задача*.
* Если во время выполнения этой задачи накопились ещё какие-то микро-задачи, то дальше будут выполняться все они. И снова рендеринг страницы и снова макро-задача и т.д.
*/

// ? 1.2.0 Существует также возможность самим запускать микро-задачи (код, который выполнится после макро-задач), но до рендеринга страницы. Делается это при помощи команды queueMicrotask. (пример выше)

// |===:===:===:===>
/** links:
 * (Статья из учебника): https://learn.javascript.ru/event-loop
 * */
