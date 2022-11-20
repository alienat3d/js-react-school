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
  chooseOptCosts: function () {
    for (let i = 0; i < 3; i++) {
      let opt = prompt('Статья необязательных расходов?', '');
      appData.optionalCosts[i] = opt;
    }
  },
  detectDayBudget: function () {
    appData.moneyPerDay = (appData.budget / 30.5).toFixed();
    alert('Ежедневный бюджет: ' + appData.moneyPerDay);
  },
  detectLevel: function () {
    if (appData.moneyPerDay < 15000) {
      console.log('Минимальный уровень достатка');
    } else if (appData.moneyPerDay > 30000 && appData.moneyPerDay < 60000) {
      console.log('Средний уровень достатка');
    } else if (appData.moneyPerDay > 100000) {
      console.log('Высокий уровень достатка');
    } else {
      console.log('Произошла ошибка');
    }
  },
  checkSaving: function () {
    if (appData.savings == true) {
      let save = +prompt('Какова сумма накоплений?'),
        percent = +prompt('Под какой процент?');

      appData.monthlyDepositIncome = ((save / 100 / 12) * percent).toFixed();
      alert(
        'Доход в месяц с вашего депозита составляет: ' +
          appData.monthlyDepositIncome
      );
    }
  },
  chooseIncome: function () {
    let items = prompt(
      'Что принесёт дополнительный доход? (Перечислите через запятую)',
      ''
    );

    if (
      typeof items === 'string' &&
      typeof items != null &&
      items != '' &&
      items.length < 50
    ) {
      appData.income = items;
    }

    appData.income = items.split(', '); // [1]
    appData.income.push(prompt('Может что-то ещё?')); // [2]
    appData.income.sort(); // [3]
    appData.income.forEach((incomeType) => {
      alert('Способы дополнительного заработка: ' + incomeType);
    });
  },
  allProgrammProperties: function () {
    for (let key in appData) {
      console.log('Наша программа включает в себя: "' + key + '"');
    }
  },
};
// [1]* То, что мы получаем от пользователя будет строчным типом данных. И мы хотим записать эти данные в массив с названием "income: []". Для этого можно превратить строку в массив методом split().
// [2]* Также мы можем спросить у пользователя, не забыл ли он что-то ещё. Может есть ещё какой-то заработок, который он забыл указать. Чтобы добавить какой-то элемент в конец массива мы можем использовать метод push().
// [3]* Также отсортируем это всё по алфавиту методом sort().
