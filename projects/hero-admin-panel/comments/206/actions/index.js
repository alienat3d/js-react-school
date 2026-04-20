import {createAction} from '@reduxjs/toolkit';

export const fetchHeroes = (request) => (dispatch) => {
  dispatch(heroesFetching());
  request('http://localhost:3001/heroes')
    .then(data => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()));
};

/*export const heroesFetching = () => {
  return {
    type: 'HEROES_FETCHING'
  };
};*/

export const heroesFetching = createAction('HEROES_FETCHING');

/*export const heroesFetched = (heroes) => {
  return {
    type: 'HEROES_FETCHED',
    payload: heroes
  };
};*/

export const heroesFetched = createAction('HEROES_FETCHED');

// 206.4.0 Но пока у нас есть одна проблема, если запустить веб-приложение, то оно выдаст ошибку. Дело в том, что метод "createReducer" требует, чтобы мы также при создании action creator использовали везде лишь метод "createAction". Поэтому нам нужно здесь переделать все action creators таким образом, чтобы они создавались через метод "createAction". ↓
/*export const heroesFetchingError = () => {
  return {
    type: 'HEROES_FETCHING_ERROR'
  };
};*/

export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');

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

/*export const heroCreated = (hero) => {
  return {
    type: 'HERO_CREATED',
    payload: hero
  };
};*/

// 206.4.1 Напоминаем, что в "createAction" payload передаётся автоматически и потому, при работе с "createAction", мы его специально не указываем.
// (Go to [/src/reducers/heroes.js])
export const heroCreated = createAction('HERO_CREATED');

/*
export const heroDeleted = (id) => {
  return {
    type: 'HERO_DELETED',
    payload: id
  };
};*/

export const heroDeleted = createAction('HERO_DELETED');