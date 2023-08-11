'use strict';

// * === Символы нам нужны для того, чтобы создавать уникальные идентификаторы, чем они и являются. === *
// Символы это всегда что-то уникальное и не изменяемое. Применяются к свойствам объектов. Позволяют создавать скрытые при обычном доступе свойства.
// 1.1 Рассмотрим на практике. Сперва создадим объект.
// Мы знаем, что до этого всегда свойством объекта у нас были тип данных строка, но также свойством может быть и символ. Только эти 2 типа данных.
// 1.4.1 Мы можем создавать символы и по-другому, сразу внутри объекта.
const object = {
  dogName: 'Лада',
  [Symbol('pride')]: 'Kurzhaar',
};
// 1.4.2 И теперь, хотя при вызове объекта в консоли, показывается его содержимое, но теперь мы уже не можем обратиться к его свойству 'pride' - нам выводит undefined. Т.к. для того и придумали символы, чтобы создавать невидимые при обычном доступе свойства.
console.log(object);
console.log(object['pride']); // undefined

// 1.2 Теперь создадим символ, а после и свойство для объекта. В скобках укажем описание символа.
let id = Symbol('id');
// 1.3 Теперь нашему объекту назначим новое свойство со значением 1.
object[id] = 1;

console.log(object);
console.log(object['dogName']);
console.log(object[id]);
// Как можно заметить к символам мы обращаемся уже без кавычек, в отличие от строк.
let id2 = Symbol(); // Также символы можно прописывать пустыми.
// Так как символы всегда уникальны, даже если описания у них совпадают.
const id3 = Symbol('id');
console.log(id == id3); // false

// 1.5.1 Они также не покажутся и при переборе объекта. Попробуем перебрать объект с for...in:
for (const value in object) console.log(value);
// 1.5.2 Мы убедились, что символов нет. И это может быть очень удобно, если мы хотим создать в объекте скрытые приватные свойства.

// |==/—/===/—/==|

// 1.6 Также можно заранее объявить переменную, в которой будет находиться символ.
const idHobby = Symbol('hobby');

const professor = {
  name: 'Jake Saliwan',
  age: 45,
  isMarried: true,
  // [idHobby]: 'basketball',
  [Symbol('hobby')]: 'football',
  getHobby: function () {
    return this[idHobby];
  },
};

// console.log(professor.getHobby()); // Так мы создали метод по возвращению наружу скрытого свойства символа.

// 1.7 Но в JS есть уже встроенный метод, позволяющий добиться того же результата. При этом стоит заметить, что мы получаем массив, в котором будут содержаться все свойства с типом данных символ.
console.log(Object.getOwnPropertySymbols(professor));
// 1.8 Чтобы получить например первый символ в объекте (если бы у нас было их несколько), можем применить такую конструкцию.
console.log(professor[Object.getOwnPropertySymbols(professor)[0]]);

// |==/—/===/—/==|

// ? Уникальность и скрытность свойств типа данных "символ" позволяет нам быть уверенными в том, что оно никогда не будет случайно перезаписано.
// 2 В реальных проектах может быть тысячи строк кода и в какой-то момент может произойти неприятный момент перезаписывания свойства. Рассмотрим на примере:
const myAwesomeDB = {
  movies: [],
  actors: [],
  id: 123,
  // [2.1]:
  [Symbol("id")]: 123
}

// ... #Сторонний код библиотеки ...

// 2.1 Представим, что происходит ситуация, когда идёт обращение к myAwesomeDB, к его свойству id, случайно происходит перезапись. Но id у нас уникальный и должен оставаться неизменным. Так вот один из способов этого избежать - использовать символ.
myAwesomeDB.id = '321';

console.log(myAwesomeDB["id"]);
console.log(myAwesomeDB);

// |==/—/===/—/==|

// * === Глобальный реестр символов === *

// 3.1 Итак в предыдущем коде мы создавали каждый раз уникальный символ, также символы с одинаковым описанием. Это обычное поведение. Но иногда нам требуется, чтобы символы с одинаковыми именами были одной сущностью. Иначе говоря, чтобы одно описание символа строго соответствовало одной конкретному символу, насильно лишить их уникальности. В этом и поможет глобальный реестр символов.
const myDB = {
  teachers: [],
  students: [],
  class: 1,
  [Symbol.for('id')]: 33, // теперь "id" стал глобальным символом
  id: 55
};

// 3.2 Теперь обратимся к этому символу:
console.log(myDB[Symbol.for('id')]);

// |===:===:===:===>
// * Есть и ряд встроенных в JS символов, их список можно посмотреть тут: https://tc39.es/ecma262/#sec-well-known-symbols

// links: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Symbol