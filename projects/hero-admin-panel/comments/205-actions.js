// 205.2 Для начала импортируем функцию "createAction" в проект из "Redux Toolkit". ↓
import {createAction} from '@reduxjs/toolkit';

// ? 205.7 А ещё, помним, что у нас есть комплексные action creators. Они были созданы для возвращения функций. Обычно на данном этапе их так и возвращают, т.к. они вполне самодостаточны и трогать пока их не надо. В Redux Toolkit есть специальных функционал и для этих специфических функций, но об этом в одном из следующих уроков.
export const fetchHeroes = (request) => (dispatch) => {
  dispatch(heroesFetching());
  request('http://localhost:3001/heroes')
    .then(data => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()));
};

// 205.3 Эта функция принимает 2 аргумента: тип действия и вспомогательную функцию. И давайте заменим наш прошлый action creator на использование этой функции здесь, создавая action creator при помощи этой функции из Redux Toolkit. ↓
/*export const heroesFetching = () => {
  return {
    type: 'HEROES_FETCHING'
  };
};*/
export const heroesFetching = createAction('HEROES_FETCHING');

// 205.4.0 Далее мы применим этот метод и на action creator, в который также приходит аргумент. И протестировав, мы замечаем, что даже, несмотря на то, что в методе "createAction" мы не передавали данные аргументом, у нас приложение всё ещё работает. Дело в том, что когда мы используем функцию "createAction", то аргумент, который приходит в action creator, автоматически переходит в поле "payload" и эта часть "payload: heroes" реализуется теперь автоматически. Однако, если мы добавим дополнительные аргументы в вызов action creator, то они не будут передаваться.
// ? 205.4.1 Есть одно правило: нужно стараться не передавать в функцию-редьюсер больше одного поля. Все действия, которые необходимо выполнить надо выполнять в action creator. Затем, когда всё готово, то в функцию-редьюсер лишь одного значение, которое приходит в качестве payload (помним правило чистых функций).
// (Go to [\react-course-notes\9-205-redux-toolkit-createAction.md])
/*export const heroesFetched = (heroes) => {
  return {
    type: 'HEROES_FETCHED',
    payload: heroes
  };
};*/
export const heroesFetched = createAction('HEROES_FETCHED');

export const heroesFetchingError = () => {
  return {
    type: 'HEROES_FETCHING_ERROR'
  };
};

export const fetchFilters = (request) => (dispatch) => {
  dispatch(filtersFetching());
  request('http://localhost:3001/filters')
    .then(data => dispatch(filtersFetched(data)))
    .catch(() => dispatch(filtersFetchingError()));
};

export const filtersFetching = () => {
  return {
    type: 'FILTERS_FETCHING'
  };
};

export const filtersFetched = (filters) => {
  return {
    type: 'FILTERS_FETCHED',
    payload: filters
  };
};

export const filtersFetchingError = () => {
  return {
    type: 'FILTERS_FETCHING_ERROR'
  };
};

export const activeFilterChanged = (filter) => {
  return {
    type: 'ACTIVE_FILTER_CHANGED',
    payload: filter
  };
};

export const heroCreated = (hero) => {
  return {
    type: 'HERO_CREATED',
    payload: hero
  };
};

export const heroDeleted = (id) => {
  return {
    type: 'HERO_DELETED',
    payload: id
  };
};