// ? 199.3.1 Сперва мы скопируем всё из файла [/src/reducers/index.js]. И здесь у нас файл, связанный с героями, поэтому всё, что с этим не связано мы удалим. То же самое сделаем и для файла "filters.js".
// 199.3.6.1 Т.е. теперь для получения стейта "heroes" мы должны сперва обратиться к свойству "heroes", которое сформировано в общем глобальном store на базе имени функции-редьюсера, а уже потом к свойству в объекте этого свойства: "state.heroes.heroes". Поэтому придётся потратить пару минут переписать пути к сущностям, учитывая этот нюанс.
// (Go to [/src/components/heroesAddForm/HeroesAddForm.js])
const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
};

// ? 199.3.2 Ну и саму функцию переименуем в "heroes".
// (Go to [/src/store/index.js])
const heroes = (state = initialState, action) => {
  switch (action.type) {
    case 'HEROES_FETCHING':
      return {
        ...state,
        heroesLoadingStatus: 'loading'
      };
    case 'HEROES_FETCHED':
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: 'idle'
      };
    case 'HEROES_FETCHING_ERROR':
      return {
        ...state,
        heroesLoadingStatus: 'error'
      };
    case 'HERO_CREATED':
      return {
        ...state,
        heroes: [...state.heroes, action.payload],
      };
    case 'HERO_DELETED':
      return {
        ...state,
        heroes: state.heroes.filter(item => item.id !== action.payload)
      };
    default:
      return state;
  }
};
export default heroes;