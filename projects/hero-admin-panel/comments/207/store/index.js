import {configureStore} from '@reduxjs/toolkit';
// import heroes from '../reducers/heroes';
// 207.7.0 А дальше мы начнём импортировать сущности из слайса туда, где они требуются, начиная со store. Для начала импортируем функцию-редьюсер, которую назовём как "heroes". ↓
import heroes from '../components/heroesList/heroesSlice';
// 207.10.3 Также и ссылку на функцию-редьюсер мы здесь заменим на filtersSlice.
// import filters from '../reducers/filters';
import filters from '../components/heroesFilters/filtersSlice';

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === 'string') {
    return next({type: action});
  }
  return next(action);
};

// 207.7.1 А затем передадим его сюда в reducer. На это настройка store для этого слайса у нас окончена. Идём дальше.
// (Go to [/src/actions/index.js])
const store = configureStore({
  reducer: {heroes, filters},
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
});

export default store;