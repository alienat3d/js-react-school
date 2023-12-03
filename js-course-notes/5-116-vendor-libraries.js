'use strict';

// * === Перечень полезных библиотек === * \\

// == Слайдеры ==

// * Slick (jQuery) — отличный и надёжный, но требует jQuery. (Желательно использовать только в случае, если у нас и так на проекте подключен jQuery)
// * Owl Carousel 2 — быстрый слайдер, но требует jQuery.
// * Tiny Slider 2 — быстрый слайдер, не требующий jQuery.
// * Swiper — наверное самый популярный на текущий день слайдер на нативном JS.
// * Glide JS — ещё один стильный слайдер на нативном JS.

// == Галерея ==

// * Galleria — библиотека для создания галерей.
// * Fotorama — библиотека для создания галерей.

// ===> Другие библиотеки:

// * Leaflet — Интерактивные, адаптированные и легковесные карты. Бесплатная альтернатива Я.Картам и Google Maps.

// * D3 (Data Driven Documents) — Не самая проста в освоении, но полезная библиотека для создании инфографики

// * Three.js — Создание 3D объектов и анимаций.

// * Immutable.js — Есть такое понятие, как «иммутабельность» (или неизменяемость данных). Оно даёт нам уверенность, что модификация объекта даёт нам новую изменённую копию, а не изменит старую. Это даёт ряд преимуществ, например мы можем просто отслеживать изменения, как это происходит со state или virtualDOM в библиотеке react. Также становится гораздо проще это всё тестировать. А также ряд других плюсов (подробнее в статье в ссылках). И вот, когда мы работаем с таким принципом, то нам не обязательно прописывать такие конструкции в ручную, достаточно воспользоваться данной библиотекой.

// * Hammer.js — Библиотека для работы с жестами и прикосновениями на мобильных устройствах.

// * Moment.js — Библиотека для работы с датами и временем. (Может даже работать на backend в связке с NodeJS)

// * Highlight.js — Библиотека для работы с красивой подсветкой цитируемых участков кода на сайте.

// * Voca.js — Библиотека для удобной работы со строками. Очень много разных преобразований строк, включая даже латинизацию кириллических и других шрифтов.

// * Lodash — Библиотека для удобной работы с математическими операциями и функциями.

// * Axious JS — Более удобная работа с запросами на сервер.

// |===:===:===:===>
/** links:
 * (Слайдер «Tiny Slider 2»): https://ganlanyuan.github.io/tiny-slider/
 * (Слайдер «Owl Carousel 2»): https://owlcarousel2.github.io/OwlCarousel2/
 * (Слайдер «Slick»): https://kenwheeler.github.io/slick/
 * (Создание галерей): https://galleriajs.github.io/
 * (Создание галерей): https://fotorama.io/
 * (Интерактивные, адаптированные и легковесные карты): https://leafletjs.com/
 * (Создание инфографики): https://d3js.org/
 * (Создание 3D объектов и анимаций): https://threejs.org/
 * (Работа с принципом иммутабельности объектов): https://immutable-js.com/
 * (Статья про иммутабельность на Хабре): https://habr.com/en/companies/developersoft/articles/302118/
 * (Работа с жестами на мобильных устройствах): https://hammerjs.github.io/
 * (Работа с датами и временем): https://momentjs.com/
 * (Работа подсветкой вставок участков кода на сайте): https://highlightjs.org/
 * (Работа со строками): https://vocajs.pages.dev/
 * (Работа с математическими операциями): https://lodash.com/
 * (Компоненты для разработки сайтов): https://nisnom.com
 * */