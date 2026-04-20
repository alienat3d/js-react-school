import {createReducer} from '@reduxjs/toolkit';
import {heroesFetching, heroesFetched, heroesFetchingError, heroCreated, heroDeleted} from '../actions';

const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
};

const heroesOld = createReducer(initialState, builder => {
  builder
    .addCase(heroesFetching, state => {
      state.heroesLoadingStatus = 'loading';
    })
    .addCase(heroesFetched, (state, action) => {
      state.heroes = action.payload;
      state.heroesLoadingStatus = 'idle';
    })
    .addCase(heroesFetchingError, state => {
      state.heroesLoadingStatus = 'error';
    })
    .addCase(heroCreated, (state, action) => {
      state.heroes.push(action.payload);
    })
    .addCase(heroDeleted, (state, action) => {
      state.heroes = state.heroes.filter(item => item.id !== action.payload);
    })
    .addDefaultCase(() => {
    });
});

const heroes = createReducer(initialState, {
    [heroesFetching]: state => { state.heroesLoadingStatus = 'loading'; },
    [heroesFetched]: (state, action) => {
      state.heroes = action.payload;
      state.heroesLoadingStatus = 'idle';
    },
    [heroesFetchingError]: state => { state.heroesLoadingStatus = 'error'; },
    [heroCreated]: (state, action) => { state.heroes.push(action.payload); },
    [heroDeleted]: (state, action) => { state.heroes = state.heroes.filter(item => item.id !== action.payload); }
  },
  [],
  state => state
);

export default heroes;