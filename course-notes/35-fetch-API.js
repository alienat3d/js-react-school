'use strict';

// * === Fetch API === * \\
// * Что же такое API (Application Programming Interface) или программный интерфейс. Также API — это внешний набор данных или какого-то функционала, которые предоставляет нам какой-то сервис или готовое решение.
// Самый первый API, что приходит в голову — DOM API для работы с DOM-деревом.
// Или например Google Maps API, предоставляющий нам сервис Google карт, вставлять их на сайт, как-то модифицировать или использовать их в какой-то своей логике. Или также есть API курсов валют или погоды.
// Также обобщённо можно сказать, что API - это какие-то методы и свойства, которые мы можем использовать. Или если взять практически любой смартфон, то у него в ОС уже встроен разный API, позволяющий получать доступ, например к функциям камеры, вибрации, к сенсорам и т.д. Интерфейс, с которым можно работать и даже его настраивать.
// * 1.0.0 Также и у браузера есть Fetch API, которое позволяет ему коммуницировать с сервером. И она активно использует промисы, что мы прошли на прошлом занятии. Для примера мы возьмём API JSONplaceholder - фейковый сервер для тестирования фронтенда без бэкенда.
// 1.0.1 Если никаких дополнительных параметров, кроме URL-адреса не указывать, то это у нас будет обычный GET-запрос данных с сервера по адресу, а также нам вернётся промис. И когда нам возвращается промис из какой-то функции, то мы соответственно можем его обработать цепочкой .then(), как это здесь и происходит.
// 1.0.2 Следующий за fetch() у нас идёт метод then(), который аргументом получает некий response, ответ в формате JSON. Следовательно, чтобы дальше его использовать в проекте нам нужно его трансформировать в обычный объект. Для этого мы раньше использовали JSON.parse(), но у fetch() уже есть встроенные возможности, которые позволяют быстро это сделать: берём response (ответ от сервера) и используем на нём метод json(). Кстати у fetch есть и другие методы, например text() и другие более редкие. Можно их использовать в зависимости от той задачи, которая перед нами стоит.
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then((response) => response.json())
  .then((json) => console.dir(json));

// * 1.1.0 Чтобы делать другие запросы, например POST или PUT делаем следующим образом, нам нужно немного изменить настройки. Ставим в атрибутах fetch после URL запятую и в {} указываем настройки, которые нам нужны. Он может содержать много настроек, но основными двумя непременными настройками являются method & body (тело объекта, который мы будем отправлять на сервер). 
// 1.1.1 Также желательно указывать и заголовки, определяющие какой контент мы отправляем.
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({ name: 'Jack', surname: 'Sparrow' }),
  headers: {'Content-type': 'application/json'}
})
  .then((response) => response.json())
  .then((json) => console.dir(json));

// ? Именно такой подход коммуникации с серверами используется в современной разработке, и как мы видим он куда проще и лаконичнее, чем XmlHttpRequest. Впрочем первый может ещё встречаться в старых проектах, т.ч. знания не были лишними.

// todo Теперь перейдём в project "Food" и изменим код на более современный Fetch API...

// |===:===:===:===>
/** links:
 *
 * */
