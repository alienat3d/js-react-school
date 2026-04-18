// import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
// import ReduxThunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === 'string') {
    return next({type: action});
  }
  return next(action);
};

// 204.1.1 Мы закомментируем создание старого store для примера...
/*const store = createStore(
  combineReducers({heroes, filters}),
  compose(
    applyMiddleware(ReduxThunk, stringMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);*/
// 204.1.2 ... и будем здесь уже создавать store с помощью импортируемого из "Redux Toolkit" метода "configureStore". Он примет в себя объект с настройками и первым полем будет "reducer", куда мы передадим объект с перечислением функций-редьюсеров (это похоже на то, как мы передавали объект функций-редьюсеров в метод "combineReducers").
// 204.1.3 Далее нам нужно ещё активировать расширение "Redux Devtools" (поле "devTools"). И хотя мы могли бы просто написать булево значение, но лучше сделать это таким образом, чтобы true было только в режиме "development", а в "production" — false. Поэтому чаще всего прописывают следующую конструкцию, которая проведёт проверку записи в переменной "NODE_ENV" окружения NodeJS значения и если там будет 'production', то значение будет false и, следовательно "Redux Devtools" будет деактивирован.
// 204.1.4.0 Теперь мы добавим middleware и для этого есть отдельное поле, которые примет значение массив, где мы и перечислим нужные проекту middleware. И дело в том, что в "Redux Toolkit" уже включены некоторые из наиболее используемых middleware (см. ссылку на документацию «Redux Toolkit» к уроку), коим также является "ReduxThunk", поэтому и подключать его здесь не нужно.
// ? 204.1.4.1 Например, "Serializability Middleware" служит для того, чтобы проверять, что в store нет тех данных, которые не должны быть там: символы, промисы и функции (полный список по ссылке в документации). Или ещё есть "Immutability Middleware" для обнаружения мутаций, что могут возникнуть в store.
// 204.1.4.2 Однако требуется включить все middleware из пакета «Redux Toolkit» специальной функцией "getDefaultMiddleware". Поэтому мы чуточку перепишем поле "middleware" и мы скажем, что в анонимную стрелочную функцию должна аргументом приходить функция "getDefaultMiddleware", которая запустившись получит массив middlewares, входящих в пакет «Redux Toolkit», а потом присоединим наш кастомный middleware при помощи метода "concat".
// ? 204.1.5 Ещё в методе "configureStore" есть другие аргументы, которые необязательно, но их при необходимости также можно включить "preloadedState" (опциональный параметр, задающий изначальное состояние Redux-хранилища) & "enhancers" (массив со ссылками на функции store enhancers).
const store = configureStore({
  reducer: {heroes, filters},
  devTools: process.env.NODE_ENV !== 'production',
  // middleware: [stringMiddleware]
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
});

export default store;