'use strict';

// ? Чтобы скрипт сперва дождался построения DOM-структуры (т.е. чтобы необходимые теги точно загрузились) используем addEventListener('DOMContentLoaded'), а в callback-функцию помещаем весь наш код:
// Кстати, вместо document может встречать и window, но разницы тут принципиально нет.
document.addEventListener('DOMContentLoaded', () => {
  const movieDB = {
    movies: [
      'логан',
      'лига справедливости',
      'ла-ла лэнд',
      'одержимость',
      'скотт пилигрим против...',
    ],
  };

  const adverts = document.querySelectorAll('.promo__adv img'),
    poster = document.querySelector('.promo__bg'),
    genre = poster.querySelector('.promo__genre'),
    movieList = document.querySelector('.promo__interactive-list'),
    addForm = document.querySelector('form.add'),
    addInput = addForm.querySelector('.adding__input'),
    checkbox = addForm.querySelector('[type="checkbox"]');

  // Также и функционал удаления рекламы сделаем функцией
  // adverts.forEach((banner) => banner.remove());
  const deleteAdverts = (array) => adverts.forEach((banner) => banner.remove());

  const makeChanges = () => {
    genre.textContent = 'драма';

    poster.style.backgroundImage = 'url("img/bg.jpg")';
  };

  const sortArray = (array) => array.sort();

  // Так как нам понадобится этот функционал минимум дважды, то удобно будет обернуть этот кусочек кода в функцию. Но пока наша функция слишком привязана к определённым элементам, что есть на странице или в коде...
  /*   function createMovieList() {
    movieList.innerHTML = '';

    movieDB['movies'].forEach((movie, index) => {
      movieList.innerHTML += `
      <li class="promo__interactive-item">
        ${index + 1}. ${movie}
        <div class ="delete"></div>
      </li>
    `;
    });
  } */
  // ...Однако при помощи аргументов можно сделать её универсальной. Чтобы она только на момент вызова узнавала с чем она будет работать. "films" - это фильмы, с которыми функция будет работать и "parent" - родительский блок на странице будет включать в себя эти фильмы.
  function createMovieList(films, parent) {
    parent.innerHTML = '';
    // * [5] Фильмы должны быть отсортированы по алфавиту
    sortArray(films);

    films.forEach((movie, index) => {
      parent.innerHTML += `
      <li class="promo__interactive-item">
        ${index + 1}. ${movie}
        <div class ="delete"></div>
      </li>
    `;
    });
    // * [3] При клике на мусорную корзину - элемент будет удаляться из списка (сложно)
    // У каждого фильма в вёрстке есть <div> "кнопка удаления", на них мы будем вешать обработчики события. И если на корзинку кликнут, то мы удалим родителя этой корзинки, а также удалим этот фильм из базы данных.
    // Сперва получим все корзинки. Т.к. они нам нужны лишь раз, то можно их прямо на месте найти и тут же использовать.
    // Индекс или нумерация нам нужна, т.к. нам нужно будет также знать номер элемента, которого удаляем. Ведь массив содержит элементы строго по порядку.
    document.querySelectorAll('.delete').forEach((button, index) => {
      button.addEventListener('click', () => {
        button.parentElement.remove();
        movieDB.movies.splice(index, 1); // splice() удаляет элементы из массива. Первым аргументом помещаем номер с которого следует начать, а вторым аргументом сколько элементов следует удалить.
        // Но вот незадача, после того, как удалили элемент нарушается нумерация. Пофиксить это нам поможет рекурсия. Вызовем функцию createMovieList() внутри себя, таким образом она будет перерисовывать список фильмов после каждого удаления уже с новой нумерацией.
        createMovieList(films, parent);
      });
    });
  }
  // Сразу её вызовем, т.к. когда мы заходим на страницу, нам необходимо, чтобы они отобразились на странице. Внутрь вызываемой функции передаём первый аргумент это собственно фильмы из базы данных, что будем перебирать и тот блок, куда будем их помещать.
  createMovieList(movieDB.movies, movieList);
  // * [1] Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - новый фильм добавляется в список. Страница не должна перезагружаться.
  // * Новый фильм должен добавляться в movieDB.movies.
  // * Для получения доступа к значению input - обращаемся к нему как input.value;
  // Чтобы отследить отправку формы есть событие "submit"
  // Чтобы при отправки формы страница не перезагружалась используем preventDefault();
  addForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    // Обращаемся к инпуту, в который предполагается вводить название фильма и проверяем его value, т.е. то, что пользователь введёт.
    let newFilm = addInput.value.toLowerCase();
    // Получаем булево значение "checked".
    const favorite = checkbox.checked;
    // Напишем условие, которое не позволит пользователю добавить пустую строку в качестве фильма.
    if (newFilm) {
      // * [2] Если название фильма больше, чем 21 символ - обрезать его и добавить три точки
      if (newFilm.length > 21) {
        // При помощи метода substring() вырезаем с первого символа до 22, 22-ой не включая. А дальше просто поставим …
        newFilm = `${newFilm.substring(0, 22)}…`;
      }
      // * [4] Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: ('Добавляем любимый фильм');
      if (favorite) {
        console.log('Добавляем любимый фильм');
      }
      // Методом push() добавляем введённый пользователем фильм в наш массив-базу данных. Напомним, что всю информацию от пользователя мы получаем в типе данных "строка".
      movieDB.movies.push(newFilm);
      sortArray(movieDB.movies);
      // Отрисуем новый список фильмов с добавленным только что фильмом.
      createMovieList(movieDB.movies, movieList);
    }
    // Очищаем данные из формы.
    // addForm.reset()
    // Впрочем можно обратиться через объект event и его свойство target:
    evt.target.reset();
  });

  deleteAdverts(adverts);
  makeChanges();
});
