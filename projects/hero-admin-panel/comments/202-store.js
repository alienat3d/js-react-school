import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

// 202.1 Для разбора работы «middleware» мы перепишем функцию-enhancer для использования с middleware. Создадим переменную "stringMiddleware", которая и будет тем самым middleware для строковых типов данных, попадающих в диспэтч-функцию. Она будет принимать store и возвращать другую функцию, которая будет принимать функцию-диспэтч и возвращать ещё одну функцию. 3-я функция будет аргументом принимать экшен, который будет передаваться в диспэтч. По сути, именно третья функция здесь на конце и есть новая диспэтч-функция с изменённым функционалом. И внутри неё мы будем прописывать действия, которые нужно сделать иначе, чем это было в оригинальной функции (то же, что и было внутри функции-enhancer). Вот и весь middleware. Как можно сравнить с функцией-enhancer и увидеть, нам потребовалось гораздо меньше строчек кода. Вместо того чтобы копировать ссылку на оригинальную диспэтч-функцию, перезаписывать её функционал в store и затем возвращать обновлённый store, мы здесь просто возвращаем функцию dispatch с новым функционалом.
// ? 202.2 Также стоит помнить, что в самой первой функции, где мы принимаем "store" в качестве аргумента, то на самом деле там не весь store, а только две сущности "getState" и "dispatch", для получения стейта из store и его перезаписи при помощи dispatch.
// 202.3.2 Т.к. вместо "dispatch" логичнее будет и тут написать "next", ведь на его место будет подставляться и запускать следующая middleware-функция и просто так принято записывать у большинства разработчиков. ↓
/*const stringMiddleware = (store) => (dispatch) => (action) => {
  if (typeof action === 'string') {
    return dispatch({type: action});
  }
  return dispatch(action);
};*/
const stringMiddleware = () => (next) => (action) => {
  if (typeof action === 'string') {
    return next({type: action});
  }
  return next(action);
};

// ? 202.3.0 Теперь давайте рассмотрим готовые решения и один из самых популярный middleware называется «redux-thunk» (см. ссылки к уроку №203). И здесь мы видим почти всё то же самое: у нас функция, которая возвращает функцию, которая возвращает функцию. Диспэтч здесь обозначен аргументом "next". Далее возвращается изменённый диспэтч, который производит проверку аргумента action на то, что она действительно является функцией и т.п. И на практике нам вряд ли надо будет писать это вручную, мы просто воспользуемся готовым решением, как эта библиотека. Однако, полезно знать как это работает «под капотом».
// ? 202.3.1 Но почему здесь аргумент называется "next"? А связано это с тем, что далее будет композиция функций и мы передаём изменённый диспэтч дальше. Когда мы подключаем несколько middleware один за другим, то происходит цепочка их вызовов. Мы последовательно изменяем диспэтч-функции, чтобы в итоге получить объёмную по размерам функцию со всем функционалом, что нам требуется в приложении. Т.е. следующий middleware будет подставляться в третью возвращаемую функцию, поэтому и "next". И в неё будет приходить экшен. ↑
/*function createThunkMiddleware(extraArgument) {
  return ({dispatch, getState}) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  }
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;*/

/*const enhancer = (createStore) => (...args) => {
  const store = createStore(...args);

  const oldDispatch = store.dispatch;

  store.dispatch = (action) => {
    if (typeof action === 'string') {
      return oldDispatch({type: action});
    }
    return oldDispatch(action);
  };
  return store;
};*/

// 202.3.3 Теперь нам нужен ещё механизм, который будет последовательно модифицировать диспэтч. Для этого есть специальный метод Redux «applyMiddleware», который просто примет список всех middleware-функций (см. ссылку к этому уроку). Пока закомментируем метод "compose" и вместо него вторым аргументом подставим метод «applyMiddleware», куда внутрь аргументом мы поместим созданный нами middleware.
// 202.4 Нам осталось здесь вернуть Redux Devtools, для этого нужно использовать всё тот же "compose", где первым аргументом будет "applyMiddleware", а вторым команда для активации этого расширения браузера.
const store = createStore(
  combineReducers({heroes, filters}),
  compose(
    applyMiddleware(stringMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  /*compose(
    enhancer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )*/
);

export default store;