'use strict';

// === Методы чисел === \\

// Округление чисел к ближайшему целому
const num = 12.2;

console.log(Math.round(num));

// Перевод в иную систему счисления
const test = "12.25px";

console.log(parseInt(test));
// Для перевода строки в число и возврата с дробными значениями, используем parseFloat()
console.log(parseFloat(test));