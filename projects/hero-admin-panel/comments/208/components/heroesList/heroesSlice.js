import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {useHttp} from '../../hooks/http.hook';

const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
};

// 208.6.0 Отлично! В итоге у нас весь функционал, который отвечает за работу с героями и с сервером в приложении, расположен в этом слайсе. Код стал намного удобнее и читабельнее, оптимизирован для дебаггинга. Мы избавились от промежуточного звена в виде файла [/src/actions/index.js] и создали аж 3 action creator через метод «createAsyncThunk». Теперь в основных редьюсерах у нас лишь функции по синхронному изменению стейта.
// 208.6.1 Есть и более продвинутые техники и нюансы использования в определённых случаях, но вначале они вряд ли пригодятся, а овладев базой, которую мы изучили, овладеть этим будет совсем не трудно по документации.
// (Go to [/src/components/heroesFilters/filtersSlice.js])

// 208.1.1 Конечно, мы могли бы просто скопировать комплексную функцию action creator как есть, и это тоже бы работало отлично. Но можно сделать это более изящно и лаконично при помощи Redux Toolkit метода «createAsyncThunk». Также заодно исправим тот момент, что пока нам приходится передавать в этот action creator функцию "request" для отправки запроса на сервер. Ведь мы можем взять хук useHttp и импортировать внутрь этого слайса.
/* 208.1.2 Итак, мы создаём asyncThunk функцию fetchHeroes при помощи метода createAsyncThunk. Она примет несколько параметров:
* 1) тип действия в формате "имя слайса/тип действия" (например 'heroes/fetchHeroes');
* 2) функция, которая вернёт промис, т.е. асинхронную часть кода (в большинстве случаев мы так и будем делать, однако стоит помнить, что можно там прописать и синхронный код, но в этом случае нужно будет вручную прописывать ошибку, если что-то пойдёт не так 'if (...) { throw Error(); }'). Эта функция принимает два аргумента: a) те данные, что приходят при диспатче этого действия (например, если бы мы хотели получать уникального персонажа по id, то он бы приходил внутрь функции fetchHeroes внутри функции-диспэтч 'dispatch(fetchHeroes(id))'), но так как действие здесь простое — оно просто получает всех героев в списке, то этот аргумент пока не нужен и мы его передавать не будем; b) ThunkAPI, которое можно использовать для разных дополнительных нужд (например, получить доступ к dispatch, к getState, устанавливать сигналы и устанавливать многие другие настройки (см. документацию в ссылках)). Они редко требуются, но хорошо о них знать.
* */
// 208.1.5 После того, как мы создали новый action creator fetchHeroes, то нам нужно его запустить и обработать. И на самом деле метод "createAsyncThunk" вернёт не один, а целых три action creators, которые можно использовать для работы с асинхронными операциями и они носят названия: pending, fulfilled & rejected. ↓
// 208.3.0 И ещё, чтобы использовать новый асинхронный action creator снаружи, нам конечно нужно его экспортировать.
// (Go to [/src/components/heroesList/HeroesList.js])
export const fetchHeroes = createAsyncThunk(
  'heroes/fetchHeroes',
  () => {
    // 208.1.3 Далее внутри мы формируем запрос на сервер, используя функцию request, но для начала извлечём его деструктуризацией из хука "useHttp". Однако важный момент, нам здесь требуется именно вернуть промис, а значит перед запросом напишем ключевое слово return.
    // ? 208.1.4 Почему же мы не прописываем конструкцию "async...await", хотя мы создаём асинхронную функцию? Ну, потому, что мы используем функцию request, где эти "async...await" уже и так прописаны. Но если хочется это и здесь выделить, то это никак не помешает прописать и здесь. ↑
    // 208.2.3.0 И ещё один важный нюанс, когда здесь функция request сработает, то вернёт какой-то промис... ↓
    const {request} = useHttp();
    return request('http://localhost:3001/heroes');
  }
);

/*export const fetchHeroes = (request) => (dispatch) => {
  dispatch(heroesFetching());
  // 208.2.3.2 Раньше у нас данные переходили сначала в data, а потом уже в функцию-диспэтч и action creator "heroesFetched", но сейчас всё это будет происходить автоматически внутри метода «createAsyncThunk». ↓
  request('http://localhost:3001/heroes')
    .then(data => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()));
};*/

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    // 208.2.6 А по завершению обработки action creators из нашего нового асинхронного action creator "fetchHeroes" получилось, что здесь первые три action creators уже не нужны, т.к. они только использовались в комплексном action creator, от которого мы избавились и только что пересоздали методом "createAsyncThunk". Поэтому их мы можем удалить. ↑
/*    heroesFetching: state => {
      state.heroesLoadingStatus = 'loading';
    },
    heroesFetched: (state, action) => {
      state.heroes = action.payload;
      state.heroesLoadingStatus = 'idle';
    },
    heroesFetchingError: state => {
      state.heroesLoadingStatus = 'error';
    },*/
    heroCreated: (state, action) => { state.heroes.push(action.payload); },
    heroDeleted: (state, action) => { state.heroes = state.heroes.filter(item => item.id !== action.payload); },
  },
  // 208.2.0 А теперь нам нужно обработать эти новые созданные в fetchHeroes action creators здесь в heroesSlice, но т.к. они создаются вне слайса, то они считаются сторонними action creators. Будто бы мы их импортировали из другого слайса или файла. И потому они записываются не в поле "reducers", а в отдельное поле "extraReducers". У этого поля значением будет builder-функция, которая примет объект builder и передаст в функцию. К этому объекту чейнингом мы будем присоединять сторонние action creators с помощью метода "addCase", в который приходит action creator.
  // 208.2.1 Далее, мы обратимся к базовому объекту "fetchHeroes", который содержит 3 action creators, т.е. на каждый из 3-х результатов промиса. Для начала возьмём результат "pending", это когда запрос только отправляется, но ответ сервера ещё не известен. И вторым аргументом мы формируем анонимной стрелочной функцией какое-то действие. И нам нужно изменить стейт "heroesLoadingStatus" на значение 'loading'.
  // 208.2.2 Вторым кейсом у нас будет "fulfilled", когда запрос успешно пришёл и был получен ответ от сервера. Здесь нам уже нужен и стейт и объект экшен с полем payload в качестве аргументов, мы запишем в стейт heroes полученный объект с героями, а стейт "heroesLoadingStatus" переключим в состояние 'idle' (ожидания нового запроса). ↑
  // 208.2.4 Ну, и осталось прописать ещё кейс для кейса, когда по какой-то причине сервер отклонил наш запрос, т.е. результат промиса "rejected". Тогда мы поменяем стейт "heroesLoadingStatus" на "error".
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, state => { state.heroesLoadingStatus = 'loading'; })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        // 208.2.3.1 А данные из этого промиса всё также перейдут в action.payload. И нам здесь об этом не нужно беспокоиться. ↑
        state.heroes = action.payload;
        state.heroesLoadingStatus = 'idle';
      })
      .addCase(fetchHeroes.rejected, state => { state.heroesLoadingStatus = 'error'; })
      // 208.2.5 Ну, и под конец дефолтный кейс, где мы, как и раньше, укажем пустую функцию, которая просто вернёт стейт без изменений, если пришедший экшен ни к одному из известных не подошёл. ↑
      .addDefaultCase(() => {});
  }
});

const {actions, reducer} = heroesSlice;

export default reducer;

export const {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroCreated,
  heroDeleted
} = actions;