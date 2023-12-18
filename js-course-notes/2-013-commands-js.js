// console.log("something");

// alert("Hello World!");

const answer = confirm('Are you agreed with deleting your drive C: ?');

console.log(answer);

const anotherAnswer = prompt('What is your name?', 'Жора');
// let anotherAnswer = prompt("What is your name?", ""); или с пустыми кавычками, если предложение ответа не нужно.

console.log(anotherAnswer);
console.log(typeof anotherAnswer);

const legalAge = +prompt('Вам уже исполнилось 18?', ''); // Знак плюс перед методом преобразует строки в числа.

console.log(legalAge + +5);

// Получаем ответы от пользователя методом prompt() и записываем ответы в массив по порядку.
const answers = [];

answers[0] = prompt('Как вас зовут?', '');
answers[1] = +prompt('Сколько вам лет?', '');
answers[2] = prompt('Кто вы по профессии?', '');

// Тестовый метод write(), заменяет всё содержимое на странице на то, что мы укажем в скобках.
document.write(answers);
console.log(typeof(answers)); // Object
console.log(typeof(null)); // Тоже object, официально признанная ошибка, с которой надо смириться.

// ? Кстати, такие команды как prompt(), alert(), confirm(), существуют только в браузере. Наша консоль в редакторе кода просто не в состоянии отобразить модальные окна для этих команд, потому просто выкинет ошибку. Тоже относится к document, window и т.д.

// |===:===:===:===>
/** links:
 * (Документация про document.write): https://developer.mozilla.org/ru/docs/Web/API/Document/write
 * (Документация про typeof): https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/typeof
*/