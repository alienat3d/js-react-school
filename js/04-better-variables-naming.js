const vehicleBodyWidth = 5000;
const vehicleBodyLength = 4000;
// Бывают также и такие варианты объявления переменных, но они менее удачны, особенно последняя из-за меньшей наглядности.
/* const vehicleBodyWidth = 5000,
         vehicleBodyLength = 4000; */
// const vehicleBodyWidth = 5000, vehicleBodyLength = 4000;

// #code

console.log(
  'Ширина кузова автомобиля: ' +
    vehicleBodyWidth +
    ', длина: ' +
    vehicleBodyLength
);

// Конечно слово "Body" можно было бы и опустить, тогда переменная стала бы немного лаконичнее, но только если у нас нет каких-то других параметров, например других частей автомобиля, у которых также есть ширина и длина.

// Бывают также случаи, когда названия переменных допустимо задавать как "a", "b", "data", "value" и т.п., ничего конкретно не значащие слова. В таких случаях переменные играют техническую роль. Приведём пару наглядных примеров:
// Представим, что у нас есть какая-то фирма и у неё есть список сотрудников.
const employees = ['Jack', 'Ron', 'Jerry', 'Al', 'Phil', 'Barbie'];
// И здесь мы с каждым сотрудником производим какое-то действие и чтобы указать, что мы обращаемся к сотруднику, мы можем указать всё что угодно "item", "person" или даже "a". Потому, что когда разработчик видит метод map(), то он сразу понимает, что внутри этого метода мы будем обращаться к каждому сотруднику. Т.е. за счёт знаний синтаксиса языка, можно понять, что внутри используется определённая структура и мы с любым неймингом понимаем что там происходит.
employees.map(item => {});

// Другой пример, мы обращаемся к серверу сайта, ожидаем ответ сервера и он передаёт нам какие-то данные. На момент получения нам не очень важно как они называются. И чаще всего их указывают просто как "data" или "response". Часто мы не знаем что именно нам вернёт сервер и поэтому называем абстрактно эти данные.

// Переменные в "UPPER_SNAKE_CASE" стилистики используют в основном для констант, которые нельзя изменять для правильной работы кода. Классический пример это цвета:
const COLOR_RED = '#F00'

// Есть ещё второй вариант в "camelCase", но с lodash вначале переменной, но смысл такой же, как и в предыдущем примере - "значения не менять!".
const _apiBase = 'https://gateway.marvel.com:443/v1/public/';

const _apiKey = 'apikey=d4eecb0c66dedbfae4eab4rg432c';

// Есть ещё т.н. "kebab-case", его часто используют для названий папок и файлов, но не для переменных.

// И последний это "PascalCase", его используют для названий классов в JS. У этих структур есть правило, что первая буква всегда должна быть заглавной.

// ? Смело создаём новые переменные, если понадобилось. Сэкономить ресурсов памяти почти не получится, зато переназначение переменных верный путь, чтобы запутаться и ухудшению читабельности кода.