'use strict';
// Для теста специально загрузим страницу. Используем классический пример счёта до огромного числа (1e9 = 1000000000).
let number = 0;

function count() {
  for (let index = 0; index < 1e9; index++) {
    number++;
  }
  alert('Done!');
  return number;
}

count();

// ! Как видим, пока функция не отработала мы не можем ничего сделать на странице, а в худшем случае она может и зависнуть вместо с браузером.

// ? Для решения сложных задач есть специальные паттерны. Мы берём такую задачу и разбиваем на кусочки. Например в цикле мы могли бы сперва посчитать до миллиона или 100К, сделать эту часть, а потом посчитать след. промежуток и т.д. Таким образом, деструктурируя эту задачу, то в Call stack попадут отдельные кусочки операции, не загружая её слишком долго.