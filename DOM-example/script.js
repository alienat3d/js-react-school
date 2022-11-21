'use strict';

let box = document.getElementById('box'),
  btns = document.getElementsByTagName('button'), // [1]
  circle = document.getElementsByClassName('circle'),
  // hearts = document.querySelectorAll('.wrapper .heart'), // [2]
  hearts = document.querySelectorAll('.heart'),
  heart = document.querySelector('.heart'), // [3]
  wrapper = document.querySelector('.wrapper'); // [6]

// [1]: Мы получим все элементы такого типа псевдомассивом. Вспомним, что псевдомассив, синтаксически это такой же массив, но без свойственных обычному массиву методов.
// [2.1]: 1) Преимущество 'querySelectorAll', за что он стал таким популярным, что он получает вложенности. Например есть класс 'wrapper' и внутри него есть класс 'heart' с сердечком.
// [2.2]: 2) Преимущество, что псевдомассив, полученный через 'querySelectorAll' имеет один метод forEach(). Позволяет перебрать нашу коллекцию по отдельным элементам и с каждым что-то сделать. Например изменить стили, назначить функции и т.д.
// [3] Работает, как и 'querySelectorAll', но только получает не все элементы с данным селектором, а самый первый.

// Теперь поменяем текст квадрата на фиолетовый.
box.style.backgroundColor = 'purple';
btns[2].style.borderRadius = '50%';
circle[0].style.backgroundColor = 'red';
circle[1].style.backgroundColor = 'yellow';
circle[2].style.backgroundColor = 'green';

// Однако если нам нужно делать одинаковые действия с каждом из элементом, то тут нам пригодится цикл for().
// В скобках сперва задаём переменную итератор. Задаём условие для этого цикла. Теперь, мы хотим, чтобы наша переменная отрабатывала до того момента, пока у нас не закончатся элементы в массиве. Для этого пишем 'i < array.length'. Код сам определяет количество элементов в массиве и выполняет это действитие столько раз, сколько имеется элементов.
for (let i = 0; i < hearts.length; i++) {
  hearts[i].style.backgroundColor = '#196F3D'; // [4]
}
// [4]: Если мы посмотрим на условие, то изначально i = 0. Если мы подставим 0 в hearts[], то получим первый элемент массива. Потом выполнится какое-то действие, цикл пройдёт и перейдёт к следующему элементу (следующей итерации или повторению действия), так как у нас прописано в условии "i++".

// Теперь вспомним второе преимущество метода 'querySelectorAll', за что разработчики его так любят — метод forEach(). Есть более правильный и приятный способ, вместо того, чтобы писать цикл. Давайте его и применим.
// В скобках пишем callback-function, которая выполнится сразу после выполнения основной функции forEach, ведь forEach метод это тоже функция. Значит сперва выполняется функция forEach, а потом та, что записана у нас внутри.
// В круглых скобках callback function мы передадим три вещи. Сразу следует сказать, что они не все обязательны. Возможно например только первый использовать.
// 1-ый аргумент это каждый элемент, который мы хотим перебрать в нашем цикле forEach. Его можно назвать как угодно, главное чтобы эти названия аргументов не пересекались с названиями переменных, что у нас уже есть. Обычно это что-то вроде "item". Далее через запятую мы можем указать другие аргументы.
// 2-ым всегда идёт "i", то есть итератор (можно задавать как-то по-другому, но общепринято i). Этот аргумент тоже самое, что переменная в цикле for, это порядковый номер элемента.
// 3-им аргументом идёт массив, которым мы передаём в цикл. Однако его нужно назвать иначе, чем тот, который мы используем.
// hearts.forEach(function (item, i, changedHearts) {});

// Итак, если нам нужно только покрасить каждый item, т.е. фон сердечка в оранжевый цвет, то ни порядковый номер, ни массив нам не нужен.
hearts.forEach(function (item) {
  item.style.backgroundColor = '#E67E22';
});
// Сейчас выглядит это примерно одинаково с for(), но когда мы начнём обрабатывать действия пользователя на странице, этот метод будет гораздо удобнее.
//===//
// Очень часто части сайта создаются и генерируются при помощи JavaScript, на таких принципах построены например react, и мы должны уметь создавать новые элементы прямо на лету.
// Для того, чтобы создать элемент используется метод createElement().
let div = document.createElement('div'),
  text = document.createTextNode('Тут был Вася!'); // [5]

// [5]: В некоторых случаях нам надо создавать и текстовые узлы, это такие элементы без оболочек тега. Для этого используют метод глобального объекта document.createTextNode().

// Чтобы стилизовать наш <div> раньше существовало свойство className, но теперь не рекомендуется его использовать, так как его заменило свойство classList. В нём мы можем написать разные действия с нашим классом, такие как добавление, удаление, переключение, проверка на содержание или определение применённых классов к элементу. Пример:
div.classList.add('black');

div.innerHTML = '<b>Hello World!</b>'; // [7]
div.textContent = '<b>Hello World!</b>'; // [8]

// Но пока наш элемент <div> есть только в JS, в HTML его нигде нету. Воспользуемся нашим деревом DOM и изменим это. Любой элемент можно вставить в конец, вставить после определённого элемента, удалить или заменить, но только по отношению к родителю.
// Мы возьмём наш <div> и добавим его в конец <body>. Воспользуемся методом appendChild и в скобках пропишем элемент, который мы хотим вставить в конец <body>.
// document.body.appendChild(div);

// [6] Для того, чтобы наш <div> вставить во внутрь .wrapper, нам нужно воспользоваться другой командой.
// wrapper.appendChild(div);
// Теперь наш <div class="black"> внутри <div class="wrapper">.

// Так мы вставляем элементы в конец, но мы также можем вставить наш <div> и перед каким-то элементом, для этого будет полезен метод insertBefore(). Здесь есть уже два аргумента: 1) То, что мы вставляем; 2) То, перед чем мы вставляем.
document.body.insertBefore(div, circle[1]);

// Чтобы удалить элемент со страницы можно воспользоваться методом removeChild().
document.body.removeChild(circle[2]);
wrapper.removeChild(hearts[1]);

// Есть ещё метод replaceChild() для замены одного элемента другим. Здесь тоже два аргумента: 1) Новый элемент, которым мы будем заменять; 2) Старый, который будет заменён на новый.
document.body.replaceChild(btns[2], circle[1]);

//* Напоминание: Эти методы должны прописываться всегда по отношению к родительским элементам.

// Как добавлять текст или HTML-код в элементы? Метод "innerHTML" добавляет любой HTML-код на страницу.
// См. выше [7].
// [8]: Но если вдруг этот текст, который хотим вставить на страницу, мы получаем от пользователя, то чтобы обезопасить себя, и пользователь не смог бы вставить вредоносный код, чтобы быть уверенным, что появится только текст, используем другой метод — textContent().
