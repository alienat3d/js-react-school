'use strict';

let array = [1, 2, 3, 4, 5];

// Метод удаления последнего элемента из массива pop()
array.pop();

// Метод добавления элемента в конец массива push()
array.push('7');

// Метод удаления первого элемента из массива shift()
array.shift();

// Метод добавления элемента в начало массива unshift()
array.unshift('1');

console.log(array);

// Перебираем элементы массива при помощи цикла for
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}

// Свойство length в массивах работает немного по-другому. В массивах могут находится элементы с разными порядковыми числами.
// Например действие ниже означает, что мы создаём 99-ый элемент в массиве.
array[99] = 'Apple'; // Грубая ошибка, так как обычно мы не должны строго указывать номер какого-то элемента в массиве. Все элементы должны быть по порядку, хотя бывают случаи, когда это не так. И всё же придерживаемся этого правила.
console.log(array.length); // length у нас тут возвращает не количество элементов в массиве, а последний индекс + 1.
console.log(array);

/** Ещё один цикл перебора "for each" */
let cities = [
  'Moscow',
  'Kyev',
  'Berlin',
  'Toronto',
  'Amsterdam',
  'Bangkok',
  'Dubai',
];

// Наша функция внутри forEach может принимать 3 аргумента: 1) "item" - это каждый элемент, что будет в нашем массиве; 2) "i"(или любое другое название) - номер нашего элемента; 3) "cities" — сам массив.
// Если в работе этой функции нам нужны только элементы, которые мы перебираем, то последние 2 аргумента нам не нужны. Если нужны порядковые номера каждого элемента, то оставляем только 1 и 2 аргументы.
cities.forEach(function (item, i, arr) {
  // Выводим в консоль порядковый номер элемента, конкатинируем с ": " и переменную "item", где находится значение элемента по номером i.
  console.log(i + ': ' + item + ' (массив: ' + arr + ')');
});

/** Более новый цикл "for-of" */
// Перебирает значения именно в том элементе, что мы берём. Не работает в объектах. Используется только на массивах, в строках и новых видах объектов map, set и т.д.
let nicknames = ['Al', 'Ketio', 'Nox', 'zer0c00l', 'Tr0y'];

// Выводит значения элементов в консоль. А если мы заменим "of" на "in", то выведит порядковые номера элементов.
for (let key of nicknames) {
  console.log(key);
}

for (let key in nicknames) {
  console.log(key);
}

// Существуют ещё несколько методов для трансформации массивов через callback-функцию. Но, честно говоря, используются они намного реже. Это filter(), map(), every(), some(), reduce().
// А вот более реальные, практические методы split(), join(), sort().
// Представьте, что мы получили большую строку.
// *Примеры*

// Переменная "answer" будет получать ответ от пользователя.
// Всё, что введёт пользователь через запятую, станет элементом массива.
let answer = prompt('', ''),
  newArray = [];

// В скобках у метода split() указываем в кавычках какой будет разделитель у указанных элементов, например запятая.
newArray = answer.split(',');
console.log(newArray);

// Но иногда мы хотим сделать наоборот, взять весь массив и отправить одной строкой.
// Это обратный split() метод, который берёт каждый элемент нашего массива и склеивает их в одну строку.
// Внутри скобок join() можно указать разделитель между элементами в нашей строке, например ", ".
let newArray2 = ['Jack', 'Daniels', 'Joe', 'Morgan', 'Bob', 'Marley'],
  i = newArray2.join(', ');

console.log(i);

// А если вдруг нам понадобится отсортировать элементы в массиве по алфавиту, то мы используем метод sort()
let s = newArray2.sort();

console.log(s);
// Изначально sort() сортирует всё по алфавиту и если это только строки, то всё ок, но вот если есть числовые значения, то могут появиться сложности. Просто дело в том, что этот метод сортирует элементы как строки, а не как числовые.
let numbersArray = [1, 2, 15, 25, 333, 9],
  sorting = numbersArray.sort();

console.log(sorting);
// Чтобы метод sort работал правильно с числовыми, нам нужно передать следующую callback function в метод sort(). Дело тут в логике самого JS, а именно "быстрой сортировке", которая сравнивает элементы на положительную или отрицательную разницу.
let numbersArray2 = [1, 2, 15, 25, 333, 9],
  sorting2 = numbersArray2.sort(compareNum);

function compareNum(a, b) {
  return a - b;
}

console.log(sorting2);

/** Ещё есть псевдомассивы — это объект, структура, которая совпадает со структурой массива, он хранит элементы в индексах, но при этом псевдомассивы не обладают методами, свойственными полноценным массивам из-за отличий в своём прототипе. У них нету всех этих методов, что мы выше разобрали. Например можно сформировать псевдомассив с набором элементов с одинаковыми тегами, к примеру.  */
