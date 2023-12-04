'use strict';

// * === Регулярные выражения === * \\

// ? Эта технология позволяет удобно работать со строками: удалять, заменять части слов, искать какие-то кусочки строк, ограничивать ввод определённых знаков и многое другое.

// ? В целом эту технологию можно найти не только в JS и она применяется повсеместно, в других ЯП и технологиях.

// * 0.0 Любое регулярное выражение состоит из 2-ух частей: 1) паттерн (шаблон того, что мы ищем в строке или того, что нам нужно удалить или заменить и т.п.), 2) флаги.
// * 0.1 В JS есть несколько синтаксисов записи регулярных выражений:
// * 1) При помощи конструктора:
// new RegExp('pattern', 'flags'); - классический способ, которым крайне редко сейчас кто-то пользует, потому что есть другой, более лаконичный:
// * 2) "/pattern/flags"

// * 1.0 Рассмотрим на примере простого функционала поиска
// const ans = prompt('Введите ваше имя');

// 1.1 Допустим, что в этой строке нам нужно найти все буквы "n" нижнего регистра. Для этого создадим регулярное выражение.
// const reg = /n/ig;

// * 1.2 У строки есть метод search(), в который мы можем поместить паттерн нашего регулярного выражения.
// ? Выведется первый индекс (позиция) той литеры, что в паттерне регулярного выражения Если данная литера не будет найдена,то выведется "-1".
// console.log(ans.search(reg));

// * ==> 1.3 Если мы хотим искать что-то вне зависимости от регистра или мы хотим найти не только первую, а все, которые есть внутри строки. Для этих целей нужны флаги. Есть 3 классических флага, которые можно ставить в любом сочетании и порядке следования друг за другом:
// 1) i - не учитывать регистр;
// 2) g - все совпадения, а не только первое;
// 3) m - многострочный режим.

// * 1.4. Однако с методом search() флаг "g" уже не сработает, т.к. он всегда ищет только первое совпадение. Чтобы обойти ограничения search() нужно использовать другой метод match(). Работает схожим образом, ищет совпадение в строке с паттерном регулярного выражения, но уже умеет работать с флагом "g".
// console.log(ans.match(reg));

// * 1.5 Рассмотрим ещё один метод строк replace(), который заменяет один кусочек строки на другой. Первым аргументом принимает "что заменяем", а вторым — "на что заменяем". И в первый аргумент удобно поместить регулярное выражение. (Да, мы можем создавать регулярки прямо внутри аргумента.)
// const password = prompt('Password');
// ? "." — означает все элементы строки. Чтобы использовать точку как символ в регулярках, надо её экранировать символом "\" перед ней. Таких спецсимволов очень много и нужно искать их в документации по мере необходимости.
// console.log(password.replace(/./g, '*'));

// * 1.6 Ещё один пример с методом replace(). Представим, что нам нужно модифицировать строку таким образом, чтобы убирались все дефисы.
// console.log('12-34-56-78-90'.replace(/-/g, ':'));

// * 1.7.0 У регулярных выражений, как у объекта есть и свои спец. методы.

// * 1.7.1 Рассмотрим метод test() который тестирует есть ли в строке что-то похожее на указанный паттерн. И вернёт он нам булево значение.
// console.log(reg.test(answer));
// * ==> 1.8 Но иногда мы хотим искать не что-то конкретное, а целый класс символов: цифры, слова или пробелы. Для этого в регулярках есть понятие "классы":
/*  1) digits: \d - означает, что мы ищем только цифры;
    2) words:  \w - ищем только слова (буквы);
    3) spaces: \s - ищем пробелы. (кстати пробел это отдельный символ, который мы также могли бы искать в регулярках, по аналогии с другими символами)
*/
// const answer = prompt('What is your number?'),
//   reg = /\d/g;
// ? Подобный скрипт частенько требуется при работе с CSS, где мы принимаем строкой, например "200px", то мы можем забрать регуляркой только число 200 для дальнейших расчётов.
// console.log(answer.match(reg));

// * 1.9 Рассмотрим ещё один, более сложный пример. Задача вырезать имя робота из Star Wars, причём сделать это по определённому шаблону. Сперва нам нужно найти букву, потом цифру, потом букву и снова цифру.
const string = 'My name is R2D2', 
  robotName = string.match(/\w\d\w\d/i)[0];
console.log(robotName);

// * 1.10.0 == Обратные классы ==
// * 1.10.1 Иногда нам наоборот требуется найти всё, кроме чего-то. По аналогии с классами и записываются они также, только с большой литерой:
/*  1) digits: \D - означает, что мы ищем всё кроме цифр;
    2) words:  \W - ищем всё кроме слов (букв);
    3) spaces: \S - ищем всё, кроме пробелов.
*/

// todo Одно из применений регулярного выражения можно найти в парсере в проекте "Food" [project-food/js/parse.js], а также модифицированная версия [project-food/js/script.js]

// |===:===:===:===>
/** links:
 * (Документация RegExp): https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/RegExp
 * (Конструктор регулярных выражении): https://regex101.com/
 * (Статья Регулярные выражения): https://learn.javascript.ru/regular-expressions
 * */