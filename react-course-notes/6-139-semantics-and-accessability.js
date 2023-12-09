// * === Семантика и доступность (139) === * \\

// ? Семантическая вёрстка всё таки важна для SEO и поэтому не стоит про неё забывать. Многие разработчики этим грешат, особенно при разработке приложение, которое сильно непохоже на обычный сайт. Здесь нужно проявить смекалку и подумать: что будет шапкой, а что будет списком или что нужно сделать тегом aside?
// ? Часто бывает, что из-за некоторых ограничений и особенностей в Реакте мы можем сломать вёрстку или сделать её невалидной. Чаще всего это происходит со списками и таблицами — здесь нужно быть особенно внимательными и при необходимости пользоваться реакт-фрагментами. (см. 6-137) Все остальные правила, что были в вёрстках обычных сайтов переносятся и в приложения.

// ? Также важно помнить про доступность для людей с ограниченными возможностями, или например для тех, кто вынужден (или предпочитает) управлять сайтом с клавиатуры.

// |===:===:===:===>
/** links:
 * (Базовая документация): https://ru.reactjs.org/docs/accessibility.html
 * (Доклад про доступность): https://www.youtube.com/watch?v=KAK-WAb9vow&ab_channel=%D0%92%D0%B5%D0%B1-%D1%81%D1%82%D0%B0%D0%BD%D0%B4%D0%B0%D1%80%D1%82%D1%8B
 * (Доклад про семантику): https://www.youtube.com/watch?v=bDYEnNzprzE&ab_channel=%D0%92%D0%B5%D0%B1-%D1%81%D1%82%D0%B0%D0%BD%D0%B4%D0%B0%D1%80%D1%82%D1%8B
 * (Документация ARIA): https://developer.mozilla.org/ru/docs/Web/Accessibility/ARIA
 * (Статья про ARIA): http://prgssr.ru/development/ispolzovanie-aria-v-html5.html
 * (Про скринридеры): https://ru.wikipedia.org/wiki/%D0%AD%D0%BA%D1%80%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5_%D1%81%D1%87%D0%B8%D1%82%D1%8B%D0%B2%D0%B0%D1%8E%D1%89%D0%B5%D0%B5_%D1%83%D1%81%D1%82%D1%80%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%BE
*/
