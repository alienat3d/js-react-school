'use strict';

// * === Создание собственных ошибок - "throw error" === * \\

// * 1.0.0 Итак, у нас тут данные в массиве, на основании которых мы формируем вёрстку на странице. Здесь у нас есть уникальный ID и название тега, который будем формировать и добавлять на страницу.
// 1.0.1 Синтаксически тут вроде бы нет никаких ошибок и код нормально отработает на странице без выдачи ошибок, но задача у нас, что у каждого блока должен быть ID для того, чтобы можно было именно к нему обратиться и для дальнейших взаимодействий. Т.е. логическое нарушение во втором элементе всё таки имеет место быть, т.к. там пропущен id.
// 1.0.2 По идее, если у нас какого-то id не существует, то на этапе формирования блоков мы должны получить ошибку и сделать что-то другое. Например сообщить разработчику об ошибке или предупредить пользователя. И тут пригодится умение формировать собственные ошибки. Для этого у нас есть специальный оператор, который генерирует ошибку "throw". И в качестве ошибки можно "выбросить" всё что угодно — строку, число или какой-то объект, но обычно используют встроенный класс под названием error. Именно его в большинстве случаев следует использовать.
const data = [
  {
    id: 'box',
    tag: 'div'
  },
  {
    id: 'nav',
    tag: ''
  },
  {
    id: 'circle',
    tag: 'span'
  }
];
// 1.0.3 Запишем условие, что если ID у blockObj не существует, то будем выбрасывать ошибку.
// * 1.2 Перенесём наш код в try...catch и исправим new Error() на new SyntaxError(), ведь несуществующий id это всё такие относится к синтаксису.
try {
  data.forEach((blockObj, index) => {
    const block = document.createElement(blockObj.tag);

    // if (!blockObj.id) throw 'Oops! An error!'; — пример выброса ошибки строкой
    if (!blockObj.id) throw new SyntaxError(`It seems that element #${index + 1} doesn’t have an ID!`);

    block.setAttribute('id', blockObj.id);
    document.body.append(block);
  });
} catch (error) {
  // * 1.3.0 Иногда оставляют возможность выбросить ошибки наружу за блок catch, если она серьёзная. В нашем случае это может быть отсутствие тега.
  // 1.3.1 Здесь нам уже пригодится условие, что если ошибка SyntaxError, то мы о ней просто сообщим в консоль, но если она другая, то это уже какая-то ошибка, которую мы не предполагали и возможно это какая-то серьёзная ошибка, о которой обязательно необходимо знать разработчику, тогда мы выбросим её уже за пределы блока catch.
  // 1.3.2 Или например бывает, что в одном try...catch внутри ещё один try...catch и тогда нам нужно будет также выбросить ошибку из внутреннего во внешний блок кода catch().
  if (error.name) {
    console.error(error.message);
  } else throw error;
}

// * 1.1.0 На самом деле new Error() — это общий конструктор ошибок, но существуют и более специфические. На прошлом уроке (про конструкцию "try...catch") мы рассмотрели, что объект error в блоке catch содержит "name", "message" и "stack". Здесь их тоже можно обнаружить, рассмотрим ещё один пример.
// 1.1.1 Можно использовать и более специфические ошибки, которые будут отличаться названием, например: SyntaxError, ReferenceError, TypeError и другие. Можно даже создавать свои отдельные классы ошибок, которые наследуются от встроенных. (Об этом можно почитать в статье, прикреплённой в Links)
// const err = new SyntaxError('something');
// const err = new ReferenceError('something');
/* const err = new TypeError('something');

console.log(err.name, err.message, err.stack); */

// |===:===:===:===>
/** links:
 *  https://learn.javascript.ru/custom-errors
 * */