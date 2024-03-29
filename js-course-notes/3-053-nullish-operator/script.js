// * === Оператор нулевого слияния === * \\

'use strict';

const box = document.querySelector('.box');
// 1.1 Но может так случится, что одного параметра не будет, поэтому подстраховки ради добавим проверку, если вдруг одного из параметров не будет существовать, то они должны заменяться на значения по умолчанию.
const newHeight = 200;
const newWidth = 500;
// 1.3 Однако бывают случаи, когда нам требуется значение 0, но если у нас одно из значений будет 0, то примется значение по умолчанию, т.к. 0 в JS это false. Конечно мы могли бы соорудить много проверок и это исправить, но можно воспользоваться оператором нулевого слияния. Его смысл в том, что он реагирует не на все false, а только на null или undefined.
// const newHeight = 0;
// 1.2 Для этого можно воспользоваться оператором "или" (||)
function changeParams(elem, h, w) {
  elem.style.height = `${h ?? 50}px`;
  elem.style.width = `${w ?? 50}px`;
  // [2] Тут мы говорим, что если у нас существует какая-то высота то мы его умножим на какую-то ширину. А если какого-то значения не будет, то будем брать 50. В этом примере, т.к. знак умножения имеет большую приоритетность, чем ??, то нам обязательно следует обернуть в скобки.
  elem.innerHTML = (h ?? 50) * (w ?? 50);
}

changeParams(box, newHeight, newWidth);

const num = 0;

console.log(num ?? 'username');

// * ==| Несколько нюансов этого оператора |== *
// Из этих операторов можно выстраивать цепочку для получения первого реально существующего значения. Иногда бывает, что операция зависит от нескольких параметров и нам необходимо, чтобы хотя бы один из них существовал.

let username;
let userKey;
// Тут JS проверяет слева направо сперва username, userKey и уже потом забирает строку, т.к. первые двое со значениями undefined.
// Также см. [2] выше.
console.log(username ?? userKey ?? 'la-la-la');

// * ==| Комбинация операторов вместе с логическими "&&" и "||" |== *
// Вообще конечно оператор нулевого слияния довольно похож на ||, хоть и со своими особенностями.
let a;
let b;
// Тут JS проверяет слева направо сперва username, userKey и уже потом забирает строку, т.к. первые двое со значениями undefined.
// Также см. [2] выше.
// Тут мы получаем уже ошибку, т.к. мы не можем использовать в одном выражении без скобок &&\|| и ??, это специально сделано, чтобы не запутаться. Правда со скобками совсем другое дело.
console.log((a || b) ?? 'abc');

// |===:===:===:===>
/** links:
 * (Документация по оператору нулевого слияния): https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
*/