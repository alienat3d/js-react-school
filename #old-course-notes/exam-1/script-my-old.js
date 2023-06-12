'use strict';

let money = +prompt('Ваш бюджет на месяц?'),
  date = +prompt('Введите дату в формате YYYY-MM-DD');
costsQ1 = prompt('Введите обязательную статью расходов в этом месяце');
costsQ2 = +prompt('Во сколько обойдется?');

let appData = {
  money: $money,
  date: $time,
  costs: {
    'Ответ на 1-ый вопрос': $costsQ1,
    'Ответ на 2-ой вопрос': $costsQ2,
  },
  optionalCosts: $optionalCosts,
  income: [],
  savings: false,
};

alert($costsQ2 / 30);
