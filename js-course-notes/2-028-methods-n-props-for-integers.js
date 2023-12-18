'use strict';

// === Методы чисел === \\

// Округление чисел к ближайшему целому
const num = 12.2;

console.log(Math.round(num));

// Перевод в иную систему счисления
const test = '12.25px';

console.log(parseInt(test));
// Для перевода строки в число и возврата с дробными значениями, используем parseFloat()
console.log(parseFloat(test));

// |===:===:===:===>
/** links:
 * (Документация про методы чисел): https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number
 * (Глава учебника про методы чисел): https://learn.javascript.ru/number
*/