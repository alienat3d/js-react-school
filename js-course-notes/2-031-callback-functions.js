// Callback-функция, это такая функция, которая запускается после выполнения другой функции. В качестве аргумента любая функция может взять другую функцию и вот она уже будет называться callback function.
function first() {
  // Что-то делаем
  setTimeout(function () {
    console.log(1);
  }, 500);
}

function second() {
  console.log(2);
}

first();
second();

function learnJS(lang, callback) {
  console.log('Я учу ' + lang);
  callback();
}
// Применение с анонимной функцией (которая исчезнет после вызова).
learnJS('JavaScript', function () {
  console.log('Я прошёл 3-й урок!');
});

// Callback-функцию можно задать и вне вызова функции:
function learnJS(lang, callback) {
  console.log('Я учу ' + lang);
  callback();
}

function done() {
  console.log('Я прошёл базовые уроки!');
}

learnJS('PHP', done);

// Callback-функции используются повсеместно например при работе с серверами или с событиями на странице.

// |===:===:===:===>
/** links:
 * (Глава учебника про коллбэк-функции): https://learn.javascript.ru/callbacks
*/