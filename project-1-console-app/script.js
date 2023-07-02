'use strict';

/* const numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

const personalMovieDB = {
  count: numberOfFilms,
  movies: {},
  actors: {},
  genres: [],
  private: false,
};

const a = prompt('Какой у вас один из последних просмотренных фильмов?', ''),
  b = prompt('На сколько баллов от 0 до 10 вы бы его оценили?', ''),
  c = prompt('Какой у вас один из последних просмотренных фильмов?', ''),
  d = prompt('На сколько баллов от 0 до 10 вы бы его оценили?', '');

personalMovieDB.movies[a] = b;
personalMovieDB.movies[c] = d;

console.log(personalMovieDB); */

// const numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

// Поместим функционал опрашивания пользователя в функцию и также выполним проверку. Чтобы пользователь не мог отменить вопрос, ввести пустую строку или ввести не число.
// ? Если хотим проверять на этапе ввода данных в строку ввода, то надо использовать уже регулярные выражения, которые мы рассмотрим чуть позже.
// let numberOfFilms;

// function start() {
// numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
// Ниже мы при помощи условия if, но мы можем также воспользоваться и циклом while. То есть, пока у нас условие верно, то будут выполняться какие-то действия. Тут мы проверяем на неправильные виды данные: пустая строка, попытка отменить и не число (в таком же порядке они и в условии в коде). Так вот, если такое имеет место быть, то мы повторяем вопрос. А если ответ не попадает в наше условие, то всё, цикл заканчивается.
// Один из тех редких случаев, когда очень уместно применить цикл while.
// while (numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)) {
// numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
// }
// }
// start();

const personalMovieDB = {
  count: 0, // здесь мы заменили переменную numberOfFilms на 0, а ниже в методе askTotalAmountFilms мы уже используем это свойство, вместо переменной.
  movies: {},
  actors: {},
  genres: [],
  private: false,
  askTotalAmountFilms: function () {
    personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');

    while (
      personalMovieDB.count == '' ||
      personalMovieDB.count == null ||
      isNaN(personalMovieDB.count)
    ) {
      personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
    }
  },
  askLastFilms: function () {
    for (let index = 0; index < 2; index++) {
      const a = prompt(
          'Какой у вас один из последних просмотренных фильмов?',
          ''
        ).trim(),
        b = +prompt('На сколько баллов от 0 до 10 вы бы его оценили?', '');

      if (
        a != null &&
        a != '' &&
        a.length < 50 &&
        b != null &&
        b != '' &&
        b >= 0 &&
        b < 11
      ) {
        personalMovieDB.movies[a] = b;
      } else {
        index--;
      }
    }
  },
  askFavGenres: function () {
    for (let index = 0; index < 1; index++) {
      /* for (let index = 0; index < 3; index++) {
      const favGenre = prompt(`Ваш любимый жанр под номером ${index + 1}?`, '');

      if (favGenre == null || favGenre == '') {
        console.log(
          'Вы ввели ответ некорректно или не ввели вовсе, а они необходимы. Попробуйте снова.'
        );
        index--;
      } else {
        personalMovieDB.genres[index] = favGenre;
      } */
      // * Решаем ту же задачу, но с применением другого подхода:
      const favGenres = prompt(`Введите ваши любимые жанры через запятую`, '').toLowerCase();

      if (favGenres == null || favGenres == '' || favGenres.length < 3) {
        console.log(
          'Вы ввели ответ некорректно или не ввели вовсе, а они необходимы. Попробуйте снова.'
        );
        index--;
      } else {
        personalMovieDB.genres = favGenres.split(', '); // Вспоминаем метод массивов split(), который берёт строку, разбивает её на отдельные элементы и записывает как элементы массива.
        personalMovieDB.genres.sort(); // Сортируем методом sort() жанры по алфавиту. Кстати, в сортировке заглавные буквы имеют больший приоритет и будут выводиться первыми. Для полноценной отработки метода sort(), нужно учесть эту особенность и предупредительно перевести ответ в нижний регистр.
      }
    }

    personalMovieDB.genres.forEach((element, index) => {
      console.log(`Любимый жанр #${index + 1} - это ${element}.`);
    });
  },
  detectPersonalLevel: function () {
    if (personalMovieDB.count < 30) {
      alert('Просмотрено довольно мало фильмов.');
    } else if (personalMovieDB.count >= 30 && personalMovieDB.count <= 100) {
      alert('Вы классический зритель.');
    } else if (personalMovieDB.count > 100) {
      alert('Вы киноман.');
    } else {
      alert('Произошла ошибка!');
    }
  },
  showMyDB: function (hidden) {
    if (!hidden) {
      console.log(personalMovieDB);
    }
  },
  toggleVisibleMyDB: function () {
    if (personalMovieDB.private) {
      personalMovieDB.private = false;
    } else {
      personalMovieDB.private = true;
    }
  },
};
// personalMovieDB.toggleVisibleMyDB();
// personalMovieDB.showMyDB();
// personalMovieDB.askFavGenres();
// Нужно создать функцию showMyDB, которая будет проверять свойство private. Если стоит в позиции false - выводит в консоль главный объект программы. Оператор ! сделает из false true и условие будет верным, а значит база данных отобразится в консоли.
/* function showMyDB(hidden) {
  if (!hidden) {
    console.log(personalMovieDB);
  }
}

showMyDB(personalMovieDB.private); */
// * 1) Вместо того, чтобы задавать один и тот же вопрос несколько раз, мы автоматизируем это циклом for, см. ниже.
/* const a = prompt('Какой у вас один из последних просмотренных фильмов?', ''),
  b = prompt('На сколько баллов от 0 до 10 вы бы его оценили?', ''),
  c = prompt('Какой у вас один из последних просмотренных фильмов?', ''),
  d = prompt('На сколько баллов от 0 до 10 вы бы его оценили?', '');

personalMovieDB.movies[a] = b; 
personalMovieDB.movies[c] = d;*/

// * 2) Для решения этого задания сперва вспомним, что если при ответе на вопрос функции prompt(), пользователь нажмёт кнопку "Отмена", то запишется "null". Это мы можем использовать. Также в условии укажем, что ответы не должны быть "пустой строкой", т.е. остаться без ответа и длинна ответа на вопрос о названии фильма должен быть не длиннее 50 символов, для этого удобно использовать свойство строки length. Также проверим, что в качестве названия пользователь не ввёл число.

// Также мы можем предусмотреть, чтобы пользователь не записал ответом пробелы или табуляцию, в этом поможет метод trim().
/* function rememberMyFilms() {
  for (let i = 0; i < 2; i++) {
    const a = prompt(
        'Какой у вас один из последних просмотренных фильмов?',
        ''
      ).trim(),
      b = +prompt('На сколько баллов от 0 до 10 вы бы его оценили?', '');

    if (
      a != null &&
      a != '' &&
      a.length < 50 &&
      b != null &&
      b != '' &&
      b >= 0 &&
      b < 11
    ) {
      personalMovieDB.movies[a] = b;
      console.log('done');
    } else {
      console.log('error');
      i--; // Если условие не выполнилось, то нам нужно вернуть пользователя повторно на ту же итерацию, т.е. задать эти вопросы ещё раз. Для этого удобно использовать оператор декремента.
    }
  }
}
rememberMyFilms(); */

// * 3)
/* function detectPersonalLevel() {
  if (personalMovieDB.count < 30) {
    alert('Просмотрено довольно мало фильмов.');
  } else if (personalMovieDB.count >= 30 && personalMovieDB.count <= 100) {
    alert('Вы классический зритель.');
  } else if (personalMovieDB.count > 100) {
    alert('Вы киноман.');
  } else {
    alert('Произошла ошибка!');
  }
}
detectPersonalLevel(); */

// Создать функцию writeYourGenres в которой пользователь будет 3 раза отвечать на вопрос "Ваш любимый жанр под номером ${номер по порядку}". Каждый ответ записывается в массив данных genres.
/* function writeYourGenres() {
  for (let index = 0; index < 3; index++) {
    // const genre = prompt(`Ваш любимый жанр под номером ${index + 1}?`, '');
    // personalMovieDB.genres[index] = genre;
    // Можно чуточку сократить код:
    personalMovieDB.genres[index] = prompt(
      `Ваш любимый жанр под номером ${index + 1}?`,
      ''
    );
  }
}

writeYourGenres(); */
