'use strict';

let money, date;

function start() {
  money = +prompt('Ваш бюджет на месяц?', '');
  date = +prompt('Введите дату в формате YYYY-MM-DD', '');

  while (isNaN(money) || money == '' || money == null) {
    money = +prompt('Ваш бюджет на месяц?', '');
  }
}
start();

let appData = {
  budget: money,
  costs: {},
  optionalCosts: {},
  income: [],
  dateData: date,
  savings: true,
  chooseCosts: function () {
    for (let i = 0; i < 2; i++) {
      let a = prompt('Введите обязательную статью расходов в этом месяце', ''),
        b = +prompt('Во сколько обойдется?', '');

      if (
        typeof a === 'string' &&
        typeof a != null &&
        typeof b != null &&
        a != '' &&
        b != '' &&
        a.length < 50
      ) {
        appData.costs[a] = b;
      } else {
        i = --i;
      }
    }
  },
  detectDayBudget: function () {
    appData.moneyPerDay = (appData.budget / 30).toFixed();
    alert('Ежедневный бюджет: ' + appData.moneyPerDay);
  },
  detectLevel: function () {
    if (appData.moneyPerDay < 100) {
      console.log('Минимальный уровень достатка');
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
      console.log('Средний уровень достатка');
    } else if (appData.moneyPerDay > 2000) {
      console.log('Высокий уровень достатка');
    } else {
      console.log('Произошла ошибка');
    }
  },
};
// toFixed() - округляет число до ближайшего целого. toFixed(1) - округляет число до первого знака после запятой. Однако этот метод возвращает строковое значение.

// Создадим новую функцию, которая поможет нам рассчитать накопления с депозита, если он есть.
// Сперва нам нужно проверить, есть ли у человека какие-то сбережения на депозите. Далее спрашиваем какова сумма этих накоплений и под каким % они лежат на депозите?
// Далее мы сможешь рассчитать сколько человек в месяц заработает со своего депозита.
function checkSaving() {
  if (appData.savings == true) {
    let save = +prompt('Какова сумма накоплений?'),
      percent = +prompt('Под какой процент?');

    appData.monthlyDepositIncome = ((save / 100 / 12) * percent).toFixed();
    alert(
      'Доход в месяц с вашего депозита составляет: ' +
        appData.monthlyDepositIncome
    );
  }
}
checkSaving();
