'use strict';

// * === Модульная структура стандарта ES6+ === * \\

// ? Начиная с ES6 появилась возможность формировать модульную структуру с помощью специального синтаксиса. Эта структура даже более гибкая, чем более старого CommonJS.
// * Чтобы что-то экспортировать
export let one = 1;
// * Или в другом формате, т.н. «именованный синтаксис»
let two = 2;

export {two};

// * Также можно экспортировать и функции
export function sayHello () {
  console.log('Hello World!');
}

// ? Не суть важно каким из двух способов сущность будет экспортирована, главное это то, что у неё есть собственное имя, чтобы можно было её экспортировать.

// * Чтобы подключить значение переменной или функцию в другой файл используем import
// import {one, two} from './path';
// * Теперь мы можем использовать их в новом JS-файле, например:
// console.log(`${one} and ${two}.`);

// * Кстати, есть и дополнительные бонусы в таком синтаксисе. Когда мы что-то будем импортировать, то мы можем эту сущность сразу переименовать в самом импорте. Такой синтаксис используется, когда нам надо импортировать довольно длинное название, которое не особенно удобно читать и использовать. Например сущность "browserRouterDOM" можно переименовать в "router".
// import { browserRouterDOM as router } from "./scripts";

// * Также, мы могли бы взять и импортировать всё, что экспортируется из другого файла.
// import * as data from './scripts';
// Теперь к переменным "one" и "two" можно обратиться, будто это свойства объекта "data". Точнее импортирует по факту объект. И мы его деструктурировали на отдельные переменные "one" и "two".
// console.log(`${data.one} and ${data.two}.`);
// Или функцию вызвать, будто это метод объекта data:
// data.sayHi();

// * Кроме именованного синтаксиса есть также и экспорт по умолчанию. Он может быть только один на 1 JS-модуль. Например, если мы хотим, чтобы по умолчанию экспортировалась только функция sayHi();
export default function sayHi() {
  console.log('Hello!');
}
// И теперь, когда мы захотим куда-то импортировать этот файл, используя дефолтный экспорт. И это значит, что она просто напрямую экспортируется.
// import sayHi from './path...'
// И теперь её можно просто использовать.
sayHi();

// ? Однако и с таким синтаксисом нам всё равно понадобится сборщик модулей, т.к. браузер не понимает модульный JS.

// * Ещё есть такая интересная фича type="module" в теге <script>, чтобы браузер попытался использовать скрипты в качестве модулей. Для этого должны быть везде прописаны export & import, как мы разобрали только что. Тогда сперва мы подключим файл, где собственно сам код с функциями и переменными, которые мы подключаем, например "scripts.js", а за ним следует файл-точка входа, в который импортируем скрипты из scripts.js.
{/* <script type="module" src="./js/scripts.js"></script>
<script type="module" src="./js/index.js"></script> */}
// * На самом деле это не то, как надо подключать и реальной модульности тут не будет, а браузер будет просто последовательно подключать эти файлы, используя import & export. Ведь если модулей будет много, то их всех придётся подключать последовательно. И теперь прописывать в JS-файлах пути надо полностью, указывая .js на конце. И кстати, они также работают также, как если бы мы добавили им атрибут "defer".

// todo Также переведём JS-файлы нашего проекта "Food" в формат стандарта ES6.

// |===:===:===:===>
/** links:
 * https://largescalejs.ru/commonjs-modules/
 * https://webpack.js.org/configuration/devtool/
 * 
 * */
