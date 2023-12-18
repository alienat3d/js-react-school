/* // * Операторы */

// Можно указывать сразу несколько переменных через запятую и с одним let.
let incr = 10,
  decr = 10;

// Разница между префиксным и постфиксным оператором, что в случае префиксного результат операции тут же выводится, а в случае постфиксного выводится старый результат, затем проводится операция сложения, вычитания и т.д. .
console.log(incr++);
console.log(decr--);

console.log(incr);
console.log(decr);

console.log(++incr);
console.log(--decr);

// Модуль — остаток от деления
console.log(5 % 2);

// Нестрогое сравнение по значению
console.log('5' == 5);
// Строгое сравнение по значению и по типу данных
console.log('5' === 5);

// 'И' (&&) и 'или' (||)

// '&&' в выражении выдаст правду, только если одно и другое (может быть больше двух) является правдивыми выражениями. А '||', если хотя бы один из них.
const isChecked = true,
  isClosed = false;

console.log(isChecked && isClosed);
console.log(isChecked || isClosed);

// Другой пример, смоделируем ситуацию, когда мы голодны и хотим купить French Fries & Hamburger. Если оба блюда есть в наличии, то мы будем полностью сыты, в коде будет выглядеть примерно так:
const hamburger = 5;
const fries = 0;

if (hamburger && fries) {
  console.log('Ура, наелся!');
} else {
  console.log('Остался голоден.');
}
console.log(hamburger && fries);

// Усложним пример. Предположим, я пришёл в ресторан с двумя друзьями. Все хотят съесть по стейку, а я один хочу ещё и картошки. В противном случае мы пойдём искать другой ресторан. Картошка должна быть хотя бы одна.
const steak = 3;
const cola = 1;
const potato = 10;

console.log(steak === 3 && cola && potato); // ? Возвращает результатом первое ложное значение, на котором он остановился, если работает с данными, которые не являются булиновыми. Ну, а если все из них будут верными, то вернёт последний, на котором сработает.
console.log(1 && 0);
console.log(1 && 5);
console.log(null && 7);
console.log(0 && 'Hello World!');
// ? "&&" запинается на лжи, а "||" запинается на правде.

// Можно было бы написать "fish === 1", но можно обойтись и просто fish, ведь если у нас правдивое выражение, то хотя бы одна рыбка точно есть.
if (steak === 3 && cola && potato) {
  console.log('Классно покушали!');
} else {
  console.log('Ищем другой ресторан!');
}

// А что если мы просто хотели бы посидеть поболтать, а еда уходит на второй план. Но ведь не за пустым столом сидеть! Так не пойдёт! Значит должно быть хоть что-то из меню в наличии.
// ? Запинается на первом правдивом значении, а если же всё неправда, то выведет последнее фальшивое значение.
const sushiRolls = 0;
const noodles = 0;
const greenTea = null;

console.log(sushiRolls || noodles || greenTea);

if (sushiRolls || noodles || greenTea) {
  console.log('Душевно сидим!');
} else {
  console.log('Пойдём отсюда!');
}

// Надо сдать отчёты от четырёх людей.
let johnReport, alexReport, samReport, mariaReport = 'Done!';

console.log(johnReport || alexReport || samReport || mariaReport);

// Комбинации операторов. Мы в магазине, и у нас следующие запросы: необходимо, чтобы было либо 3 ржаного хлеба и 2 булочки, или 3 пшеничного батона и 1 пирог.
const ryeBread = 3;
const wheatBread = 1;
const bun = 2;
const cake = 3;
// Приоритетность у && выше, чем у ||.
if (ryeBread === 3 && bun === 2 || wheatBread === 3 && cake) {
  console.log('Покупки прошли успешно!');
} else {
  console.log('Придётся идти в другой магазин!');
}
console.log(ryeBread === 3 && bun === 2);
console.log(wheatBread === 3 && cake);
// ? В JS есть 5 сущностей, которые всегда выдают false: 0, '', null, undefined, NaN. Всё остальное, включая строку с одним пробелом ' ', это true.

// Оператор отрицания "!", меняет значение на обратное, true → false и наоборот.
const isFalse = true;

console.log(!isFalse);
console.log('7' !== 7);

// У операторов есть приоритетность, например умножение идёт перед сложением. Но если поставить сложение в скобки, то приоритетность сложения увеличивается, как и в математике.
console.log((2 + 2) * 2 === 8);

// |===:===:===:===>
/** links:
 * (Побитовые операторы): https://learn.javascript.ru/bitwise-operators
 * (Таблица приоритетов операторов): https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table
 * (Алгебра логики): https://www.youtube.com/watch?v=ZgSx3yH7sJI
 * (Задачи): https://docs.google.com/document/d/1RDxwMg7pSI9QzhYU0sY59kyspI71r-3_hzJoSbHRk0I/edit?usp=sharing
 * (Приоритет операторов): https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
*/