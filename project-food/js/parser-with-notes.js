'use strict';

// * === Пишем parser — скрипт для считывания данных с сайта, который можно потом использовать на любом сайте. === *
// ? Часто пишут следующую конструкцию для парсера сайта, чтобы удостовериться, что все элементы загрузились как следует:
// window.addEventListener('DOMContentLoaded', () => {});
// ? Но так как у нас у главного подключаемого к HTML JS-файла стоит атрибут defer, то можно этим пренебречь.
// * 1.0.0 Итак, сперва получим главный тег body со всем содержимым на странице.
// const parserFunc = () => {
const body = document.querySelector('body');
// 1.1.0 Теперь мы хотим увидеть только те дочерние теги, что входят в body. Через childNodes мы обратимся ко всем его потомкам.
// 1.1.1 Но нам бы хотелось показать не только прямых потомков body, но вообще всё древо потомков (элементов DOM-дерева). Здесь нам пригодится приём рекурсии. Мы переберём все узлы до тех пор, пока не наткнёмся на какой-то текстовый (конечный) узел (если такой будет).
// ? Напоминание: «Рекурсия» — это когда функция запускает саму себя.
// 1.2.0 Теперь мы body передадим в качестве аргумента функции recursion(), в консоль получим все ноды верхнего уровня (прямых потомков body), а дальше проверяем, что если элемент, который приходит в аргумент elem имеет более, чем 1 потомка, то мы запустим эту функцию заново и уже с тем потомком, который придёт в forEach переборе "node".
// 1.3.0 Получим только теги, без текстовых нод.
// * пример показывающий все ноды.
/* function recursion(elem) {
  elem.childNodes.forEach(node => {
    console.log(node);
    if (elem.childNodes.length > 1) { recursion(node);}
  });
}
recursion(body); */

// * 2.0.0 Теперь, когда мы парсим всю страницу нашим скриптом, то мы можем выполнять разные манипуляции с этими данными. Например представим задачу, что надо получить все теги заголовков, которые есть на странице, их содержимое и отправить эту информацию себе на сервер.
// ? Чтобы быстро получить нужный элемент в консоль, мы можем в DevTools сперва нажать Ctrl+Shift+C, выделить элемент и набрать в консоли "console.dir($0);", таким образом мы увидим все свойства нужного нам элемента.
// 2.1.0 Там мы находим подходящее нам свойство "nodeName".
// * 2.2.0 Теперь, чтобы отделить все теги от заголовков на странице. Т.к. nodeName приходит в виде строки, то к ней мы можем применять регулярные выражения. Применим метод match(), который будет возвращать либо true при совпадении с переданным во внутрь регулярным выражением, либо false.
// 2.2.1 В регулярном выражении мы описываем, что ищем только те случаи, когда у нас начало строки (для этого пишем "^") и "H" (т.к. заголовки в свойстве nodeName пишутся с большой буквы, как и все остальные теги), а дальше "\d" (т.к. мы знаем, что после заголовка у нас какое-то число (H1...H6)). Таким образом мы найдём строку, которая будет начинаться с H и после H будет какая-то цифра.
// * 2.3.0 Теперь, когда мы получили все заголовки, мы можем отправить эти данные на сервер. Для этого нам нужна переменная с пустым массивом внутри, куда мы будем их сохранять.
// 2.3.1 Далее методом push() мы будем отправлять текстовый контент заголовка в этот массив при нахождении тега, отвечающего регулярному выражению (т.е. заголовка).
// 2.4.0 Теперь отправим наши данные на фейковый JSON-сервер. Для этого нужно перевести наш массив в формат JSON.
let textNodes = [];

function recursion(element) {
  element.childNodes.forEach(node => {
    /*  * покажем без текстовых нод.
    if (node.nodeName === '#text') { */
    if (node.nodeName.match(/^H\d/)) {
      const object = {
        header: node.nodeName,
        content: node.textContent.trim()
      };
      textNodes.push(object);
    } else {
      recursion(node);
    }
  });
}

recursion(body);

fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  body: JSON.stringify(textNodes)
})
  .then(response => response.json())
  .then(json => console.log(json));

/* };
export default parserFunc; */

// Link to video: https://www.youtube.com/watch?v=wPG7RgPzxmM