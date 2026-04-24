import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {useHttp} from '../../hooks/http.hook';

const initialState = {
  filters: [],
  filtersLoadingStatus: 'idle',
  activeFilter: 'all'
};

// 208.7.0 А теперь создадим с помощью метода «createAsyncThunk» асинхронную функцию action creator и для фильтров, как мы делали это до этого в [heroesSlice.js]. ↓
export const fetchFilters = createAsyncThunk(
  'heroes/fetchFilters',
  () => {
    const {request} = useHttp();
    return request('http://localhost:3001/filters');
  }
);

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    activeFilterChanged: (state, action) => { state.activeFilter = action.payload; },
    // 208.7.1 Также создадим здесь поле extraReducers для добавления внешних action creators из fetchFilters в слайс.
    // (Go to [/src/components/heroesFilters/HeroesFilters.js])
    extraReducers: builder => {
      builder
        .addCase(fetchFilters.pending, state => { state.filtersLoadingStatus = 'loading'; })
        .addCase(fetchFilters.fulfilled, (state, action) => {
          state.filters = action.payload;
          state.filtersLoadingStatus = 'idle';
        })
        .addCase(fetchFilters.rejected, state => { state.filtersLoadingStatus = 'error'; })
        .addDefaultCase(() => {});
    }
  }
});
const {actions, reducer} = filtersSlice;

export default reducer;

export const { activeFilterChanged } = actions;