import {heroesFetched, heroesFetching, heroesFetchingError} from '../components/heroesList/heroesSlice';
import {filtersFetched, filtersFetching, filtersFetchingError} from '../components/heroesFilters/filtersSlice';

// 207.7.2 Теперь нам нужно кое-что исправить в файле с экшенами. А именно все те action creators, что относятся к героям можно удалить, ведь теперь они создаются через слайс.
// 207.7.3 Однако, у нас ещё здесь остался комплексный action creator, который запускает удалённые сущности. В следующем уроки мы и это поправим, а пока придётся эти сущности импортировать, чтобы протестировать работу слайса.
// (Go to [/src/components/heroesAddForm/HeroesAddForm.js])
// 207.10.2 Теперь мы можем и здесь подчистить файл от action creators для фильтров, т.к. они у нас генерятся в слайсе фильтров (кроме комплексного "fetchFilters" до след. урока).
// (Go to [/src/store/index.js])
export const fetchHeroes = (request) => (dispatch) => {
  dispatch(heroesFetching());
  request('http://localhost:3001/heroes')
    .then(data => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()));
};

export const fetchFilters = (request) => (dispatch) => {
  dispatch(filtersFetching());
  request('http://localhost:3001/filters')
    .then(data => dispatch(filtersFetched(data)))
    .catch(() => dispatch(filtersFetchingError()));
};