'use strict';

let money = prompt('Ваш бюджет на месяц?', ''),
  date = prompt('Введите дату в формате YYYY-MM-DD', '');

let appData = {
  budget: money,
  costs: {},
  optionalCosts: {},
  income: [],
  dateData: date,
  savings: false,
};

let a1 = prompt('Введите обязательную статью расходов в этом месяце', ''),
  a2 = prompt('Во сколько обойдется?', ''),
  a3 = prompt('Введите обязательную статью расходов в этом месяце', ''),
  a4 = prompt('Во сколько обойдется?', '');

appData.costs.a1 = a2;
appData.costs.a3 = a4;

alert(appData.budget / 30);
