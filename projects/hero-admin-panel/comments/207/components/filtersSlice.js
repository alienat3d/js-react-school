import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  filters: [],
  filtersLoadingStatus: 'idle',
  activeFilter: 'all'
};

// 207.10.0 Создадим также слайс и для фильтров по тому же принципу, что мы создавали [/src/components/heroesList/heroesSlice.js]
// (Go to [/src/components/heroesFilters/HeroesFilters.js])
const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filtersFetching: state => {
      state.filtersLoadingStatus = 'loading';
    },
    filtersFetched: (state, action) => {
      state.filters = action.payload;
      state.filtersLoadingStatus = 'idle';
    },
    filtersFetchingError: state => {
      state.filtersLoadingStatus = 'error';
    },
    activeFilterChanged: (state, action) => {
      state.activeFilter = action.payload;
    },
  }
});

const {actions, reducer} = filtersSlice;

export default reducer;

export const {filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged} = actions;