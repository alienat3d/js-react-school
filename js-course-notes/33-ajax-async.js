'use strict';

// * === AJAX и асинхронная коммуникация с сервером === * \\
// ? AJAX - "Asynchronous Javascript and XML".
/*  Преимущества такого подхода:
      1) Это удобно и красиво смотрится, когда происходит интерактивная обработка любых событий без перезагрузки страницы;
      2) Ускорение реакции интерфейса — нет перезагрузки страницы, а идёт обновление только какой-то её части;
      3) Уменьшается нагрузка на сервер и экономим трафик пользователя.
    Недостатки:
      1) У пользователя должен работать JavaScript;
      2) При плохом соединении с интернетом может появляться некорректное поведение (что-то может не загрузиться, что-то может зависнуть и т.п.);
      3*) До 2017 года была проблема с SEO-оптимизацией.
*/
// * AJAX реализуется несколькими способами и мы рассмотрим их все от самого старого (не рекомендуется для новых проектов) и до самого современного.
// ? Для примера рассмотрим калькулятор конвертации валют (см. /mini-projects/ajax-converter/)


// |===:===:===:===>
/** links:
 * https://developer.mozilla.org/ru/docs/Web/API/FormData/Using_FormData_Objects
 * https://ilikekillnerds.com/2017/09/convert-formdata-json-object/
 * https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BA%D0%BE%D0%B4%D0%BE%D0%B2_%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F_HTTP
 * https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest/readyState
 * https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest
 * https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
 * */
