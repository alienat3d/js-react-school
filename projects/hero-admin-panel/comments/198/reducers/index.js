// 198.1.2 В initialState мы также добавили поле "activeFilter" — стейт для обозначения того фильтра, который на текущий момент времени применяется. Изначально там значение "all" (покажет всех героев), но, в зависимости от того, на какую кнопку фильтра нажмёт пользователь, это значение будет изменяться.
// (Go to [/src/components/heroesFilters/HeroesFilters.js])
// 198.1.7 В итоге у нас два стейта для списка героев: "heroes" — для изначального массива героев, получит данные один раз при первой загрузке приложения, а затем на его основе стейт "filteredHeroes" будет снова и снова меняться, в зависимости от смены фильтра, добавлении или удалении героя.
// (Go to [/src/components/heroesAddForm/HeroesAddForm.js])
const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
  filters: [],
  filtersLoadingStatus: 'idle',
  activeFilter: 'all',
  filteredHeroes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HEROES_FETCHING':
      return {
        ...state,
        heroesLoadingStatus: 'loading'
      };
    // 198.1.6 А также, при первоначальном получении героев нам также нужно их отсортировать. ↑
    case 'HEROES_FETCHED':
      return {
        ...state,
        heroes: action.payload,
        // Это можно сделать иначе и лучше, но оставим этот вариант как альтернативное решение
        filteredHeroes: state.activeFilter === 'all' ?
          action.payload :
          action.payload.filter(item => item.element === state.activeFilter),
        heroesLoadingStatus: 'idle'
      };
    case 'HEROES_FETCHING_ERROR':
      return {
        ...state,
        heroesLoadingStatus: 'error'
      };
    case 'FILTERS_FETCHING':
      return {
        ...state,
        filtersLoadingStatus: 'loading'
      };
    case 'FILTERS_FETCHED':
      return {
        ...state,
        filters: action.payload,
        filtersLoadingStatus: 'idle'
      };
    case 'FILTERS_FETCHING_ERROR':
      return {
        ...state,
        filtersLoadingStatus: 'error'
      };
    // 198.1.4 Далее в функции-редьюсере по этому экшену у нас, во-первых, значение из payload будет записываться в глобальный стейт "activeFilter", а затем в зависимости от значения в payload либо показываться все герои, либо отфильтрованный список по выбранному элементу в фильтрах. ↓
    case 'ACTIVE_FILTER_CHANGED':
      return {
        ...state,
        activeFilter: action.payload,
        filteredHeroes: action.payload === 'all' ?
          state.heroes :
          state.heroes.filter(item => item.element === action.payload),
      };
    // 198.1.5 И вот эта фильтрация должна происходить в нескольких местах, когда мы меняем фильтр, когда мы создаём персонажа, а также, когда мы удаляем персонажа. ↑
    // Показываем новые элементы по фильтрам при создании или удалении
    case 'HERO_CREATED':
      // Формируем новый массив с героями, куда помещаем героев из стейта и добавим к ним героя из payload.
      let newCreatedHeroesList = [...state.heroes, action.payload];
      return {
        ...state,
        heroes: newCreatedHeroesList,
        // Фильтруем новые данные по фильтру, который сейчас применяется
        filteredHeroes: state.activeFilter === 'all' ?
          newCreatedHeroesList :
          newCreatedHeroesList.filter(item => item.element === state.activeFilter),
      };
    case 'HERO_DELETED':
      // Формируем новый массив без того героя, id которого передаём из payload.
      let newHeroesList = state.heroes.filter(item => item.id !== action.payload);
      return {
        ...state,
        heroes: newHeroesList,
        // Фильтруем новые данные по фильтру, который сейчас применяется
        filteredHeroes: state.activeFilter === 'all' ?
          newHeroesList :
          newHeroesList.filter(item => item.element === state.activeFilter),
      };
    default:
      return state;
  }
};

export default reducer;