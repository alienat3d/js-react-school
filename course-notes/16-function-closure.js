'use strict';

// ? «Замыкание функции» — это функция, которая запоминает свои внешние переменные и сохраняет к ним доступ.

let number = 5;
debugger;

logNumber(); // = 5

function logNumber() {
  let number = 4;
  debugger;

  console.log(number); // = 4
}

number = 6;

logNumber();
debugger; // = 6

// ? Функция берёт "текущее" значение переменной (последнее на момент её вызова).

// ? Что значит «лексическое окружение» (lexical environment) ? В JS у каждой выполняемой функции, блока кода и скрипта есть, связанный с ними, внутренний, технический, т.е. скрытый от нас объект, который называется лексическое окружение. Оно делится на две части: на внутреннее и внешнее.
// * Внутреннее\локальное (environment record) - это объект, где в виде свойств хранятся все локальные переменные функции. И некоторые другие свойства, такие как значение this.
// * Внешнее\глобальное - это то, что соответствует коду снаружи этой функции и также является большим объектом.
// ? После того, как функция отработала её внутреннее лексическое окружение удаляется, т.к. функция отработала свой функционал и поэтому браузер освобождает память.

// ? Важно понять ещё такую особенность: каждый вызов функции - это создание нового лексического окружения со своими специфическими для этого вызова локальными переменными и параметрами.

// Пока вроде всё просто, но сложнее становится тогда, когда у нас появляются комбинации функций, в том числе возврат функции из другой функции. Логика остаётся той же - у каждой из них будет локальное и глобальное лексическое окружение.
// Рассмотрим очень подробно практический пример, который часто дают на собеседованиях.
// 1.1 В глобальной области создаётся createCounter и в неё записывается выполнение какой-то функции.
function createCounter() {
  // 1.3 В этом вызове функции будет создаваться новое локальное и глобальное лексическое окружение.
  let counter = 0; // 1.4 Для функционала счётчика создаётся переменная counter, которая изначально undefined и затем ей присваивается 0.
  // 1.5 Создаётся переменная myFunction со значением undefined и затем ей присваивается значение функции.
  // ? 1.6 И вот здесь создаётся замыкание, которое является частью этой функции. Это значит, что когда функция myFunction() будет вызвана, то у неё есть ссылка к counter. В лексическом окружении будет сохранена ссылка на нужную переменную.
  const myFunction = function () {debugger;
    counter = counter + 1;debugger
    return counter;debugger
  }; // Здесь уже используем function expression.
  // 1.7.1 Мы возвращаем содержимое переменной myFunction. Локальная область выполнения (внутреннее лексическое окружение) этой функции будет удалена, т.к. она выполнила функционал и больше не нужна. Но наружу будет возвращено описание этой функции (сам функционал), её замыкание, на что она ссылается. Это как рюкзак с переменными, которые были в области видимости во время создания функции. То есть myFunction() продолжит хранить ссылку на переменную counter, которая ей необходима.
  return myFunction;
}debugger;
// 1.2 Создаётся ещё переменная increment в глобальной области со значением undefined, затем ей присваивается вызов функции createCounter(). Теперь, когда мы будем вызывать функцию increment(), то нам будет возвращаться другая функция myFunction().
// 1.8 Теперь замыкание функции хранится в переменной increment.
const increment = createCounter();debugger;
// Значит функцию increment() мы можем использовать дальше, чтобы что-то создавать:
// 1.9.1 Теперь создаём новые переменные и присваиваем им новую функцию increment(), в которой замыкание функции myFunction(). И каждый раз будет создаваться новое лексическое окружение. Т.е. мы снова перемещаемся внутрь функции myFunction() [38 строка].
// 1.9.2 Далее функция increment() смотрит на переменную counter, существует ли такая переменная внутри этой функции? Нет, но когда мы создавали описание этой функции, мы сохранили ссылку на внешний counter [34 строка], ссылка на него до сих пор сохранилась. Потому вместо counter подставляется 0 к нему прибавляется 1, в итоге counter становится равен 1 и это значение возвращается.
// 1.9.3 В переменную counter записывается 1 и в с1 также возвращается 1.
const c1 = increment();debugger
// 1.10 Теперь повторяется всё тоже самое, с той только разницей, что в counter у нас уже 1, а не 0. Поэтому возвращается 2 и сам counter становится 2.
const c2 = increment();debugger
// 1.11 Аналогично и здесь, только результат будет уже соответственно 3.
const c3 = increment();debugger

console.log(c1, c2, c3);

// ? Итак, из этого всего мы можем усвоить, что когда создаётся функция myFunction(), то она сохраняет в себе ссылки на какие-то вещи, которые были ей доступны во время создания. Например здесь это переменная counter.

// Кстати лексическое окружение есть не только у функций, но и у любого блока кода
const test = {  
  msg: 'Hello',
}

console.log(msg); // msg доступен только внутри лексического окружения test и недоступен снаружи, т.к. существует только внутри блока в фигурных скобках.
// Та же самая логика и в условия и в циклах и т.д.

// На собеседованиях иногда встречается вопрос про цикл в цикле:
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    let num = 3;
  }
  console.log(num); // ? Q: Почему здесь мы не можем обратиться к num?
  // * A: Потому что num существует только внутри фигурных скобок внутреннего лексического окружения внутреннего цикла цикла, причём в каждой его итерации будет создаваться свой num и снаружи мы его получить уже не сможем.
}

// Links:
// https://learn.javascript.ru/function-object
// http://jsflow.org/docs/js-engines/