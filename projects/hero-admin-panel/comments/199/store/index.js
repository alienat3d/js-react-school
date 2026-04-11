// 199.3.4 Также нам понадобится импортировать специальный метод "combineReducers" из библиотеки Redux. ↓
import {createStore, combineReducers} from 'redux';

// 199.3.3 Теперь нам здесь нужно скомбинировать эти два недавно созданных файла в один. Для этого, во-первых, мы их сюда импортируем, а прежний "reducer" можно удалить. ↑
// import reducer from '../reducers';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

// ? 199.3.5 Затем внутрь метода "createStore" помещается метод "combineReducers". Синтаксис у метода "combineReducers" довольно простой, в него мы помещаем объект, где через запятую перечисляем все функции-редьюсеры, которые будут участвовать в формировании единой функции-редьюсера, где ключами может быть произвольные имена, а значениями - импортируемые функции-редьюсеры. Но в принципе мы можем сократить до просто написания одного ключа, по правилу сокращения объектов, если ключ и значение в них одноимённы (то же самое, что и "{heroes: heroes, filters: filters}").
// 199.3.6.0 Тут надо помнить одну особенность, что когда мы так сделали, то в стейте формируются два свойства, в которых заключены внутренности каждого из редьюсеров.
// (Go to [/src/reducers/heroes.js])
// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store = createStore(combineReducers({heroes, filters}),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;