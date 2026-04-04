import React from 'react';
import {createRoot} from 'react-dom/client';
// 192.8.0 Подводя итог урока рассмотрим к чему мы в итоге пришли: к типичному синтаксису Redux, где мы импортируем здесь "bindActionCreators"...
import {bindActionCreators, createStore} from 'redux';
import reducer from './reducer';
// 192.7.0 Что можно ещё сделать, так это вместо деструктуризации импортируемых action creators импортировать всё из файла "actions.js" объектом "actions". ↓
// import {dec, inc, rnd} from './actions';
// 192.8.1 ... и все action creators из отдельного файла как объект. ↓
import * as actions from './actions';


// const initialState = {value: 0};

// 192.1.0 Если рассмотреть код этого файла, то можно увидеть сущности, которые можно вынести в отдельные файлы. Ведь функция-редьюсер может сильно разрастись со временем, а экшенов (точнее функций "action creators") может стать значительно больше. Поэтому мы создадим новые файлы "reducer.js" & "actions.js", туда мы будем переносить код.
// (Go to [/src/actions.js])

/*const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INC':
      return {
        ...state,
        value: state.value + 1
      };
    case 'DEC':
      return {
        ...state,
        value: state.value - 1
      };
    case 'RND':
      return {
        ...state,
        value: state.value * action.payload
      };
    default:
      return state;
  }
};*/


const store = createStore(reducer);
const {dispatch, subscribe, getState} = store;

// 192.2.2 Ну, и заодно getState тоже. ↓
const update = () => document.getElementById('counter').textContent = getState().value;

// 192.2.1 Также извлечём и subscribe.
subscribe(update);

/*const inc = () => ({type: 'INC'});
const dec = () => ({type: 'DEC'});
const rnd = (value) => ({type: 'RND', payload: value});*/

// 192.2.0 Продолжим наш рефакторинг тем, что, во-первых, импортируем все action creators, а затем избавимся от лишнего "store." тем, что извлечём метод dispatch выше деструктуризацией. ↑
// 192.3 И всё же, можно заметить, что у нас идёт здесь повторение кода и двойной вызов функции, сперва dispatch, а потом action creator. И мы можем это заменить на вызов одной функции. Создадим такие функции, которые будут запускать внутри себя эту конструкцию.
// 192.4.0 Но что, если экшенов станет намного больше, а также и action creators? А также и этих функций вроде "incDispatch" и т.п. Нужно ли будет привязывать каждую функцию при помощи такого синтаксиса? Логичнее было бы создать ещё одну универсальную функцию для создания подобных dispatch-функций. Кстати, такой цепочкой рефакторинг-преобразований мы придём к классическому паттерну Redux, который и есть "под капотом" и это позволит нам понять его работу чуть лучше. Итак, создадим новую функцию bindActionCreator, которая принимает два аргумента: creator & dispatch. Эта функция будет возвращать другую функцию, потому, что когда мы создавали в "incDispatch" (и подобной ей) функцию...
// 192.4.2 Поэтому здесь мы тоже создадим функцию, и она вернёт функцию, которая, в свою очередь, будет диспатчить экшены. Внутри возвращаемой функции будет запускаться метод dispatch, в который мы будем помещать action creators с разными типами экшенов. И так как у нас также с некоторыми экшенами передаётся payload, то не забудем в аргументах спред-оператором добавить возможные аргументы (...args), которые передадим в функцию creator внутри.
// ? 192.5 По сути, всё это то, что находится у Redux «под капотом». У самого же Redux есть функция "bindActionCreators", которая как две капли воды похожа на ту, что мы создали здесь вручную — "bindActionCreator". Поэтому мы можем закомментировать нашу и уже использовать "bindActionCreators" из Redux. Работать будет всё точно также, но сэкономит код и время на расписывание этого всего вручную. ↓
/*const bindActionCreator = (creator, dispatch) => (...args) => {
  dispatch(creator(...args));
}*/

/*const incDispatch = () => dispatch(inc());
const decDispatch = () => dispatch(dec());
const rndDispatch = (value) => dispatch(rnd(value));*/
// 192.4.3 Теперь надо заменить прошлые dispatch-функции на использование с новой bindActionCreator. И сюда мы соответственно передаём нужный action creator и собственно сам метод dispatch, извлекаемый из store выше. Также сделаем со всеми тремя. И т.к. мы в возвращаемой функции вверху аргументом спред-оператором указали любые имеющиеся аргументы, то отдельно "value" для rndDispatch нам можно уже не указывать. ↑
/*const incDispatch = bindActionCreators(inc, dispatch);
const decDispatch = bindActionCreators(dec, dispatch);
const rndDispatch = bindActionCreators(rnd, dispatch);*/
// 192.6 Однако, мы всё ещё видим здесь некое повторение вызова метода и это тоже можно сократить. Мы можем забиндить сразу множество функций в виде объекта. Вместо названия функции "action creator" первым аргументом мы поместим сюда объект, где свойствами будут action creators. И теперь эти dispatch-функции мы можем удобно вытащить из возвращаемого функцией "bindActionCreators" объекта при помощи деструктуризации. ↑
// 192.7.1 А теперь здесь мы можем вместо перечисления action creators поимённо просто поместить первым аргументом объект "actions", где будут все эти action creators, а свойствами будут сами экспортируемые функции action creators, которые мы деструктурируем. Вот так коротко и лаконично. ↑
/*const {incDispatch, decDispatch, rndDispatch} = bindActionCreators({
  incDispatch: inc,
  decDispatch: dec,
  rndDispatch: rnd,
}, dispatch);*/
// 192.8.2 Чтобы затем поместить в этот метод вместе с методом store "dispatch", из которого в итоге мы извлечём все экшены, что будут использованы в обработчиках события ниже.
const {inc, dec, rnd} = bindActionCreators(actions, dispatch);

// 192.4.1 ..., которую мы потом передавали сюда в обработчике события. ↑
/* document.getElementById('inc').addEventListener('click', () => dispatch(inc()));
document.getElementById('dec').addEventListener('click', () => dispatch(dec()));*/
/*
document.getElementById('inc').addEventListener('click', incDispatch);
document.getElementById('dec').addEventListener('click', decDispatch);
document.getElementById('rnd').addEventListener('click', () => {
  const value = Math.floor(Math.random() * 10);
  // dispatch(rnd(value));
  rndDispatch(value);
});*/
document.getElementById('inc').addEventListener('click', inc);
document.getElementById('dec').addEventListener('click', dec);
document.getElementById('rnd').addEventListener('click', () => {
  const value = Math.floor(Math.random() * 10);
  rnd(value);
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <>

    </>
  </React.StrictMode>,
);