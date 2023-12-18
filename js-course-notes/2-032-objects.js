'use strict';

/** Объекты */
// ? Объекты — это т.н. ассоциативные массивы, которые также присутствуют и в некоторых других языках, например в PHP.
// Записываются через {} или как переменная new Object
// let obj = new Object(); - но такая запись крайне редко используется, в силу её технических неудобств.

const options = {
  width: 1920,
  height: 1080,
  company: 'Samsung',
};

// Чтобы получить свойство объекта, можно сделать это через ".", либо через "[]".
console.log(options.company);
console.log(options['height']);

// Добавление свойств в объект:
options.boolean = false;
console.log(options);
options.countriesToBuy = {
  firstCountry: 'USA',
  secondCountry: 'China',
  thirdCountry: 'Russia',
};
console.log(options);
console.log(options['countriesToBuy']['thirdCountry']); // Обращение через двойные квадратные скобки к значению в объекте внутри объекта.

// Удаление свойств из объекта:
delete options.boolean;
console.log(options);

// Для перебора свойств в объекте мы можем использовать специальный цикл: for in
// "key" означает ключ для каждого свойства в объекте.
for (const key in options) {
  console.log('Свойство ' + key + ' имеет значение ' + options[key]);
}
// Чтобы избежать вывода object Object - что означает, что у JS не получилось вывести в виде строки объект, находящийся в другом объекте, то пропишем условие, что находя объект, JS запускал ещё один перебор.
// Представим, что нам нужно подсчитать количество ключей в объекте. Вот как это сделать: 1) добавим переменную, куда будем складывать значение счётчика counter.
let counter = 0;

for (const key in options) {
  // Проверим, что значение объект
  if (typeof options[key] === 'object') {
    for (const i in options[key]) {
      console.log('Свойство ' + i + ' имеет значение ' + options[key][i]); // Чтобы добраться до объекта внутри объекта итерируем найденный объект снова, но переменная уже должна быть другой, чтобы они не перекликались с key, затем, чтобы добрать к значению, используем двойные скобки.
      counter++;
    }
  } else {
    console.log('Свойство ' + key + ' имеет значение ' + options[key]);
    counter++;
  }
}
console.log(counter);

// Но такой способ кажется излишне перегруженным, должен же быть способ посчитать количество значений попроще? Да, тут поможет метод объекта. По сути, метод keys() берёт наш объект и на его основании создаёт массив, в котором все элементы это ключи перед значением.
// Сперва указываем, что мы будем работать с объектом, далее уточняем через точку, что мы будем работать с его ключами. Далее в скобках прописываем тот объект, который хотим передать. Далее через точку "length", чтобы посмотреть количество свойств объекта.
console.log(Object.keys(options).length);

// Также в объект можно записать и функции. Тогда они называются методами объекта.

// Пример для себя, чтобы закрепить:
const house = {
  flatsNumber: 10,
  householders: ['Jim', 'Jack', 'Zack', 'Marie', 'Judy', 'Ivan', 'Alex'],
  parkingLots: {
    Jim: 2,
    Jack: 1,
    Zack: 3,
    Marie: 4,
    Judy: 1,
    Ivan: 2,
    Alex: 0,
  },
  // makeTest является "методом объекта", который работает внутри объекта house.
  makeTest: function () {
    console.log('test');
  },
};

console.log(Object.keys(house).length);
console.log(house['parkingLots']['Jack'] + ' ' + house['parkingLots']['Judy']); // Но вообще говоря, не очень красиво выглядит, когда прибегаем к двойным скобкам, лучше использовать деструктуризацию для этого.
const { Jim, Jack, Zack, Marie, Judy, Ivan, Alex } = house.parkingLots;
console.log(Marie);

// |===:===:===:===>
/** links:
 * (Дескрипторы геттеры и сеттеры): https://learn.javascript.ru/descriptors-getters-setters
 * (Деструктуризация объектов): https://learn.javascript.ru/destructuring#destrukturizatsiya-obekta
 * (Объекты JavaScript в примерах): https://javascript.ru/tutorial/object/intro
 * (Глава учебника про for...in): https://learn.javascript.ru/object-for-in
*/