// 203.4.1 Здесь мы создадим новую функцию "fetchHeroes", которая будет принимать какой-то запрос (request нам нужен для отправки запроса из отдельного хука) и возвращать другую функцию. Она, в свою очередь, будет автоматически получать диспэтч-функцию. Затем вернутся action creator в виде функции.
// (Go to [/src/components/heroesList/HeroesList.js])
export const fetchHeroes = (request) => (dispatch) => {
  dispatch(heroesFetching());
  request('http://localhost:3001/heroes')
    .then(data => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()));
};

export const heroesFetching = () => {
  return {
    type: 'HEROES_FETCHING'
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: 'HEROES_FETCHED',
    payload: heroes
  };
};

export const heroesFetchingError = () => {
  return {
    type: 'HEROES_FETCHING_ERROR'
  };
};

// 203.5.1 Также, как мы делали в "fetchHeroes" мы перенесём сюда всю логику для запроса на сервер для получения данных о состоянии текущего фильтра.
// (Go to [/src/components/heroesFilters/HeroesFilters.js])
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

// 203.3.1 Затем мы найдём тот action creator, что нам нужен, и в нём пропишем смену фильтра с задержкой в пол секунды. И т.к. мы знаем, что у нас подключен "ReduxThunk" middleware, то мы можем передавать в экшен не только объекты, которые до того возвращали все action creators, но и функцию. Т.ч. мы продолжим здесь цепочку вызовов и теперь при вызове action creator "activeFilterChanged", то вернётся функция, которая в себя пример диспэтч (диспэтч-функция приходит на место аргумента dispatch автоматически, т.к. мы используем "ReduxThunk" и его не надо отдельно импортировать). Ну, а дальше, мы будем диспэтчить этот объект по прошествии пол секунды, т.е. мы будем в коллбэк-функции запускать функцию-диспэтч и помещать в неё объект экшена с payload внутри.
// (Go to [/src/components/heroesList/HeroesList.js])
/*export const activeFilterChanged = (filter) => (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: 'ACTIVE_FILTER_CHANGED',
      payload: filter
    });
  }, 500);
};*/
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