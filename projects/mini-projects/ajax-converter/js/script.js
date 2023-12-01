'use strict';
// * === Самая первая реализация AJAX-запроса, которая использует объект XML-HTTP request. === * \\
// ? Хотя он уже и устарел, но может встретится в старых проектах, поэтому знать всё же стоит.
// 1.0 Итак получим наши поля ввода на странице.
// * 1.1 Требуется такой функционал, что если мы вводим какое-то число в поле ввода для рублей, то на основании ответа от сервера и различных обработок скриптом его в поле ввода для долларов будет показываться результат конвертации валют.
// ? Разница между событиями "input" & "change": "change" возникает, когда input уходит из фокуса, а "input", когда что-то вводится или удаляется из input’а.
// 1.2 С помощью new XMLHttpRequest() создаём запрос на сервер для получения курсов валют.
// 1.3 Метод open() не смотря на название не открывает соединение между фронтендом и бэкендом, а собирает настройки, которые помогут сделать запрос на сервер.
/* 1.4.0 Принимает несколько аргументов: 
        1) method - используется для запроса (например GET, POST etc., записываются в верхнем регистре); 
        2) url - путь к серверу; 
        3) async - отвечает за асинхронность (по-умолчанию стоит в позиции true, но если вдруг для чего-то понадобится, то можно изменить на false, хоть такое почти никогда не нужно);
        4) login - логин;
        5) pass - пароль.
*/
// 1.4.1 Итак, два самых популярных метода GET & POST. GET — получает какие-то данные с сервера, а POST — соответственно отправляет данные на сервер\записывает какой-то результат в БД.
// ? Напоминание: асинхронность — это когда код запускается автономно, не заставляя остальную часть кода ждать его выполнения.
// 1.5.0 Когда отправляется запрос на сервер ему также необходимо сообщить что именно отправляется, какая это информация и в чём закодирована. Чтобы трансферные протоколы точно понимали что они передают и также сервер точно знал что он получает. Для подобно информации существуют т.н. "HTTP-заголовки" (подробнее в ссылке внизу). Используем заголовок для передачи JSON-файлов при помощи метода setRequestHeader().
// 1.5.1 В нём указываем, что у нас есть тип контента, далее указываем какой тип, для JSON — application/json и здесь же указать используемую кодировку (стандартную UTF-8).
// 1.6 Отправляем запрос методом send(). Если бы у нас был method 'POST', то здесь метод send() принимал бы также атрибутом некое тело сообщения body, но так как мы только запрашиваем данные, то здесь атрибута у нас нет.
/* 1.7 Также у нашего объекта XMLHttpRequest есть некоторые свойства, например:
        1) status — показывает текущий статус нашего запроса: 200, 404, 500 etc.;
        2) statusText — текстовое описание ответа от сервера;
        3) response — ответ сервера;
        4) readyState — текущее состояние запроса;
*/
/* 1.8.0 События объекта XMLHttpRequest:
        1) loadStart — начало загрузки;
        2) progress — прогресс;
        3) abort — отмена;
        4) timeout — таймаут;
        5) loadEnd — конец загрузки;
      и наиболее часто используемые:
        6) readystatechange — отслеживает статус готовности запроса в данный момент;
        7) load — сработает, когда запрос полностью загрузился и мы получили какой-то результат.
        ? Рассмотрим и 6 и 7, т.к. оба могут встретиться в каких-то проектах.
*/
const inputRur = document.querySelector('#rur'),
  inputUsd = document.querySelector('#usd'),
  inputEur = document.querySelector('#eur'),
  inputUah = document.querySelector('#uah');

inputRur.addEventListener('input', () => {
  const request = new XMLHttpRequest();

  // request.open(method, url, async, login, pass); - для примера
  // request.open('GET', 'https://ajax-currency-converter-default-rtdb.europe-west1.firebasedatabase.app/currencies.json');
  request.open('GET', 'js/currencies.json');
  request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  request.send();
  // 1.8.1 Проверяем значение свойства readyState у запроса, т.к. оно будет меняться несколько раз, то только при значении 4, т.е. "Done" и при этом статус запроса в значении "200" ("ОК", успешно получено).
  // 1.8.2 Тогда мы можем выполнять что-то в коде уже используя ответ response.
  // 1.8.3 Переводим ответ с сервера в подходящий для нас вид. Для этого создадим переменную data и используем метод JSON.parse() для перевода в нужный нам формат объекта.
  // 1.8.4 Пишем логику конвертации валют на основании данных, что нам пришли от сервера.
  /* request.addEventListener('readystatechange', () => {
    if (request.readyState === 4 && request.status === 200) {
      const data = JSON.parse(request.response);
      console.log(request.response);
      inputUsd.value = (+inputRur.value / data.currencies.usd).toFixed(2);
      inputEur.value = (+inputRur.value / data.currencies.eur).toFixed(2);
      inputUah.value = (+inputRur.value / data.currencies.uah).toFixed(2);
    } else {
      console.log('Oops, something went wrong!');
    }
  }); */
  // * 1.9 На самом деле довольно редко будет использоваться вариант с "readystatechange", т.к. нам редко понадобятся какие-то иные статусы готовности запроса и гораздо чаще будет использоваться "load". Т.к. он проще и сработает лишь раз, когда запрос полностью готов.
  request.addEventListener('load', () => {
    if (request.status === 200) {
      const data = JSON.parse(request.response);

      inputUsd.value = (+inputRur.value / data.currencies.usd).toFixed(2);
      inputEur.value = (+inputRur.value / data.currencies.eur).toFixed(2);
      inputUah.value = (+inputRur.value / data.currencies.uah).toFixed(2);
    } else {
      console.log('Oops, something went wrong!');
    }
  });
});
/* inputRur.addEventListener('input', () => {
  const request = new XMLHttpRequest();

  request.open('GET', 'js/currencies.json');
  request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  request.send();
  request.addEventListener('readystatechange', () => {
    if (request.readyState === 4 && request.status === 200) {
      const data = JSON.parse(request.response);
      console.log(request.response);
      inputUsd.value = Math.round(+inputRur.value / data.currencies.usd);
      inputEur.value = Math.round(+inputRur.value / data.currencies.eur);
      inputUah.value = Math.round(+inputRur.value / data.currencies.uah);
    } else {
      console.log('Oops, something went wrong!');
    }
  });
}); */
