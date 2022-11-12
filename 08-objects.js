'use strict';

/** Объекты */
// Записываются через {} или как переменная new Object
// let obj = new Object(); - но такая запись крайне редко используется, в силу её технических неудобств.

let options = {
  width: 1920,
  height: 1080,
  company: 'Samsung',
};

// Чтобы получить свойство объекта, можно сделать это через ".", либо через "[]".
console.log(options.company);

// Добавление свойств в объект:
options.boolean = false;
console.log(options);
options.countriesToBuy = {
  firstCountry: 'USA',
  secondCountry: 'China',
  thirdCountry: 'Russia',
};
console.log(options);

// Удаление свойств из объекта:
delete options.boolean;
console.log(options);

// Для перебора свойст в объекте мы можем использовать специальный цикл: for in
// "key" означает ключ для каждого свойства в объекте.
for (const key in options) {
  console.log('Свойство ' + key + ' имеет значение ' + options[key]);
}

// Сперва указываем, что мы будем работать с объектом, далее уточняем через точку, что мы будем работать с его ключами. Далее в скобках прописываем тот объект, который хотим передать. Далее через точку "length", чтобы посмотреть количество свойств объекта.
console.log(Object.keys(options).length);

// Также в объект можно записать и функции. Тогда они называются методами объекта.
