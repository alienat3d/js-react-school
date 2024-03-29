/*
2) 

3) 

4)  */

'use strict';

const movieDB = {
  movies: [
    'Логан',
    'Лига справедливости',
    'Ла-ла лэнд',
    'Одержимость',
    'Скотт Пилигрим против...',
  ],
};

// * [1] Удалить все рекламные блоки со страницы (правая часть сайта)
const advertBanners = document.querySelectorAll('.promo__adv img');

advertBanners.forEach((banner) => {
  banner.remove();
});

// * [2] Изменить жанр фильма, поменять "комедия" на "драма"
const poster = document.querySelector('.promo__bg'),
      genre = poster.querySelector('.promo__genre');

genre.textContent = 'драма';

// * [3] Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img. Реализовать только при помощи JS.
poster.style.backgroundImage = 'url("img/bg.jpg")';

// * [4.1] Список фильмов на странице сформировать на основании данных из этого JS файла. 

// Сперва получим родительский элемент списка фильмов и удалим у него имеющиеся у него фильмы.
const watchedMoviesList = document.querySelector('.promo__interactive-list');

watchedMoviesList.innerHTML = '';
// ? Кстати innerHTML позволяет не только очищать или перезаписывать что-то, но и получать контент какого-то элемента, например:
// console.log(watchedMoviesList.innerHTML); но используется такое не слишком-то часто.

// * [4.2] Отсортировать их по алфавиту.
movieDB["movies"].sort();
// * [5] Добавить нумерацию выведенных фильмов
// С помощью += мы будем каждую итерацию добавлять в innerHTML новые строки.
movieDB["movies"].forEach((movie, index) => {
  watchedMoviesList.innerHTML += 
    `<li class="promo__interactive-item">
      ${index + 1}. ${movie}
      <div class ="delete"></div>
    </li>`
});
/* Две идентичные команды, во втором случаем просто укороченная запись с оператором дополнительного присваивания.
a = a + 1;
a += 1; */

// Вуаля! Теперь фильмы будут браться из нашей базы данных и формироваться в вёрстке автоматически!