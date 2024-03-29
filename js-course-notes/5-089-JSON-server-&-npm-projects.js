'use strict';

// * === NPM-пакеты и JSON-server === * \\

// ? Все NPM-пакеты мы можем установить локально и глобально. Глобально — значит, что этот пакет будет работать вообще в любой части нашей системы, без привязки к проекту или папке, в которой мы его запустим. После установки раз глобально этот проект будет работать везде без дополнительной установки. Это полезно для каких-то проверяющих утилит, которым не важна привязка к какому-то проекту. ("npm i %package-name% -g") / (для MacOS дополнительно добавляем "sudo" в начале)
// * Но чаще всего мы будем устанавливать проекты локально. Таким образом мы запишем в package.json, что этот конкретный проект использует определённый пакет и даже можем при необходимости указать какую именно его версию. ("npm i %package-name%")

// ? Также нам нужно установить определённый флаг пакету, показывающий используется ли он только для разработки (dev) или используется он также и для работы нашего проекта на production.
// Если нам нужно указать, что пакет нужен только для разработки, то используем флаги: ("--save-dev") или ("-D").
// Иногда, намного реже, нам требует устанавливать пакет для работы проекта и после разработки, т.е. на production. Примеры: jQuery, react и т.п. (--save)

// ? Чтобы запустить JSON-server: Вводим в консоль json-server %путь к файлу базы данных%

// ? Также, при работе с JSON-server сперва запускаем обычный watcher, а потом JSON-server.

// todo Переходим к проекту "Food", а именно к файлу src/js/modules/classes.js. [с 3.0.0]

// |===:===:===:===>
/** links:
 * (Сервис JSON-server): https://github.com/typicode/json-server
 * (Политика выполнения скриптов): https://winnote.ru/security/160-windows-powershell-vypolnenie-scenariev-otklyucheno-v-etoy-sisteme.html
 * */
