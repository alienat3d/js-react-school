// import {heroesFetched, heroesFetching, heroesFetchingError} from '../components/heroesList/heroesSlice';
// import {filtersFetched, filtersFetching, filtersFetchingError} from '../components/heroesFilters/filtersSlice';

// 208.1.0 На прошлом уроке, когда мы избавлялись от action creators я сказал, что пока придётся оставить эти комплексные action creators и мы займёмся ими чуть позже. Пришло время ими заняться. Вспомним, что мы их создавали специально, чтобы работать с асинхронными функциями. Так вот, метод «createAsyncThunk» как раз и нужен для удобного и лаконичного создания асинхронные функции asyncThunk action creator с доп. функционалом для работы с промисами. Итак, давайте возьмём функционал из "fetchHeroes" и создадим на его основе такой же функционал внутри слайса "heroes" при помощи метода "createAsyncThunk" (было бы удобнее всё же держать весь соответствующий функционал сгруппированным в одном месте — в этом и смысл слайсов).
// (Go to [/src/components/heroesList/heroesSlice.js])
// 208.5 Ну, а action creator "fetchHeroes" теперь отсюда можно также смело удалять, т.к. он "переехал" в слайс "heroes".
// (Go to [/src/components/heroesList/heroesSlice.js])
/*export const fetchHeroes = (request) => (dispatch) => {
  dispatch(heroesFetching());
  request('http://localhost:3001/heroes')
    .then(data => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()));
};*/

/*
export const fetchFilters = (request) => (dispatch) => {
  dispatch(filtersFetching());
  request('http://localhost:3001/filters')
    .then(data => dispatch(filtersFetched(data)))
    .catch(() => dispatch(filtersFetchingError()));
};*/
