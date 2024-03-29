'use strict';

// 2-41 - Задачи с собеседовании на понимание основ

// ? 1. Какое будет выведено значение: let x = 5; alert( x++ ); ?
// * 5. Потому, что у нас здесь постфиксная форма инкремента. Если бы была префиксная alert(++x); то вывод был бы 6.
let x = 5;

alert(x++);

// |==/—/===/—/==|

// ? 2. Чему равно такое выражение: [ ] + false - null + true ?

console.log([] + false - null + true);
// Разберём пошагово:
// Результат будет строкой, потому что, когда мы работаем с пустым массивом в подобных операциях, он будет приведён к строковому типу данных или к пустой строке "". Когда мы конкатенируем какой-то другой тип данных со строкой, то получим строку, в итоге на выходе имеем "false".
console.log(typeof ([] + false));
// Если мы проводим вычислительные операции на чём-то, что не является числами, то получим NaN.
console.log('false' - null);
// Ну и последняя конкатенация уже ничего не меняет, результат остаётся NaN.
console.log('false' - null + true);

// |==/—/===/—/==|

// ? 3. Что выведет этот код: let y = 1; let x = y = 2; alert(x); ?

let a = 1;
let b = (a = 2);

alert(a);
alert(b);

// Т.к. число у нас примитив, то и передаётся по значению. В итоге идём справа налево. а переназначается значением 2 и значение а передаётся также и b, т.е. и a и b становятся равны 2.

// |==/—/===/—/==|

// ? 4. Чему равна сумма [ ] + 1 + 2 ?

console.log([] + 1 + 2);

// "12", потому, что пустой массив становится пустой строкой (см. выше) и конкатенируя числа, мы делаем и их строками тоже.

// |==/—/===/—/==|

// ? 5. Что выведет этот код: alert( "1"[0] ) ?

alert('1'[0]);

// "1", потому, что мы здесь вызываем первый\нулевой элемент строки, а это 1.

// |==/—/===/—/==|

// ? 6. Чему равно 2 && 1 && null && 0 && undefined ?

console.log(2 && 1 && null && 0 && undefined);

// Оператор && "и" говорит нам, что и это и это и это значения должны быть true. Также вспоминаем правило, что "оператор и запинается на лжи, а оператор или на правде". Итак у нас выведется null, потому, что здесь это первое неправдивое значение слева направо.

// |==/—/===/—/==|

// ? 7. Есть ли разница между выражениями? !!( a && b ) и (a && b) ?

console.log(!!(1 && 2) === (1 && 2));

// Так как оператор !! переводит в булево значение, то они конечно не будут равны и между ними есть очевидная разница.

// |==/—/===/—/==|

// ? 8. Что выведет этот код: alert( null || 2 && 3 || 4 ); ?

console.log(null || (2 && 3) || 4);

// 3, потому что "и запинается на лжи, а или запинается на правде. Итак сперва по приоритетности идёт оператор &&, 2 и 3 у нас правда, значит остановится на последнем 3. Запомним это.
// Теперь смотрим первый оператор или "||", первое правдивое слева направо будет (2 && 3), значит результатом будет 3. Далее сравниваем 3 || 4, и первое правдивое 3 выводится в консоль.

// * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence#table

// |==/—/===/—/==|

// ? 9. a = [1, 2, 3]; b = [1, 2, 3]; Правда ли что a == b ?
const c = [1, 2, 3],
  d = [1, 2, 3];

console.log(c == d);

// Нет, потому, что c и d это две совершенно разные переменные и в них содержатся разные массивы, не смотря на то, что значения у них внутри могут быть одинаковыми.

// |==/—/===/—/==|

// ? 10. Что выведет этот код: alert( +"Infinity" ); ?

console.log(+'Infinity');

// Выводится просто Infinity, но тип данных будет number, т.к. у нас там ещё есть унарный плюс.

// |==/—/===/—/==|

// ? 11. Верно ли сравнение: "Ёжик" > "Ядро"?

console.log('Ёжик' > 'Ядро');

// Нет. При сравнении строк у нас идёт посимвольное сравнение: сначала сравниваются первые буквы и у двух строк, потом вторые и т.д. Если попадётся такая задача, то нужно открыть таблицу с символами юникода и посмотреть какие буквы под каким номером там находятся.

// |==/—/===/—/==|

// ? 12. Чему равно 0 || "" || 2 || undefined || true || false ?

console.log(0 || '' || 2 || undefined || true || false);

// 2. 0 в логическом контексте - false, пустая строка - тоже false, поэтому первое true у нас будет 2, оно собственно и выведется в консоль.

// |==/—/===/—/==|

// ? 13. В каком порядке выведутся следующие выводы в консоль?

console.log(1);

setTimeout(() => {
  
}, 2000);

setTimeout(() => {
  
}, 4000);

console.log(2);

// |==/—/===/—/==|

// ? 14. «В каком порядке появятся сообщения в консоли?»
setTimeout(() => {
  console.log(1);
}, 0);

console.log(2);

// |==/—/===/—/==|

// ? 15. «В каком порядке появятся сообщения в консоли?»

setTimeout(() => console.log('timeout'));

Promise.resolve().then(() => console.log('promise'));

console.log('code');

// |==/—/===/—/==|

// ? 16. «»