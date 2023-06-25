// Существует внегласное правило, что название функции должно быть глаголом с существительным к которому выполняется это действие.
// В круглые скобки мы ставим аргументы, с которыми и работаем, их может быть сколько угодно.
function showFirstMessage(text) {
  alert(text);
}

// Вызов функции
showFirstMessage('Hello World!');

// Если объявить переменную внутри функции, то и видна она будет только внутри неё.
function myTestFunction() {
  let num = 10;
}
// Так как переменная 'num' у нас является локальной (находится внутри функции), поэтому нам выдаст ошибку.
// console.log(num);

// Теперь переменная становится глобальной и мы её можем использовать внутри разных функций и изменять значение.
let number = 20;

function myTestFunction2(txt) {
  number = 10;
}

myTestFunction2();
console.log(number);

// Но может быть и другая ситуация:
let a = 5;

// Здесь переменная 'a' это совершенно другая переменная, чем 'a' снаружи функции.
function myTest() {
  // let a = 7;
  console.log(a);
}

myTest();
console.log(a);
// Что такое замыкание функции? Если внутри функции есть обращение к какой-либо переменной, функция сперва ищит эту переменную внутри себя. Если мы например вверху вызвали "console.log(a);", то сперва будет искать переменную "а" внутри этой функции, а потом уже во внешних переменных и так идёт до самого высшего уровня шаг за шагом.
// Замыкание — это функция со всеми её внешними переменными, которые ей доступны. Поэтому если мы удалим строчку "let a = 7;", то выведется "5" дважды. Потому что "console.log(a);" внутри функции сперва искал внутри своей функции, не нашёл такую переменную и пошёл искать выше вне фукнции.