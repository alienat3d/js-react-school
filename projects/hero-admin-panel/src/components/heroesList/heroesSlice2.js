import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {request} from '../../utils';

const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
};

export const fetchHeroes = createAsyncThunk(
  'heroes/fetchHeroes',
  async () => {
    return await request('http://localhost:3001/heroes');
  }
);
export const deleteHero = createAsyncThunk(
  'heroes/deleteHero',
  async (id) => {
    await request(`http://localhost:3001/heroes/${id}`, 'DELETE');
    return id;
  }
);
export const createHero = createAsyncThunk(
  'heroes/createHero',
  async (newHero) => {
    await request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero));
    return newHero;
  }
);

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, state => {
        state.heroesLoadingStatus = 'loading';
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroes = action.payload;
        state.heroesLoadingStatus = 'idle';
      })
      .addCase(fetchHeroes.rejected, state => {
        state.heroesLoadingStatus = 'error';
      })
      // 2.3.1 ...т.к. он теперь «переезжает» во внешние action creators.
      .addCase(deleteHero.fulfilled, (state, action) => {
        state.heroes = state.heroes.filter(item => item.id !== action.payload);
      })
      .addCase(createHero.fulfilled, (state, action) => {
        state.heroes.push(action.payload);
      })
      .addDefaultCase(() => {
      });
  }
});

const {reducer} = heroesSlice;
export default reducer;