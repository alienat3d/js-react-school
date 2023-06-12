/** Условия (if ... else ...) */

// Преобразует в булевские значения.
if (2 * 4 == 8) {
  console.log('It works!');
} else {
  console.log("It doesn't work.");
}

if (false) {
  console.log('It works!');
} else {
  console.log("It doesn't work.");
}

// Мы можем также проверять на несколько условий:

let num = 50;

if (num < 49) {
  console.log('Маловато!');
} else if (num > 100) {
  console.log('Многовато!');
} else {
  console.log('В самый раз!');
}

// Тернарный оператор (тернарный, потому что испольуются 3 аргумента)
// Сперва условие (num == 50), далее, после значка '?' выполнится кусок кода, в случае успеха проверки, а после ':' выполнится кусок кода, в случае, если условие не верно.
num == 50 ? console.log('Верно') : console.log('Не верно');

// Модификация условия switch.
switch (num) {
  case num < 49:
    console.log('Маловато!');
    break;

  case num > 100:
    console.log('Многовато!');
    break;

  case 50: // А не num == 50*
    console.log('В самый раз!');
    break;

  default:
    console.log('Выводится, если ни одно их условий не выполнилось.');
}
