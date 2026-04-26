import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {useHttp} from '../../hooks/http.hook';

// 209.10.0 А теперь сделаем объект-адаптер также для фильтров, по аналогии, как это делали со слайсом "heroesSlice".
const filtersAdapter = createEntityAdapter();

/*const initialState = {
  filters: [],
  filtersLoadingStatus: 'idle',
  activeFilter: 'all'
};*/
// 209.10.1 Сначала мы пересоздадим начальное состояние стейта при помощи метода из объекта-адаптера "getInitialState" и добавим в структуру также доп. поля "filtersLoadingStatus" & "activeFilter". Ну, а содержание массива "filters" у нас будет находиться в объекте поля "entities". ↓
const initialState = filtersAdapter.getInitialState({
  filtersLoadingStatus: 'idle',
  activeFilter: 'all'
});
console.log(initialState);

export const fetchFilters = createAsyncThunk(
  'filters/fetchFilters',
  () => {
    const {request} = useHttp();
    return request('http://localhost:3001/filters');
  }
);

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // 209.10.2 Менять фильтр мы будем всё-таки вручную, т.к. эта функция не содержится в классических методах адаптера. ↓
    activeFilterChanged: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFilters.pending, state => {
        state.filtersLoadingStatus = 'loading';
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        // 209.10.3 Ну, а загрузить список фильтров мы уже можем с помощью метода адаптера "setAll". Здесь нам нужно поместить в него два аргумента: собственно стейт этого слайса и массив с фильтрами, который попадёт в "action.payload".
        // state.filters = action.payload;
        filtersAdapter.setAll(state, action.payload);
        state.filtersLoadingStatus = 'idle';
      })
      .addCase(fetchFilters.rejected, state => {
        state.filtersLoadingStatus = 'error';
      })
      .addDefaultCase(() => {
      });
  }
});
const {actions, reducer} = filtersSlice;

export default reducer;

// 209.10.4 Далее мы извлечём из адаптера метод "selectAll" с помощью метода получения селекторов "getSelectors", а внутри этого метода пропишем, что нам нужно работать с частью стора "filters".
// 209.10.5 Но тут важный момент, что нам нужно добавить ID для каждого фильтра в БД [heroes.json], чтобы структура объекта-адаптера правильно работала.
// (Go to [])
export const {selectAll} = filtersAdapter.getSelectors(state => state.filters);

export const {activeFilterChanged} = actions;