// 199.2.3.0 Теперь мы можем почистить функцию-редьюсер и удалить зависимости фильтра, которые здесь больше не нужны.
const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
  filters: [],
  filtersLoadingStatus: 'idle',
  activeFilter: 'all',
  // filteredHeroes: [], // 199.2.3.1 ↓
};

// ? 199.3.0 Теперь, когда у нас в функции-редьюсере нет каких-то жёстких связей, мы можем разделить этот файл на два разных. Это важно уметь делать в объёмных приложениях. Итак, для этого в той же папке "reducers" мы создадим два новых файла "heroes.js" & "filters.js". И начнём переносить нужные для каждого из них вещи, начиная с "heroes.js".
// (Go to [/src/reducers/heroes.js])

// 199.1.0 Но начнём мы с того, что оптимизируем один неприятный момент: сейчас у нас, при увеличении количества экшенов — будет сильно разрастаться функция-редьюсер. И если сейчас он занимает довольно много строк, то можно легко представить, как он может разрастись в реальном приложении с гораздо большим функционалом. "action creators" мы можем раздробить на более мелкие файлы, сгруппировав экшены по общей направленности экшенов (например, HEROES_FETCHING, HEROES_FETCHED и HEROES_FETCHING_ERROR могут быть объединены, т.к. относятся к работе с запросом на сервер, то же касается фильтров и т.д.). Но с функцией-редьюсером так не получится, т.к. это одна функция с конструкцией "switch...case", которую мы не можем так просто разделить. Но, по счастью, мы не первые, кто сталкивался с этой проблемой и другие разработчики уже написали специальный функционал "combine reducers", который позволит нам раздробить функцию-редьюсер на множество кусочков и затем объединить их в единую функцию с помощью специального метода "combineReducers" (см. ссылки к уроку). И здесь мы рассмотрим как его применить.
// 199.1.1 Сначала можно подумать, что разделить фильтры и героев на разные файлы — неплохая идея, но на данный момент нет, потому что между героями и фильтрами здесь выстроены тесные связи. ↓
const reducer = (state = initialState, action) => {
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
/*        filteredHeroes: state.activeFilter === 'all' ?
          action.payload :
          action.payload.filter(item => item.element === state.activeFilter), // 199.2.3.2 ↓ */
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
    // 199.1.2 Если проскролить к одному из кейсов, выполняемых по экшену фильтра, то увидим, что здесь мы, помимо остального стейта возвращаем активный фильтр и отфильтрованных героев. И отфильтрованных героев мы не можем так просто отделить, т.к. они ориентируются на список загруженных уже героев при начальной инициализации приложения (стейт "heroes"). И перед дроблением функции-редьюсера нам требуется, чтобы эти зависимости полностью были разделены. Итак, нам нужно добиться трёх вещей: 1) разделить эту логику; 2) более креативно применить селекторы; 3) сделать функцию-редьюсер чище.
    // ? 199.1.3 И хочется также сказать, что то, как это было написано здесь прежде — вполне допустимый рабочий вариант, но можно написать тот же функционал более элегантно. Дело в том, что фильтрацией мы могли бы заниматься уже на этапе применения «useSelector» (т.е. на этапе получения данные из store, а не писать все эти действия внутри редьюсера и не создавать зависимостей).
    // (Go to [/src/components/heroesList/HeroesList.js])
    case 'ACTIVE_FILTER_CHANGED':
      return {
        ...state,
        activeFilter: action.payload,
/*        filteredHeroes: action.payload === 'all' ?
          state.heroes :
          state.heroes.filter(item => item.element === action.payload), // 199.2.3.3 ↓ */
      };
    case 'HERO_CREATED':
      // let newCreatedHeroesList = [...state.heroes, action.payload]; // 199.2.3.4 ↓
      return {
        ...state,
        // heroes: newCreatedHeroesList,
        heroes: [...state.heroes, action.payload], // 199.2.3.4 ↓
/*        filteredHeroes: state.activeFilter === 'all' ?
          newCreatedHeroesList :
          newCreatedHeroesList.filter(item => item.element === state.activeFilter), // 199.2.3.5 ↓ */
      };
    case 'HERO_DELETED':
      // let newHeroesList = state.heroes.filter(item => item.id !== action.payload); // 199.2.3.6 ↓
      return {
        ...state,
        // heroes: newHeroesList,
        heroes: state.heroes.filter(item => item.id !== action.payload) // 199.2.3.6 ↓
/*        filteredHeroes: state.activeFilter === 'all' ?
          newHeroesList :
          newHeroesList.filter(item => item.element === state.activeFilter), // 199.2.3.7 ↓ */
      };
    default:
      return state;
  }
};

export default reducer;

// ? 199.2.3.8 Отлично! Мы существенно сократили функцию-редьюсер и оптимизировали код. В будущем нужно следить за тем, чтобы в функции-редьюсере были самые простые операции — только назначение данных без каких-то условий и каких-то жёстких связей. Теперь у нас идёт строгое разделение — экшены, которые работают с героями исключительно затрагивают стейт, связанный со статусом загрузки героев и с массивом самих героев. Экшены, которые связаны с фильтрами — работают лишь со стейтом текущего фильтра. И чем проще будет редьюсер — тем проще будет с ним работать и нам и другим разработчикам, поэтому это важно держать его чистым и не загромождать лишними условиями и операциями.
// (Go to [/src/components/heroesList/HeroesList.js])