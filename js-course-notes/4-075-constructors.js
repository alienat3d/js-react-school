'use strict';

// * === Функции-конструкторы (или как устроены классы под капотом JavaScript'а) === * \\
// По классификации типов данных функция является объектом и потому в неё можно записать какие-то методы и свойства.
// Также существует длинный синтаксис для создания типов данных, который начинается с ключевого слова "new":
const num = new Number(3); // Хоть это и не совсем корректный синтаксис по созданию нового числа, но его тоже можно применять.
console.log(num);
// И также с функцией:
const func = new Function(3);
func();
// ! Этот синтаксис очень устарел и его не стоит использовать, но тем не менее он показателен для примера и тоже будет работать.
// И вот, если такая функция будет содержать методы и свойства, то она создаст нам объект. Значит, что создание новой функции создаёт новый объект, свойства которого уже прописаны в этой функции. Что-то напоминает? Вспоминаем урок по ООП (см. 10-object-oriented-programming.js).
// * ===>
// * 1.0 Итак, запишем уже в современном синтаксисе и разберём его.
// 1.1 Сперва создадим какую-то функцию User, которая будет принимать два параметра - name (чтобы задать имена наших пользователей) и id (уникальный идентификатор).
// 1.2 Внутри пишем свойство, которое будет отображаться также как и в объекте. Для этого используем ключевое слово "this", которое будет разобрано более детально в следующем уроке.
// 1.3 Представим, что для каждого пользователя мы будем указывать имя и его id-номер. А также запишем ещё одно свойство, которое будет общим для всех "human".
// 1.8.1 Однако кроме свойств мы можем записать и какие-то методы. Указываем "this", потому, что мы именно к этому имени обращаемся и у нас появится метод, пишущий фразу в консоль с выбранным именем. Потестим ниже.
function User(name, id) {
  this.name = name;
  this.id = id;
  this.human = true;

  this.hello = function () {
    console.log(`${this.name} says: "Hello!"`);
  };
}
// ? 1.4 Вот теперь, когда мы используем подобный синтаксис, то наша функция стала конструктором и с её помощью мы можем создавать новых пользователей. Рассмотрим на примере:
// 1.5 Внутри этой переменной уже не функция, а объект, т.к. функция User у нас стала конструктором. Теперь, когда она вызывается с помощью ключевого слова new, то она создаёт новый объект с теми свойствами, которые мы ей выше записали.
const al = new User('Al', 36);
// 1.6 И раз это конструктор, то можно также создать ещё объекты, которые будут отличаться.
const jack = new User('Jack', 27),
  simon = new User('Simon', 39);

console.log(al, jack, simon);
// 1.7 Такие вот функции у нас предназначены для конструирования объектов и создания множества подобных копий. Похожим образом мы делали и в уроке про ООП (см. 10-object-oriented-programming.js). Это такой прототип, от которого мы можем как бы отпочковывать потомков с одинаковыми свойствами. Кстати в таких функциях нам не нужен return, т.к. мы ничего не возвращаем.
// 1.8.2 Тест:
al.hello();
jack.hello();
// * ==| Свойство prototype |== *
// 2.1 Вспомним свойство "prototype". При помощи него мы можем добавить новые свойства или методы в наш конструктор и они будут прототипно наследоваться потомками. Этот приём используется, когда нет доступа к нашему прототипу, либо мы не можем его менять по каким-то причинам.
User.prototype.exit = function () {
  console.log(`Пользователь ${this.name} вышел из системы.`);
};
// 2.2 Теперь этот метод прототипно будет наследоваться всем потомкам, которые будут созданы после объявления этого метода.
jack.exit();
// ? 2.3 Заметьте, что мы указываем не прототип, как это было в setPrototype, когда одно наследуется от другого, а просто добавляем методы или свойства в уже существующий объект.

// * Конструкторы необходимы для создания новых однотипных объектов, таких как: новые пользователи сайта, товары в магазинах, ролики на ютьюбе или везде, где есть шаблонизация.
// Даже компоненты сайтов могут создаваться подобным образом. Допустим есть несколько слайдеров на одной и той же странице, но слайдеры разные, в одном случае 5 слайдов, в другом 10. Один с авто-переключением, другой без. И соответственно все эти параметры мы можем задать как аргументы конструктора и конструировать слайдеры, у которых будут одинаковые свойства. При помощи такой шаблонизации будет проще создавать элементы. Один раз пропишем прототип, а потом настраиваем его более гибко при вызове конструктора.
// ? Сейчас мы разобрали стандарт ES5 или то, как всё происходит внутри JavaScript. В стандарте ES6 появились также классы. Классы это красивая обёртка всего, что мы описывали в прототипе выше, но их удобнее использовать. Поэтому сейчас на реальных проектах создаётся с использованием классов.
// ? И если вдруг спросят, то можно сказать, что изначально классов не было и они появились только с ES6 в качестве "синтаксического сахара". В других ЯП это немного не так.
// А как же всё таки выглядят классы?
function Admin(name, id) {
  this.name = name;
  this.id = id;
  this.developer = true;

  this.wasHere = function () {
    console.log(`${this.name} was here today.`);
  };
}
class Admin2 {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.developer = true;
  }
  wasHere() {
    console.log(`${this.name} was here today.`);
  }
}
Admin();
Admin2();
// |===:===:===:===>
/** links:
 *  (Дока по функциям-конструкторам): https://learn.javascript.ru/constructor-new
 * */
