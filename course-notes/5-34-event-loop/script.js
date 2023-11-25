'use strict';

// todo [см. также 52-event-loop.js]
// * 1.0.0 Рассмотрим в подробностях что здесь происходит.
const btn = document.querySelector('button');
// 1.0.1 Здесь происходит навешивание обработчика события и этот код происходит синхронно. Потому что само навешивание обработчика это синхронный код. Итак после того, как мы навесим callback-функцию, вызывающую уже асинхронную функцию, выкидывающую по клику через 2 с сообщение в консоль. И эту функцию у нас будет хранить Web API, чтобы при нажатии пользователем кнопки её вызвать.
// 1.0.6 Ну, а кнопка ждёт, пока на неё нажмут и после нажатия отправит содержимое обработчика сперва в Call Queue, а далее выполнится в Call Stack.
// todo 1.0.7 [см example_2.jpg] Самое интересное, что если мы во время ожидания второго таймера (который на 5 секунд) покликаем много раз на кнопку, то Call Queue "забьёт" очередь перед второй функцией-таймером и та будет вынуждена ждать, прока выполнятся все опережающие её функции, чтобы сработать.
btn.addEventListener('click', () => {
  setTimeout(() => {
    console.log('You clicked the button!');
  }, 2000);
});
// 1.0.2 Далее идёт обычный console.log(), который сразу попадает в Call stack и выполняется сразу, когда до него доходит интерпретатор браузера.
console.log('Hi!');
// 1.0.3 Снова асинхронная функция-таймер setTimeout(), callback-функция и таймер которой попадает в Web API и запускает отсчёт 5 секунд.
setTimeout(() => {
  console.log('Click the button!');
}, 5000);
// 1.0.5 Ну и когда 5 секунд истекли, то console.log() внутри callback-функции попадает в Call Queque, а потом в Call Stack, т.е. вызывается.
// 1.0.4 А пока таймер ведёт отсчёт интерпретатор переходит дальше к следующей строчке с синхронным console.log() и тут же выполняет его, отправляя в Call Stack. И кстати, прежде, чем выполнится, любой синхронный код попадает сперва в Callback Queue и уже потом в Call Stack, таким образом, если туда попадают сразу несколько операций, то они выполняются в порядке очереди, как они туда попали во время чтения кода интерпретатором (сверху вниз).
console.log('Welcome to loupe.');

// * >==========< * //

// * 1.1.0 Для эксперимента рассмотрим также случай с перебором массива.
const array = [1, 4, 5, 6, 8, 3];
// 1.1.1 В Call stack попадает метод и внутри, console.log() для каждого элемента запускается отдельно. [см example_3.jpg]
// 1.1.2 Значит у нас есть в Call stack одно действие - метод forEach(), которое внутри себя запускает другие действия, но работает оно только внутри Call stack, а в Call Queue эти внутренние действия не попадают. И теперь, если нажать несколько раз на кнопку, то они будут послушно ждать, пока отработает метод forEach() и только тогда начнут запускаться.
array.forEach(element => {
  console.log(element);
});

// ? Отсюда можно сделать важный вывод: Если у нас на странице есть очень тяжёлая задача, которая работает внутри цикла или внутри перебирающего метода или подобное, то она может полностью остановить работу страницы.
// И если, например случилось так, что запустился т.н. Infinity Loop (бесконечный цикл), то в этом случае вкладка подвиснет и спустя время браузер предложит закрыть её, т.к. её Call Stack заблокирован этим циклом и никакие больше операции там невозможны. Т.к. любые новые операции будут добавляться в Call Queue и бесконечно ждать своей очереди, чтобы попасть в Call stack, чтобы выполниться.

// todo А теперь для эксперимента загрузим наш браузер [см script-inf-loop.js]

// * >==========< * //

// * 1.2.0 Рассмотрим ещё одну задачу, которую любят задавать на собеседованиях. «В каком порядке появятся сообщения в консоли?»
setTimeout(() => {
  console.log(1);
}, 0);

console.log(2);

// 1.2.1 Здесь обнаруживаем интересное явление, что сперва появится 2-ая, обычная синхронная, а уже потом так, что из setTimeout(), не смотря на 0-ой таймер. 
/* 1.2.2 Здесь есть 2 объяснения такого поведения: 
  1) Когда мы запускаем setTimeout(), даже если в таймере 0, он всё равно сперва попадёт в хранилище Web API, а уже потом идёт в Callback Queue. Поэтому синхронный код выполняется перед асинхронным, т.к. он идёт сразу в в Callback Queue -> Call Stack;
  2) Сам JS, когда видит в таймере значение от 0 до 3, то он автоматически подставляет туда 4 миллисекунды. Сделано это для совместимости с разными браузерами. Ведь невозможно предугадать как разные браузеры будут обрабатывать, когда мы в таймер поставим 0.
*/
// ? 1.2.3 Кстати, на практике может встретится такой костыль, когда в таймер ставят 0, чтобы выполнить операции сразу после синхронного кода. Например у нас есть синхронная операция по формированию элементов на странице. И вот из этих элементов нам нужно получить какие-то параметры, например ширину, которая уже была рассчитана на странице. И в таких случаях, чтобы чётко сформировать порядок. Когда будет сформирована структура, то после этого мы должны получить определённые значения и для этого используют setTimeout() с таймером в значении 0.

// ? Также стоит не забывать при работе с асинхронным кодом о полезных операторах async await.