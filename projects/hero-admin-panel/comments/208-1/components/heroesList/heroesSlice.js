import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// 2.0 Здесь мы уже импортируем функцию "request" из обычного JS-файла с утилитарными функциями "utils", а не из React-хука. ↓
import {request} from '../../utils';

const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
};

export const fetchHeroes = createAsyncThunk(
  'heroes/fetchHeroes',
  // 2.1 Через конструкцию "async...await" используем метод request, который мы импортировали из "utils". ↓
  async () => {
    return await request('http://localhost:3001/heroes');
  }
);

// 2.2.0 А также мы создадим новую асинхронную thunk-функцию "deleteHero" для удаления героя из списка, чтобы очистить наш компонент [HeroesList.js].
export const deleteHero = createAsyncThunk(
  'heroes/deleteHero',
  async (id) => {
    await request(`http://localhost:3001/heroes/${id}`, 'DELETE');
    return id; // 2.2.1 Возвращаем id героя, чтобы точно знать какого именно нам нужно удалить из стейта. ↓
  }
);

// 5.0.0 Но у нас ещё остался метод создания персонажа, который также стоит перевести в асинхронную thunk-функцию "createHero".
export const createHero = createAsyncThunk(
  'heroes/createHero',
  async (newHero) => {
    await request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero));
    return newHero; // 5.0.1 Вернём объект с персонажем для редьюсера ↓
  }
);

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  // 5.1.0 В итоге так вышло, что у нас не осталось обычных редьюсеров, ... ↓
  /*reducers: {
    heroCreated: (state, action) => {
      state.heroes.push(action.payload);
    },
    // 2.3.0 Здесь уже редьюсер нам не нужен...
    // heroDeleted: (state, action) => { state.heroes = state.heroes.filter(item => item.id !== action.payload); },
  },*/
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
        // 2.3.2 А здесь мы отфильтруем удалённого персонажа из массива при помощи его id.
        // (Go to [/src/components/heroesFilters/filtersSlice.js])
        state.heroes = state.heroes.filter(item => item.id !== action.payload);
      })
      // 5.1.1 ..., а вместо них у нас добавляется ещё один внешний редьюсер "createHero", который и будет добавлять нового персонажа в глобальный стейт.
      // (Go to [/src/components/heroesAddForm/HeroesAddForm.js])
      .addCase(createHero.fulfilled, (state, action) => {
        state.heroes.push(action.payload);
      })
      .addDefaultCase(() => {
      });
  }
});
const {actions, reducer} = heroesSlice;

export default reducer;

export const {heroCreated} = actions;